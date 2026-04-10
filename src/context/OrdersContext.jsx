import React, { createContext, useContext, useState } from 'react';
import { mockOrders } from '../data/mockOrders';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([...mockOrders]);

  const addOrder = (formData) => {
    const initials = formData.customerName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const productLabels = {
      cloud_pro: 'Cloud Services Pro',
      enterprise_suite: 'Enterprise Suite',
      data_analytics: 'Data Analytics Plus',
    };

    const priceMap = {
      cloud_pro: 799,
      enterprise_suite: 2499,
      data_analytics: 1199,
    };

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData.customerName,
      email: formData.email,
      date: new Date().toISOString().split('T')[0],
      total: (priceMap[formData.product] || 500) * parseInt(formData.quantity || 1, 10),
      status: 'pending',
      priority: formData.priority,
      items: parseInt(formData.quantity || 1, 10),
      assigned: 'Unassigned',
      avatar: initials,
      product: productLabels[formData.product] || formData.product,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      phone: formData.phone,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrder = (id, updatedData) => {
    setOrders((prev) => 
      prev.map((order) => 
        order.id === id ? { ...order, ...updatedData } : order
      )
    );
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
