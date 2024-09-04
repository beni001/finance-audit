import React from 'react';

export const Container: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`container mx-auto px-4 ${className}`} {...props}>{children}</div>
);

export const Header: React.FC<React.HTMLProps<HTMLElement>> = ({ children, className, ...props }) => (
  <header className={`bg-gray-800 text-white py-4 ${className}`} {...props}>{children}</header>
);

export const Main: React.FC<React.HTMLProps<HTMLElement>> = ({ children, className, ...props }) => (
  <main className={`flex-grow ${className}`} {...props}>{children}</main>
);

export const Footer: React.FC<React.HTMLProps<HTMLElement>> = ({ children, className, ...props }) => (
  <footer className={`bg-gray-800 text-white py-4 ${className}`} {...props}>{children}</footer>
);
