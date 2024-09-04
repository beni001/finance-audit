import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AnalysisType } from '../../types/analysis';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DebtData {
  creditorName: string;
  loanAmount: number;
  currency: string;
  projectName: string;
  interestRate: number;
  loanDuration: number;
  debtType: 'bilateral' | 'multilateral' | 'commercial';
}

interface DebtCompositionPieChartProps {
  debtData: DebtData[];
  analysisType: AnalysisType;
}

const DebtCompositionPieChart: React.FC<DebtCompositionPieChartProps> = ({ debtData }) => {
  // Calculate debt composition by type
  const debtByType = debtData.reduce((acc, debt) => {
    acc[debt.debtType] = (acc[debt.debtType] || 0) + debt.loanAmount;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(debtByType),
    datasets: [
      {
        data: Object.values(debtByType),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Debt Composition by Type',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Debt Composition</CardTitle>
      </CardHeader>
      <CardContent>
        <Pie data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default DebtCompositionPieChart;
