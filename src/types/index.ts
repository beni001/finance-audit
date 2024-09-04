// src/types/index.ts
export interface DebtData {
  year: number;
  interestRate: number;
  averageMaturity?: number;
  id: string;
  creditorName: string;
  loanAmount: number;
  currency: string;
  projectName: string;
  loanDuration: number;
  debtType: 'bilateral' | 'multilateral' | 'commercial';
}

export interface ProjectData {
  id: string;
  projectName: string;
  totalLoanAmount: number;
  amountUtilized: number;
  startDate: Date;
  expectedEndDate: Date;
}

export interface ChartData {
  year: number;
  interestRate: number;
  averageMaturity: number;
}

export type InterestRateAnalysisType = 'comparison' | 'trend' | 'forecast';

export type AnalysisType = 'composition' | 'type' | 'creditor' | 'currency';
