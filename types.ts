export type ChartType = 
  | 'Line' 
  | 'Area' 
  | 'Column' 
  | 'Bar' 
  | 'Pie' 
  | 'Donut' 
  | 'Stacked Bar' 
  | 'Histogram' 
  | 'Scatter';

export interface ChartRecommendation {
  chartType: ChartType;
  reasoning: string;
}