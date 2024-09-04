import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, version } from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import { DebtData, ProjectData } from '../types';
import Papa from 'papaparse';

// Set the worker source
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

export async function parsePDF(file: File): Promise<PDFDocumentProxy> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf: PDFDocumentProxy = await getDocument({ data: arrayBuffer }).promise;

    let pdfText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      pdfText += textContent.items
        .filter((item: any): item is TextItem => 'str' in item)
        .map((item: any) => item.str)
        .join(' ');
    }

    if (pdfText.trim() === '') {
      throw new Error('PDF file is empty or contains no text content');
    }

    return pdf;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF');
  }
}

export function convertPDFTextToData(pdfText: string): { debtData: DebtData[], projectData: ProjectData[] } {
  const debtData: DebtData[] = [];
  const projectData: ProjectData[] = [];

  try {
    const parsedData = Papa.parse(pdfText, {
      download: false,
      header: true,
      skipEmptyLines: true,
      transform: (value: string, field: string) => {
        if (field === 'loanAmount' || field === 'interestRate') {
          return parseFloat(value);
        } else if (field === 'loanDuration') {
          return parseInt(value);
        }
        return value;
      }
    });

    parsedData.data.forEach((row: any) => {
      if (row.debtType === 'bilateral' || row.debtType === 'multilateral' || row.debtType === 'commercial') {
        debtData.push(row as DebtData);
      } else {
        projectData.push(row as ProjectData);
      }
    });
  } catch (error) {
    console.error('Error converting PDF text to data:', error);
    throw new Error('Failed to convert PDF text to data');
  }

  return { debtData, projectData };
}

export async function loadPDFFromPublic(filename: string): Promise<PDFDocumentProxy> {
  try {
    const response = await fetch(`/assets/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status} - ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdf: PDFDocumentProxy = await getDocument({ data: arrayBuffer }).promise;

    if (pdf.numPages === 0) {
      throw new Error('PDF file is empty');
    }

    return pdf;
  } catch (error) {
    console.error('Error loading PDF from public folder:', error);
    throw new Error('Failed to load PDF from public folder');
  }
}
