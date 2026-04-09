import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import OrderListing from './pages/OrderListing';
import OrderDetail from './pages/OrderDetail';
import CreateOrder from './pages/CreateOrder';
import ActivityPanel from './pages/ActivityPanel';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrderListing />} />
          <Route path="/orders/new" element={<CreateOrder />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
         
          <Route path="/notifications" element={<ActivityPanel />} />
         
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
