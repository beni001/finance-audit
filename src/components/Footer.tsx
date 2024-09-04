import React from 'react';
import '../index.css';

const Footer: React.FC = () => (
  <footer className=" p-4 mt-auto">
    <p className="font-bold text-center text-outline-gold">&copy; {new Date().getFullYear()} Public Debt Analysis. All rights reserved.</p>
  </footer>
);

export default Footer;