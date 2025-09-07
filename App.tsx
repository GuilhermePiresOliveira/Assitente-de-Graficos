import React, { useState, useCallback } from 'react';
import type { ChartRecommendation } from './types';
import { getChartRecommendation } from './services/geminiService';
import InputForm from './components/InputForm';
import RecommendationDisplay from './components/RecommendationDisplay';
import ChartGuide from './components/ChartGuide';
import ChartExamples from './components/ChartExamples';

const App: React.FC = () => {
  const [dataDescription, setDataDescription] = useState<string>('');
  const [objective, setObjective] = useState<string>('');
  const [recommendation, setRecommendation] = useState<ChartRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!dataDescription || !objective) {
      setError('Por favor, preencha a descrição dos dados e o objetivo.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await getChartRecommendation(dataDescription, objective);
      setRecommendation(result);
    } catch (err) {
      setError('Ocorreu um erro ao buscar a recomendação. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dataDescription, objective]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans relative">
      <div className="absolute top-4 right-6 text-xs text-slate-500 hover:text-slate-300 transition-colors duration-300">
        <p>Criado por Guilherme Pires</p>
      </div>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
            Assistente de Gráficos com IA
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Descreva seus dados e seu objetivo para receber a recomendação do gráfico perfeito.
          </p>
        </header>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-slate-950/50 p-6 md:p-8">
          <InputForm
            dataDescription={dataDescription}
            setDataDescription={setDataDescription}
            objective={objective}
            setObjective={setObjective}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-10">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-300">Analisando e buscando a melhor visualização...</p>
            </div>
          )}
          {error && <div className="text-center p-6 bg-red-900/50 border border-red-700 text-red-300 rounded-2xl">{error}</div>}
          {recommendation && <RecommendationDisplay recommendation={recommendation} />}
        </div>
        
        {!recommendation && !isLoading && !error && (
            <>
              <ChartGuide />
              <ChartExamples />
            </>
        )}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Criado por Guilherme Pires - Estudante de Dados</p>
      </footer>
    </div>
  );
};

export default App;