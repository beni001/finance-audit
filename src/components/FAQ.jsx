import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What is project-linked debt?",
      answer: "Project-linked debt refers to loans or financial obligations that are directly tied to specific development projects. In our analysis, we examine how these debts relate to the progress and outcomes of the associated projects."
    },
    {
      question: "How do you analyze interest rates in the debt report?",
      answer: "We compare interest rates across different lenders and loan types. This helps identify which debt agreements have more or less favorable terms, potentially impacting the overall cost of borrowing for the country."
    },
    {
      question: "What does the debt composition analysis show?",
      answer: "The debt composition analysis breaks down the total debt by various factors such as creditor type (bilateral, multilateral, commercial), currency denomination, and loan terms. This provides insights into the diversity and potential risks of the debt portfolio."
    },
    {
      question: "How is project progress measured against loan amounts?",
      answer: "We compare the loan amounts for specific projects with publicly available data on project completion or milestones. This helps identify any discrepancies between funding and project outcomes."
    },
    {
      question: "What are the implications of high levels of project-linked debt?",
      answer: "High levels of project-linked debt can indicate significant investment in development, but also pose risks if projects don't generate expected returns. Our analysis helps assess whether the debt is likely to contribute to economic growth or become a burden."
    },
    {
      question: "How does currency composition affect debt sustainability?",
      answer: "The currency in which debt is denominated can impact its sustainability. Debts in foreign currencies expose the borrower to exchange rate risks. Our analysis shows the proportion of debt in different currencies to highlight potential vulnerabilities."
    },
    {
      question: "What is debt refinancing and how does it appear in the report?",
      answer: "Debt refinancing involves replacing existing debt with new debt, often with different terms. In our report, we identify instances of refinancing and analyze how it affects the overall debt structure and costs."
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQ;
