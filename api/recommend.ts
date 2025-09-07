import { GoogleGenAI, Type } from "@google/genai";
import type { ChartRecommendation } from '../types';

// Configuração específica da Vercel para executar esta função na Edge Network.
// Isso é crucial para a performance e para evitar timeouts.
export const config = {
  runtime: 'edge',
};

// Este código roda no servidor, não no navegador do usuário.
// A chave de API é lida de forma segura a partir das variáveis de ambiente do servidor.
if (!process.env.API_KEY) {
  throw new Error("A variável de ambiente API_KEY não está definida.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const guideContent = `
### O Guia Definitivo para Escolher o Gráfico Certo
O segredo é responder à pergunta: Qual é a principal mensagem que eu quero passar?

#### 1. Para mostrar Evolução ou Tendência ao Longo do Tempo
- **Gráfico de Linha (Line):** Mostrar a evolução de uma ou mais variáveis contínuas ao longo do tempo.
- **Gráfico de Área (Area):** Similar ao de linha, mas enfatiza o volume ou a magnitude da mudança.
- **Gráfico de Coluna (Column):** Comparar valores em pontos discretos no tempo.

#### 2. Para Comparar Categorias
- **Gráfico de Colunas (Column):** Comparar valores entre poucas categorias.
- **Gráfico de Barras (Bar):** Ótimo quando os nomes das categorias são longos ou há muitas categorias.

#### 3. Para mostrar a Composição (Partes de um Todo)
- **Gráfico de Pizza ou Rosca (Pie, Donut):** Mostrar a proporção de pouquíssimas categorias (5 ou menos) quando a soma é 100%.
- **Gráfico de Barras Empilhadas (Stacked Bar):** Alternativa superior à pizza para comparar a composição de vários grupos.

#### 4. Para ver a Distribuição de Dados
- **Histograma (Histogram):** Mostrar a frequência de valores de uma única variável em intervalos.

#### 5. Para encontrar Relação ou Correlação entre Variáveis
- **Gráfico de Dispersão (Scatter):** Mostrar a relação entre duas variáveis numéricas.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    chartType: {
      type: Type.STRING,
      description: "O nome do tipo de gráfico recomendado em inglês.",
      enum: ['Line', 'Area', 'Column', 'Bar', 'Pie', 'Donut', 'Stacked Bar', 'Histogram', 'Scatter']
    },
    reasoning: {
      type: Type.STRING,
      description: "Uma explicação clara e concisa em Português do Brasil, com no máximo 3 frases, sobre por que este gráfico é a melhor escolha para os dados e o objetivo do usuário."
    }
  },
  required: ['chartType', 'reasoning']
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { dataDescription, objective } = await request.json();

    if (!dataDescription || !objective) {
      return new Response(JSON.stringify({ error: 'dataDescription e objective são obrigatórios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const prompt = `
      Com base no guia de visualização de dados e na solicitação do usuário, recomende o melhor tipo de gráfico.

      GUIA:
      ${guideContent}

      SOLICITAÇÃO DO USUÁRIO:
      - Descrição dos Dados: "${dataDescription}"
      - Objetivo: "${objective}"

      Sua tarefa é analisar a solicitação e retornar a recomendação no formato JSON especificado. A resposta DEVE estar em português.
    `;

    // Usar a API de streaming para respostas mais rápidas
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    // Criar um ReadableStream para enviar a resposta da IA diretamente para o cliente
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of stream) {
          const text = chunk.text;
          if (text) {
            // Enviar cada pedaço de texto assim que ele chegar
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    // Retornar o stream diretamente para o cliente
    return new Response(readableStream, {
      status: 200,
      headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache', // Garantir que o cliente receba dados novos
      },
    });

  } catch (error) {
    console.error("Erro na função de recomendação:", error);
    const errorMessage = error instanceof Error ? error.message : 'Falha ao processar a recomendação da IA.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}