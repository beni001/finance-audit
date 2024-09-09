import { DebtData, ProjectData } from '../types';

export function parseDebtData(pdfText: string): DebtData[] {
  const debtDataPattern = /Creditor Name:\s*([\w\s]+),?\s*Loan Amount:\s*(\d+(?:\.\d+)?),?\s*Currency:\s*(\w+),?\s*Project Name:\s*([\w\s]+),?\s*Interest Rate:\s*(\d+(?:\.\d+)?),?\s*Loan Duration:\s*(\d+),?\s*Debt Type:\s*(bilateral|multilateral|commercial)/gi;
  const debtData: DebtData[] = [];

  let match;
  while ((match = debtDataPattern.exec(pdfText)) !== null) {
    debtData.push({
      id: `debt-${debtData.length + 1}`,
      creditorName: match[1].trim(),
      loanAmount: parseFloat(match[2]),
      currency: match[3],
      projectName: match[4].trim(),
      interestRate: parseFloat(match[5]),
      loanDuration: parseInt(match[6]),
      debtType: match[7].toLowerCase() as 'bilateral' | 'multilateral' | 'commercial',
      year: new Date().getFullYear() // Add this line or extract year from PDF if available
    });
  }

  return debtData;
}

export function parseProjectData(pdfText: string): ProjectData[] {
  const projectDataPattern = /Project Name:\s*([\w\s]+),?\s*Total Loan Amount:\s*(\d+(?:\.\d+)?),?\s*Amount Utilized:\s*(\d+(?:\.\d+)?),?\s*Start Date:\s*(\d{4}-\d{2}-\d{2}),?\s*Expected End Date:\s*(\d{4}-\d{2}-\d{2})/gi;
  const projectData: ProjectData[] = [];

  let match;
  while ((match = projectDataPattern.exec(pdfText)) !== null) {
    projectData.push({
      id: `project-${projectData.length + 1}`,
      projectName: match[1].trim(),
      budget: parseFloat(match[2]),
      year: new Date(match[4]).getFullYear(),
      progress: parseFloat(match[3]) / parseFloat(match[2]) * 100,
      totalLoanAmount: parseFloat(match[2]),
      amountUtilized: parseFloat(match[3]),
      startDate: new Date(match[4]),
      expectedEndDate: new Date(match[5])
    });
  }

  return projectData;
}
