import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface DebtData {
  creditorName: string;
  loanAmount: number;
  currency: string;
  projectName: string;
  interestRate: number;
  loanDuration: number;
  debtType: 'bilateral' | 'multilateral' | 'commercial';
}

interface AnalysisReportProps {
  debtData: DebtData[];
}

const AnalysisReport = ({ debtData }: AnalysisReportProps) => {
  const totalDebt = debtData.reduce((sum, debt) => sum + debt.loanAmount, 0);
  const averageInterestRate = debtData.reduce((sum, debt) => sum + debt.interestRate, 0) / debtData.length;

  const debtComposition = debtData.reduce((acc, debt) => {
    acc[debt.debtType] = (acc[debt.debtType] || 0) + debt.loanAmount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Debt Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Total Debt: ${totalDebt.toLocaleString()}</p>
          <p className="text-lg">Average Interest Rate: {averageInterestRate.toFixed(2)}%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debt Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(debtComposition).map(([type, amount]) => (
              <li key={type} className="text-lg">
                {type}: ${amount.toLocaleString()} ({((amount / totalDebt) * 100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Debt Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creditor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Duration (years)</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {debtData.map((debt, index) => (
                <TableRow key={index}>
                  <TableCell>{debt.creditorName}</TableCell>
                  <TableCell>{debt.loanAmount.toLocaleString()}</TableCell>
                  <TableCell>{debt.currency}</TableCell>
                  <TableCell>{debt.projectName}</TableCell>
                  <TableCell>{debt.interestRate}%</TableCell>
                  <TableCell>{debt.loanDuration}</TableCell>
                  <TableCell>{debt.debtType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisReport;
