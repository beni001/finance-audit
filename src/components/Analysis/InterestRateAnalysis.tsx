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

interface InterestRateAnalysisProps {
  debtData: DebtData[];
}

const InterestRateAnalysis = ({ debtData }: InterestRateAnalysisProps) => {
  // Basic statistics
  const averageInterestRate = debtData.reduce((sum, debt) => sum + debt.interestRate, 0) / debtData.length;
  const minInterestRate = Math.min(...debtData.map(debt => debt.interestRate));
  const maxInterestRate = Math.max(...debtData.map(debt => debt.interestRate));

  // Weighted average interest rate (weighted by loan amount)
  const weightedAverageInterestRate = 
    debtData.reduce((sum, debt) => sum + debt.interestRate * debt.loanAmount, 0) /
    debtData.reduce((sum, debt) => sum + debt.loanAmount, 0);

  // Interest rate by debt type
  const interestRateByType = debtData.reduce((acc, debt) => {
    if (!acc[debt.debtType]) {
      acc[debt.debtType] = { sum: 0, count: 0, totalAmount: 0 };
    }
    acc[debt.debtType].sum += debt.interestRate;
    acc[debt.debtType].count += 1;
    acc[debt.debtType].totalAmount += debt.loanAmount;
    return acc;
  }, {} as Record<string, { sum: number; count: number; totalAmount: number }>);

  // Calculate averages and weighted averages by type
  const interestRateAnalysisByType = Object.entries(interestRateByType).map(([type, data]) => ({
    type,
    averageRate: data.sum / data.count,
    weightedAverageRate: (data.sum * data.totalAmount) / (data.count * data.totalAmount),
    totalAmount: data.totalAmount
  }));

  // Interest rate distribution
  const interestRateRanges = [
    { range: '0-2%', count: 0 },
    { range: '2-4%', count: 0 },
    { range: '4-6%', count: 0 },
    { range: '6-8%', count: 0 },
    { range: '8%+', count: 0 }
  ];

  debtData.forEach(debt => {
    if (debt.interestRate < 2) interestRateRanges[0].count++;
    else if (debt.interestRate < 4) interestRateRanges[1].count++;
    else if (debt.interestRate < 6) interestRateRanges[2].count++;
    else if (debt.interestRate < 8) interestRateRanges[3].count++;
    else interestRateRanges[4].count++;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Interest Rate Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-2">Average Interest Rate: {averageInterestRate.toFixed(2)}%</p>
          <p className="text-lg mb-2">Weighted Average Interest Rate: {weightedAverageInterestRate.toFixed(2)}%</p>
          <p className="text-lg mb-2">Minimum Interest Rate: {minInterestRate.toFixed(2)}%</p>
          <p className="text-lg mb-2">Maximum Interest Rate: {maxInterestRate.toFixed(2)}%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interest Rate Analysis by Debt Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Debt Type</TableHead>
                <TableHead>Average Rate</TableHead>
                <TableHead>Weighted Average Rate</TableHead>
                <TableHead>Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interestRateAnalysisByType.map((analysis, index) => (
                <TableRow key={index}>
                  <TableCell>{analysis.type}</TableCell>
                  <TableCell>{analysis.averageRate.toFixed(2)}%</TableCell>
                  <TableCell>{analysis.weightedAverageRate.toFixed(2)}%</TableCell>
                  <TableCell>${analysis.totalAmount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interest Rate Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interest Rate Range</TableHead>
                <TableHead>Number of Loans</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interestRateRanges.map((range, index) => (
                <TableRow key={index}>
                  <TableCell>{range.range}</TableCell>
                  <TableCell>{range.count}</TableCell>
                  <TableCell>{((range.count / debtData.length) * 100).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterestRateAnalysis;
