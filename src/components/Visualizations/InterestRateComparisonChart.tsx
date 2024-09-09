import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DebtData, InterestRateAnalysisType, InterestRateComparisonChartProps } from '../../types';

interface ChartData {
  year: number;
  interestRate: number;
  averageMaturity: number;
}

const InterestRateComparisonChart: React.FC<InterestRateComparisonChartProps> = ({ debtData, analysisType }) => {
  const chartData: ChartData[] = useMemo(() => {
    return debtData.map(entry => ({
      year: entry.year,
      interestRate: entry.interestRate,
      averageMaturity: entry.averageMaturity || 0,
    }));
  }, [debtData]);

  const getYAxisLabel = () => {
    switch (analysisType) {
      case 'interestRate':
        return 'Interest Rate (%)';
      case 'averageMaturity':
        return 'Average Maturity (Years)';
      case 'comparison':
        return 'Value';
      case 'trend':
        return 'Trend';
      case 'forecast':
        return 'Forecast';
      default:
        return 'Value';
    }
  };

  const getChartTitle = () => {
    switch (analysisType) {
      case 'interestRate':
        return 'Interest Rate Analysis';
      case 'averageMaturity':
        return 'Average Maturity Analysis';
      case 'comparison':
        return 'Interest Rate Comparison';
      case 'trend':
        return 'Interest Rate Trend';
      case 'forecast':
        return 'Interest Rate Forecast';
      default:
        return 'Debt Analysis';
    }
  };

  const getLineDataKey = () => {
    switch (analysisType) {
      case 'interestRate':
      case 'comparison':
      case 'trend':
      case 'forecast':
        return 'interestRate';
      case 'averageMaturity':
        return 'averageMaturity';
      default:
        return 'interestRate';
    }
  };

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {getChartTitle()}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#4B5563' }}
          />
          <YAxis
            label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft', fill: '#4B5563' }}
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#4B5563' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#F3F4F6', border: 'none', borderRadius: '0.375rem' }}
            labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey={getLineDataKey()}
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InterestRateComparisonChart;
