import React, { useState } from 'react';
import ProjectLinkedDebtAnalysis from './Analysis/ProjectLinkedDebtAnalysis';
import DebtCompositionPieChart from './Visualizations/DebtCompositionPieChart';
import InterestRateComparisonChart from './Visualizations/InterestRateComparisonChart';
import ProjectProgressChart from './Visualizations/ProjectProgressChart';
import { DebtData, ProjectData, AnalysisType } from '../types/index';
import { InterestRateAnalysisType } from '../types/componentProps';
import { PDFDocumentProxy, getDocument } from 'pdfjs-dist';
import { validatePDFContent, validateDebtData, validateProjectData } from '../utils/validations';
import { parseDebtData, parseProjectData } from '../utils/parsers';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import FileUploader from './FileUploader';
import DataExtractor from './DataExtractor';
import FAQ from './FAQ';

const App: React.FC = () => {
  const [appDebtData, setAppDebtData] = useState<DebtData[]>([]);
  const [appProjectData, setAppProjectData] = useState<ProjectData[]>([]);
  const [debtAnalysisType, setDebtAnalysisType] = useState<AnalysisType>('composition');
  const [interestAnalysisType, setInterestAnalysisType] = useState<InterestRateAnalysisType>('comparison');

  async function parsePDF(file: File): Promise<PDFDocumentProxy> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    return pdf;
  }

  async function extractTextFromPDF(pdf: PDFDocumentProxy): Promise<string> {
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter((item): item is TextItem => 'str' in item)
        .map(item => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  }

  async function handleFileUpload(file: File) {
    try {
      const pdf = await parsePDF(file);
      const text = await extractTextFromPDF(pdf);
      
      if (!validatePDFContent(text)) {
        throw new Error('Invalid PDF content');
      }

      const extractedDebtData = parseDebtData(text);
      const extractedProjectData = parseProjectData(text);

      if (!validateDebtData(extractedDebtData) || !validateProjectData(extractedProjectData)) {
        throw new Error('Invalid data extracted from PDF');
      }

      setAppDebtData(extractedDebtData as DebtData[]);
      setAppProjectData(extractedProjectData as ProjectData[]);
    } catch (error) {
      console.error('Error processing PDF:', error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Public Debt Analysis</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        <FileUploader onFileUpload={handleFileUpload} />
        <DataExtractor debtData={appDebtData} projectData={appProjectData} />
        
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
            debtData={appDebtData as DebtData[]} 
            projectData={appProjectData as ProjectData[]} 
          />
        </div>

        <FAQ />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 Public Debt Analysis Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;