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

  // Debt composition by type
  const debtByType = debtData.reduce((acc, debt) => {
    acc[debt.debtType] = (acc[debt.debtType] || 0) + debt.loanAmount;
    return acc;
  }, {} as Record<string, number>);

  // Debt composition by currency
  const debtByCurrency = debtData.reduce((acc, debt) => {
    acc[debt.currency] = (acc[debt.currency] || 0) + debt.loanAmount;
    return acc;
  }, {} as Record<string, number>);

  // Debt composition by creditor
  const debtByCreditor = debtData.reduce((acc, debt) => {
    acc[debt.creditorName] = (acc[debt.creditorName] || 0) + debt.loanAmount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate percentages and sort
  const calculatePercentages = (data: Record<string, number>) => {
    return Object.entries(data)
      .map(([key, value]) => ({
        name: key,
        amount: value,
        percentage: (value / totalDebt) * 100
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const typeComposition = calculatePercentages(debtByType);
  const currencyComposition = calculatePercentages(debtByCurrency);
  const creditorComposition = calculatePercentages(debtByCreditor);

  // Statistical analysis
  const averageInterestRate = debtData.reduce((sum, debt) => sum + debt.interestRate, 0) / debtData.length;
  const averageLoanDuration = debtData.reduce((sum, debt) => sum + debt.loanDuration, 0) / debtData.length;

  const renderCompositionTable = (data: { name: string; amount: number; percentage: number }[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>${item.amount.toLocaleString()}</TableCell>
            <TableCell>{item.percentage.toFixed(2)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Debt Composition Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Total Debt: ${totalDebt.toLocaleString()}</p>
          <p className="text-lg mb-4">Average Interest Rate: {averageInterestRate.toFixed(2)}%</p>
          <p className="text-lg mb-4">Average Loan Duration: {averageLoanDuration.toFixed(1)} years</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debt Composition by Type</CardTitle>
        </CardHeader>
        <CardContent>
          {renderCompositionTable(typeComposition)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debt Composition by Currency</CardTitle>
        </CardHeader>
        <CardContent>
          {renderCompositionTable(currencyComposition)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debt Composition by Creditor</CardTitle>
        </CardHeader>
        <CardContent>
          {renderCompositionTable(creditorComposition)}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisReport;
