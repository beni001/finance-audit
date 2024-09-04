import React from 'react';
import { DebtData, ProjectData } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


interface ProjectLinkedDebtAnalysisProps {
  debtData: DebtData[];
  projectData: ProjectData[];
}

const ProjectLinkedDebtAnalysis: React.FC<ProjectLinkedDebtAnalysisProps> = ({ debtData, projectData }) => {
  // Group debt by project
  const projectDebt = debtData.reduce((acc, debt) => {
    if (!acc[debt.projectName]) {
      acc[debt.projectName] = [];
    }
    acc[debt.projectName].push(debt);
    return acc;
  }, {} as Record<string, DebtData[]>);

  // Calculate project summaries
  const projectSummaries = Object.entries(projectDebt).map(([projectName, debts]) => {
    const totalAmount = debts.reduce((sum, debt) => sum + debt.loanAmount, 0);
    const averageInterestRate = debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length;
    const averageLoanDuration = debts.reduce((sum, debt) => sum + debt.loanDuration, 0) / debts.length;
    
    const creditors = Array.from(new Set(debts.map(debt => debt.creditorName)));
    const debtTypes = Array.from(new Set(debts.map(debt => debt.debtType)));

    return {
      projectName,
      totalAmount,
      averageInterestRate,
      averageLoanDuration,
      numberOfLoans: debts.length,
      creditors,
      debtTypes
    };
  }).sort((a, b) => b.totalAmount - a.totalAmount);

  // Calculate overall statistics
  const totalDebt = projectSummaries.reduce((sum, project) => sum + project.totalAmount, 0);
  const averageProjectDebt = totalDebt / projectSummaries.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project-Linked Debt Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-2">Total Project-Linked Debt: ${totalDebt.toLocaleString()}</p>
          <p className="text-lg mb-2">Number of Projects: {projectSummaries.length}</p>
          <p className="text-lg mb-2">Average Debt per Project: ${averageProjectDebt.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Debt Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Total Debt</TableHead>
                <TableHead>Avg. Interest Rate</TableHead>
                <TableHead>Avg. Loan Duration</TableHead>
                <TableHead>Number of Loans</TableHead>
                <TableHead>Creditors</TableHead>
                <TableHead>Debt Types</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectSummaries.map((project, index) => (
                <TableRow key={index}>
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>${project.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{project.averageInterestRate.toFixed(2)}%</TableCell>
                  <TableCell>{project.averageLoanDuration.toFixed(1)} years</TableCell>
                  <TableCell>{project.numberOfLoans}</TableCell>
                  <TableCell>{project.creditors.join(', ')}</TableCell>
                  <TableCell>{project.debtTypes.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Most Indebted Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {projectSummaries.slice(0, 5).map((project, index) => (
              <li key={index} className="text-lg mb-2">
                {project.projectName}: ${project.totalAmount.toLocaleString()} 
                ({((project.totalAmount / totalDebt) * 100).toFixed(2)}% of total debt)
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectLinkedDebtAnalysis;
