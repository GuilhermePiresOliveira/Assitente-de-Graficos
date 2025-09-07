import React from 'react';
import type { ChartRecommendation } from '../types';
import ExampleChart from './ExampleChart';

interface RecommendationDisplayProps {
  recommendation: ChartRecommendation;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendation }) => {
  const chartNameMapping: { [key: string]: string } = {
    'Line': 'Gráfico de Linha',
    'Area': 'Gráfico de Área',
    'Column': 'Gráfico de Colunas',
    'Bar': 'Gráfico de Barras',
    'Pie': 'Gráfico de Pizza',
    'Donut': 'Gráfico de Rosca',
    'Stacked Bar': 'Gráfico de Barras Empilhadas',
    'Histogram': 'Histograma',
    'Box Plot': 'Box Plot',
    'Scatter': 'Gráfico de Dispersão'
  };
  
  const chartIconMapping: { [key: string]: string } = {
    'Line': 'fa-chart-line',
    'Area': 'fa-chart-area',
    'Column': 'fa-chart-column',
    'Bar': 'fa-chart-bar',
    'Pie': 'fa-chart-pie',
    'Donut': 'fa-chart-pie',
    'Stacked Bar': 'fa-chart-bar',
    'Histogram': 'fa-chart-simple',
    'Box Plot': 'fa-box',
    'Scatter': 'fa-circle-nodes'
  };

  const displayName = chartNameMapping[recommendation.chartType] || recommendation.chartType;
  const displayIcon = chartIconMapping[recommendation.chartType] || 'fa-chart-simple';

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-lg animate-fade-in p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-sm font-semibold uppercase text-cyan-400 tracking-wider mb-2">Recomendação</h2>
          <h3 className="text-3xl font-bold text-white mb-4">
            <i className={`fa-solid ${displayIcon} mr-3 text-purple-400`}></i>
            {displayName}
          </h3>
          <div className="prose prose-invert prose-p:text-slate-300 text-lg leading-relaxed">
            <p>{recommendation.reasoning}</p>
          </div>
        </div>
        <div className="h-80 w-full bg-slate-900/50 p-4 rounded-xl border border-slate-700">
           <ExampleChart chartType={recommendation.chartType} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationDisplay;
