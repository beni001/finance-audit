import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProjectData {
  projectName: string;
  totalLoanAmount: number;
  amountUtilized: number;
  startDate: Date;
  expectedEndDate: Date;
}

interface ProjectProgressChartProps {
  projectData: ProjectData[];
}

const ProjectProgressChart: React.FC<ProjectProgressChartProps> = ({ projectData }) => {
  const sortedProjects = projectData
    .map(project => ({
      ...project,
      progressPercentage: (project.amountUtilized / project.totalLoanAmount) * 100,
      timeProgress: calculateTimeProgress(project.startDate, project.expectedEndDate)
    }))
    .sort((a, b) => b.progressPercentage - a.progressPercentage);

  const data = {
    labels: sortedProjects.map(project => project.projectName),
    datasets: [
      {
        label: 'Loan Utilization Progress',
        data: sortedProjects.map(project => project.progressPercentage),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Time Progress',
        data: sortedProjects.map(project => project.timeProgress),
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Project Progress',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw;
            if (typeof value === 'number' && !isNaN(value)) {
              return `${label}: ${value.toFixed(2)}%`;
            } else {
              return `${label}: ${value}`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Progress (%)'
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

function calculateTimeProgress(startDate: Date, expectedEndDate: Date): number {
  const today = new Date();
  const totalDuration = expectedEndDate.getTime() - startDate.getTime();
  const elapsedDuration = today.getTime() - startDate.getTime();
  return Math.min((elapsedDuration / totalDuration) * 100, 100);
}

export default ProjectProgressChart;
