import React, { useState } from 'react';
import { parseDebtData, parseProjectData } from '../utils/parsers';
import { supabase } from '../lib/supabaseClient';
import { DebtData, ProjectData, AnalysisType, InterestRateAnalysisType } from '../types';
import ProjectLinkedDebtAnalysis from './Analysis/ProjectLinkedDebtAnalysis';
import DebtCompositionPieChart from './Visualizations/DebtCompositionPieChart';
import InterestRateComparisonChart from './Visualizations/InterestRateComparisonChart';
import ProjectProgressChart from './Visualizations/ProjectProgressChart';
import FileUploader from './FileUploader';
import FAQ from './FAQ';
import { sampleDebtData, sampleProjectData } from '../data/sampleData';
import { extractTextFromPDF } from '../utils/pdfExtractor';

const App: React.FC = () => {
  const [appDebtData, setAppDebtData] = useState<DebtData[]>(sampleDebtData);
  const [appProjectData, setAppProjectData] = useState<ProjectData[]>(sampleProjectData);
  const [debtAnalysisType, setDebtAnalysisType] = useState<AnalysisType>('composition');
  const [interestAnalysisType, setInterestAnalysisType] = useState<InterestRateAnalysisType>('comparison');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      // Extract text from PDF
      const text = await extractTextFromPDF(file);
      
      // Parse the extracted text
      const debtData = parseDebtData(text);
      const projectData = parseProjectData(text);
      
      // Upload to Supabase
      const { data: debtInsertData, error: debtError } = await supabase
        .from('debt')
        .upsert(debtData);
      
      const { data: projectInsertData, error: projectError } = await supabase
        .from('projects')
        .upsert(projectData);

      if (debtError) throw debtError;
      if (projectError) throw projectError;
      
      setAppDebtData(debtData);
      setAppProjectData(projectData);
      console.log('Data successfully uploaded to Supabase');
    } catch (error) {
      console.error('Error processing PDF:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Render error message if there's an error
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Public Debt Analysis</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <ProjectProgressChart projectData={appProjectData} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Debt Composition Analysis</h2>
            <select 
              className="w-full p-2 mb-4 border rounded"
              value={debtAnalysisType}
              onChange={(e) => setDebtAnalysisType(e.target.value as AnalysisType)}
            >
              <option value="composition">Analysis by Composition</option>
              <option value="type">Analysis by Type</option>
              <option value="creditor">Analysis by Creditor</option>
              <option value="currency">Analysis by Currency</option>
            </select>
            <DebtCompositionPieChart debtData={appDebtData} analysisType={debtAnalysisType} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Interest Rate Analysis</h2>
            <select 
              className="w-full p-2 mb-4 border rounded"
              value={interestAnalysisType}
              onChange={(e) => setInterestAnalysisType(e.target.value as InterestRateAnalysisType)}
            >
              <option value="comparison">Rate Comparison</option>
              <option value="trend">Rate Trend</option>
              <option value="forecast">Rate Forecast</option>
            </select>
            <InterestRateComparisonChart debtData={appDebtData} analysisType={interestAnalysisType} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Project-Linked Debt Analysis</h2>
          <ProjectLinkedDebtAnalysis 
            debtData={appDebtData} 
            projectData={appProjectData} 
          />
        </div>

        <FileUploader onFileUpload={handleFileUpload} />

        <FAQ />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 Public Debt Analysis Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;