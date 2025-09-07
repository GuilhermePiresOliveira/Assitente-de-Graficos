import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis, AreaChart, Area
} from 'recharts';
import type { ChartType } from '../types';

interface ExampleChartProps {
  chartType: ChartType;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

const lineData = [
  { name: 'Jan', Vendas: 4000 }, { name: 'Fev', Vendas: 3000 },
  { name: 'Mar', Vendas: 5000 }, { name: 'Abr', Vendas: 4500 },
  { name: 'Mai', Vendas: 6000 }, { name: 'Jun', Vendas: 5500 },
];

const barData = [
  { name: 'Produto A', Vendas: 4000 }, { name: 'Produto B', Vendas: 3000 },
  { name: 'Produto C', Vendas: 2000 }, { name: 'Produto D', Vendas: 2780 },
  { name: 'Produto E', Vendas: 1890 },
];

const pieData = [
  { name: 'Busca Orgânica', value: 400 }, { name: 'Social', value: 300 },
  { name: 'Direto', value: 300 }, { name: 'Referência', value: 200 },
];

const scatterData = [
  { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
];

const stackedBarData = [
    { name: 'Trim 1', iOS: 4000, Android: 2400 },
    { name: 'Trim 2', iOS: 3000, Android: 1398 },
    { name: 'Trim 3', iOS: 2000, Android: 9800 },
    { name: 'Trim 4', iOS: 2780, Android: 3908 },
];


const ExampleChart: React.FC<ExampleChartProps> = ({ chartType }) => {
  const renderChart = () => {
    switch (chartType) {
      case 'Line':
        return (
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Line type="monotone" dataKey="Vendas" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'Area':
        return (
          <AreaChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Area type="monotone" dataKey="Vendas" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
          </AreaChart>
        );
      case 'Column':
      case 'Bar':
        return (
          <BarChart data={barData} layout={chartType === 'Bar' ? 'vertical' : 'horizontal'}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            {chartType === 'Bar' ? <XAxis type="number" stroke="#94a3b8" /> : <XAxis dataKey="name" stroke="#94a3b8" />}
            {chartType === 'Bar' ? <YAxis type="category" dataKey="name" stroke="#94a3b8" width={80} /> : <YAxis stroke="#94a3b8" />}
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Bar dataKey="Vendas" fill="#8884d8" />
          </BarChart>
        );
      case 'Stacked Bar':
        return (
            <BarChart data={stackedBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}/>
                <Legend />
                <Bar dataKey="iOS" stackId="a" fill="#8884d8" />
                <Bar dataKey="Android" stackId="a" fill="#82ca9d" />
            </BarChart>
        );
      case 'Pie':
      case 'Donut':
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={chartType === 'Donut' ? 60 : 0}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
          </PieChart>
        );
      case 'Scatter':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis type="number" dataKey="x" name="Investimento" unit=" R$" stroke="#94a3b8" />
            <YAxis type="number" dataKey="y" name="Vendas" unit=" un" stroke="#94a3b8" />
            <ZAxis type="number" dataKey="z" range={[60, 400]} name="volume" unit="ml" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Scatter name="Produtos" data={scatterData} fill="#8884d8" />
          </ScatterChart>
        );
      default:
        return <div className="text-center text-slate-500">Exemplo de gráfico para '{chartType}' não disponível.</div>;
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {renderChart()}
    </ResponsiveContainer>
  );
};

export default ExampleChart;
