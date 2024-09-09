import { DebtData, ProjectData } from '../types';

export function validateDebtData(data: DebtData[]): boolean {
  // Implement your debt data validation logic here
  return data.every(item => 
    item.creditorName && 
    item.loanAmount && 
    item.currency && 
    item.projectName && 
    item.interestRate && 
    item.loanDuration && 
    item.debtType
  );
}

export function validateProjectData(data: ProjectData[]): boolean {
  return data.every(item =>
    item.projectName &&
    item.budget &&
    item.year &&
    item.progress &&
    item.totalLoanAmount &&
    item.amountUtilized &&
    item.startDate &&
    item.expectedEndDate
  );
}

export function validatePDFContent(content: string): boolean {
  // Implement your PDF content validation logic here
  return content.includes('Creditor Name') && content.includes('Project Name');
}
