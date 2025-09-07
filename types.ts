export type ChartType = 
  | 'Line' 
  | 'Area' 
  | 'Column' 
  | 'Bar' 
  | 'Pie' 
  | 'Donut' 
  | 'Stacked Bar' 
  | 'Histogram' 
  | 'Box Plot' 
  | 'Scatter';

export interface ChartRecommendation {
  chartType: ChartType;
  reasoning: string;
}
