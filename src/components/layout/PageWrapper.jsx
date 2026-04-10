import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const PageWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark flex overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col transition-all duration-300 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="mt-20 flex-1 p-4 md:p-6 lg:p-8 animate-in fade-in duration-700 w-full overflow-hidden">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
