import React, { useState } from 'react';
import { FileUploaderProps } from '../types';
import { Button } from './ui/button';
import axios from 'axios';

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/extract-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.text) {
        onFileUpload(response.data.text);
        setError(null);
      } else {
        throw new Error('No text extracted from PDF');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to extract PDF data. Please try again or use a different file.');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FileUploader;
