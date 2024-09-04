import React from 'react';
import '../index.css'; 

const Header: React.FC = () => (
  <header className="grainy-background  p-8 text-center"> {/* Increased padding and centered text */}
    <h1 className="text-4xl font-bold text-outline-gold">PUBLIC DEBT ANALYSIS</h1> {/* Increased font size */}
  </header>
);

export default Header;
