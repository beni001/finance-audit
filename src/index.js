import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { AnalysisProvider } from './contexts/AnalysisContext';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AnalysisProvider>
        <App />
      </AnalysisProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
