import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-dark flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header />
        <main className="mt-20 flex-1 p-8 animate-in fade-in duration-700">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
