import { GoogleGenAI, Type } from "@google/genai";
import type { ChartRecommendation } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
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
- **Box Plot (Box Plot):** Resumir a distribuição mostrando mediana, quartis e outliers.

#### 5. Para encontrar Relação ou Correlação entre Variáveis
- **Gráfico de Dispersão (Scatter):** Mostrar a relação entre duas variáveis numéricas.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    chartType: {
      type: Type.STRING,
      description: "O nome do tipo de gráfico recomendado em inglês.",
      enum: ['Line', 'Area', 'Column', 'Bar', 'Pie', 'Donut', 'Stacked Bar', 'Histogram', 'Box Plot', 'Scatter']
    },
    reasoning: {
      type: Type.STRING,
      description: "Uma explicação clara e concisa em Português do Brasil, com no máximo 3 frases, sobre por que este gráfico é a melhor escolha para os dados e o objetivo do usuário."
    }
  },
  required: ['chartType', 'reasoning']
};

export const getChartRecommendation = async (dataDescription: string, objective: string): Promise<ChartRecommendation> => {
  const prompt = `
    Com base no guia de visualização de dados e na solicitação do usuário, recomende o melhor tipo de gráfico.

    GUIA:
    ${guideContent}

    SOLICITAÇÃO DO USUÁRIO:
    - Descrição dos Dados: "${dataDescription}"
    - Objetivo: "${objective}"

    Sua tarefa é analisar a solicitação e retornar a recomendação no formato JSON especificado. A resposta DEVE estar em português.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    return parsedJson as ChartRecommendation;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get chart recommendation from Gemini API.");
  }
};
