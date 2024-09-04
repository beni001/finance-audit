import { DebtData, ProjectData } from '../types';

export function validateDebtData(data: DebtData[]): boolean {
  // Implement validation logic for array of DebtData
  return data.every(item => (
    item.id && item.creditorName && item.loanAmount && item.currency
    // Add other necessary checks
  ));
}

export function validateProjectData(data: ProjectData[]): boolean {
  // Implement validation logic for array of ProjectData
  return data.every(item => (
    item.id && item.projectName && item.totalLoanAmount && item.amountUtilized
    // Add other necessary checks
  ));
}

export function validatePDFContent(content: string): boolean {
  // Add your validation logic here
  return true;
}
