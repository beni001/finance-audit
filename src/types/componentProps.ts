export type InterestRateAnalysisType = 'comparison' | 'trend' | 'forecast';

export type AnalysisType = 'interestRate' | 'averageMaturity';

export interface DebtData {
  year: number;
  interestRate: number;
  averageMaturity?: number;
  // Add other properties as needed
}

export interface ProjectData {
  name: string;
  budget: number;
  year: number;
  progress: number;
  // Add any other necessary properties
}
