import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { OrdersProvider } from './context/OrdersContext';
import Dashboard from './pages/Dashboard';
import OrderListing from './pages/OrderListing';
import OrderDetail from './pages/OrderDetail';
import CreateOrder from './pages/CreateOrder';
import EditOrder from './pages/EditOrder';
import ActivityPanel from './pages/ActivityPanel';

function App() {
  return (
    <ThemeProvider>
      <OrdersProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrderListing />} />
            <Route path="/orders/new" element={<CreateOrder />} />
            <Route path="/orders/edit/:id" element={<EditOrder />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/notifications" element={<ActivityPanel />} />
          </Routes>
        </Router>
      </OrdersProvider>
    </ThemeProvider>
  );
}

export default App;
