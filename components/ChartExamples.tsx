import React from 'react';
import ExampleChart from './ExampleChart';
import type { ChartType } from '../types';

const exampleData: { chartType: ChartType; title: string; description: string }[] = [
  {
    chartType: 'Line',
    title: 'Evolução de Vendas Mensais',
    description: 'Ideal para mostrar tendências e a evolução de uma variável contínua ao longo do tempo, como o faturamento de uma empresa mês a mês.',
  },
  {
    chartType: 'Area',
    title: 'Volume de Acessos ao Longo do Tempo',
    description: 'Similar ao gráfico de linha, mas a área preenchida enfatiza o volume e a magnitude da mudança, sendo ótimo para mostrar totais cumulativos.',
  },
  {
    chartType: 'Bar',
    title: 'Comparação de Vendas por Produto',
    description: 'Excelente para comparar valores entre diferentes categorias. As barras horizontais facilitam a leitura de nomes de categorias longos.',
  },
  {
    chartType: 'Column',
    title: 'Comparativo de Vendas Trimestral',
    description: 'Similar ao gráfico de barras, mas com colunas verticais. É eficaz para comparar um número menor de categorias em pontos discretos no tempo.',
  },
  {
    chartType: 'Pie',
    title: 'Fontes de Tráfego de um Site',
    description: 'Mostra a proporção de cada categoria em relação a um todo. É mais eficaz com poucas categorias (geralmente 5 ou menos) que somam 100%.',
  },
  {
    chartType: 'Donut',
    title: 'Divisão de Orçamento por Departamento',
    description: 'Uma variação do gráfico de pizza. O centro vazio pode ser usado para exibir informações adicionais, como o valor total.',
  },
  {
    chartType: 'Stacked Bar',
    title: 'Vendas por Plataforma (iOS vs. Android)',
    description: 'Compara a composição de diferentes grupos. Cada barra representa um total, e os segmentos mostram a contribuição de cada subcategoria.',
  },
  {
    chartType: 'Scatter',
    title: 'Correlação: Investimento vs. Vendas',
    description: 'Usado para visualizar a relação e a correlação entre duas variáveis numéricas. Cada ponto no gráfico representa um par de valores.',
  },
];

const ChartExamples: React.FC = () => {
  return (
    <div className="mt-16 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-8 text-slate-300">Exemplos de Gráficos</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {exampleData.map((example) => (
          <div key={example.chartType} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1">
            <h3 className="font-bold text-lg text-white mb-2">{example.title}</h3>
            <p className="text-slate-400 text-sm mb-4 flex-grow">{example.description}</p>
            <div className="h-64 w-full bg-slate-900/50 p-4 rounded-xl border border-slate-700">
              <ExampleChart chartType={example.chartType} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartExamples;