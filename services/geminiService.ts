import type { ChartRecommendation } from '../types';

export const getChartRecommendation = async (dataDescription: string, objective: string): Promise<ChartRecommendation> => {
  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dataDescription, objective }),
    });

    if (!response.ok) {
      let errorMessage = `Ocorreu um erro no serviço (Status: ${response.status}).`;
      try {
        const errorData = await response.json();
        // Se a API de backend retornar uma mensagem de erro estruturada, nós a usamos.
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // Ignora o erro de parsing de JSON e usa a mensagem de status,
        // comum em erros de infraestrutura como 404 Not Found.
      }
      throw new Error(errorMessage);
    }

    // A resposta agora é um stream. Precisamos lê-la por completo.
    if (!response.body) {
      throw new Error("A resposta do serviço está vazia.");
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';
    
    // Ler o stream até o fim
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      accumulatedText += decoder.decode(value, { stream: true });
    }
    
    // Após o stream terminar, fazer o parse do JSON completo
    return JSON.parse(accumulatedText) as ChartRecommendation;

  } catch (error) {
    console.error("Erro ao buscar recomendação:", error);
    // Re-lança o erro com a mensagem específica para ser exibido na UI.
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("Ocorreu um erro desconhecido ao buscar a recomendação.");
  }
};