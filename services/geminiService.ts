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

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar recomendação:", error);
    // Re-lança o erro com a mensagem específica para ser exibido na UI.
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("Ocorreu um erro desconhecido ao buscar a recomendação.");
  }
};
