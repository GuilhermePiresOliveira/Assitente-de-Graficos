import React from 'react';

const guideData = [
  {
    title: "Evolução ao Longo do Tempo",
    icon: "fa-chart-line",
    charts: "Linha, Área, Coluna",
    description: "Para mostrar tendências, picos e vales em dados com uma dimensão de tempo (dias, meses, anos).",
  },
  {
    title: "Comparar Categorias",
    icon: "fa-chart-bar",
    charts: "Colunas, Barras",
    description: "Para comparar valores entre diferentes grupos ou itens. Ideal para rankings.",
  },
  {
    title: "Composição (Partes de um Todo)",
    icon: "fa-chart-pie",
    charts: "Pizza, Rosca, Barras Empilhadas",
    description: "Para mostrar como um valor total é dividido em diferentes partes percentuais.",
  },
  {
    title: "Distribuição de Dados",
    icon: "fa-chart-simple",
    charts: "Histograma, Box Plot",
    description: "Para entender como seus dados estão espalhados, a frequência e os valores atípicos.",
  },
  {
    title: "Relação entre Variáveis",
    icon: "fa-circle-nodes",
    charts: "Dispersão (Scatter Plot)",
    description: "Para verificar se duas variáveis numéricas se movimentam juntas (correlação).",
  }
];

const ChartGuide: React.FC = () => {
  return (
    <div className="mt-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-8 text-slate-300">Como Escolher o Gráfico Certo?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideData.map((item, index) => (
          <div key={index} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-3">
              <div className="bg-slate-700 p-3 rounded-full mr-4">
                <i className={`fa-solid ${item.icon} text-cyan-400 text-xl`}></i>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                <p className="text-xs text-purple-400 font-semibold">{item.charts}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartGuide;
