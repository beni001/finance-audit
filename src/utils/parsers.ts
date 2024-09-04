import { DebtData, ProjectData } from '../types';

export function parseDebtData(pdfText: string): DebtData[] {
  const debtDataPattern = /Creditor Name: ([\w\s]+), Loan Amount: (\d+(?:\.\d+)?), Currency: (\w+), Project Name: ([\w\s]+), Interest Rate: (\d+(?:\.\d+)?), Loan Duration: (\d+), Debt Type: (bilateral|multilateral|commercial)/g;
  const debtData: DebtData[] = [];

  let match;
  while ((match = debtDataPattern.exec(pdfText)) !== null) {
    debtData.push({
      id: `debt-${debtData.length}`,
      creditorName: match[1],
      loanAmount: parseFloat(match[2]),
      currency: match[3],
      projectName: match[4],
      interestRate: parseFloat(match[5]),
      loanDuration: parseInt(match[6]),
      debtType: match[7] as 'bilateral' | 'multilateral' | 'commercial',
      year: new Date().getFullYear() // Add this line or extract year from PDF if available
    });
  }

  return debtData;
}

export function parseProjectData(pdfText: string): ProjectData[] {
  const projectDataPattern = /Project Name: ([\w\s]+), Total Loan Amount: (\d+(?:\.\d+)?), Amount Utilized: (\d+(?:\.\d+)?), Start Date: (\d{4}-\d{2}-\d{2}), Expected End Date: (\d{4}-\d{2}-\d{2})/g;
  const projectData: ProjectData[] = [];

  let match;
  while ((match = projectDataPattern.exec(pdfText)) !== null) {
    projectData.push({
      id: `project-${projectData.length}`,
      projectName: match[1],
      totalLoanAmount: parseFloat(match[2]),
      amountUtilized: parseFloat(match[3]),
      startDate: new Date(match[4]),
      expectedEndDate: new Date(match[5])
    });
  }

  return projectData;
}
