import React from 'react';
import { DebtData, ProjectData } from '../types';

interface DataExtractorProps {
  debtData: DebtData[];
  projectData: ProjectData[];
}

const DataExtractor: React.FC<DataExtractorProps> = ({ debtData, projectData }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Extracted Data</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Debt Data ({debtData.length} items)</h3>
        <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
          {JSON.stringify(debtData, null, 2)}
        </pre>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Project Data ({projectData.length} items)</h3>
        <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
          {JSON.stringify(projectData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DataExtractor;