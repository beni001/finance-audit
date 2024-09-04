import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { AnalysisProvider } from './contexts/AnalysisContext';

ReactDOM.render(
  <React.StrictMode>
    <AnalysisProvider>
      <App />
    </AnalysisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
