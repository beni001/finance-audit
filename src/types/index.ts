// src/types/index.ts

export interface DebtData {
  id: string;
  year: number;
  interestRate: number;
  averageMaturity?: number;
  creditorName: string;
  loanAmount: number;
  currency: string;
  projectName: string;
  loanDuration: number;
  debtType: 'bilateral' | 'multilateral' | 'commercial';
  totalDebt?: number;
  externalDebt?: number;
  domesticDebt?: number;
}

export interface ProjectData {
  id: string;
  projectName: string;
  budget: number;
  year: number;
  progress: number;
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

export type InterestRateAnalysisType = 'interestRate' | 'averageMaturity' | 'comparison' | 'trend' | 'forecast';

export type AnalysisType = 'composition' | 'trend' | 'type' | 'creditor' | 'currency';

export interface InterestRateComparisonChartProps {
  debtData: DebtData[];
  analysisType: InterestRateAnalysisType;
}

export interface FileUploaderProps {
  onFileUpload: (file: File) => Promise<void>;
}

export interface Creditor {
  id: string;
  name: string;
  type: string;
}

export interface Loan {
  id: string;
  creditor_id: string;
  currency: string;
  amount_outstanding: number;
  year: number;
  interest_rate: number | null;
  maturity_date: string | null;
}
