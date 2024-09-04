import React from 'react';
import { DebtData, ProjectData } from '../types';

interface DataExtractorProps {
  debtData: DebtData[];
  projectData: ProjectData[];
}

const DataExtractor: React.FC<DataExtractorProps> = ({ debtData, projectData }) => {
  return (
    <div>
      <h2 className="text-xl mb-4">Data Extractor</h2>
      <div>
        <h3 className="text-lg mb-2">Debt Data</h3>
        <pre>{JSON.stringify(debtData, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-lg mb-2">Project Data</h3>
        <pre>{JSON.stringify(projectData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DataExtractor;