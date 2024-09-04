import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DebtData, InterestRateAnalysisType } from '../../types/componentProps';

// Remove this line as it's now redundant
// type InterestRateAnalysisType = 'interestRate' | 'averageMaturity';

interface ChartData {
  year: number;
  interestRate: number;
  averageMaturity: number;
}

interface InterestRateComparisonChartProps {
  debtData: DebtData[];
  analysisType: InterestRateAnalysisType;
}

const InterestRateComparisonChart: React.FC<InterestRateComparisonChartProps> = ({ debtData, analysisType }) => {
  const chartData: ChartData[] = useMemo(() => {
    return debtData.map(entry => ({
      year: entry.year,
      interestRate: entry.interestRate,
      averageMaturity: 'averageMaturity' in entry ? Number(entry.averageMaturity) : 0,
    }));
  }, [debtData]);

  const getYAxisLabel = () => {
    switch (analysisType) {
      case 'comparison':
        return 'Interest Rate (%)';
      case 'trend':
        return 'Interest Rate Trend';
      case 'forecast':
        return 'Forecasted Interest Rate (%)';
      default:
        return 'Value';
    }
  };

  const getChartTitle = () => {
    switch (analysisType) {
      case 'comparison':
        return 'Interest Rate Comparison';
      case 'trend':
        return 'Interest Rate Trend Analysis';
      case 'forecast':
        return 'Interest Rate Forecast';
      default:
        return 'Interest Rate Analysis';
    }
  };

  const getLineDataKey = () => {
    return analysisType === 'comparison' ? 'interestRate' : 'averageMaturity';
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
