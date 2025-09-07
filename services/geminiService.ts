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
      const errorData = await response.json();
      throw new Error(errorData.error || 'A API retornou um erro.');
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar recomendação:", error);
    if (error instanceof Error) {
        throw new Error(`Falha na comunicação com o serviço: ${error.message}`);
    }
    throw new Error("Ocorreu um erro desconhecido ao buscar a recomendação.");
  }
};
