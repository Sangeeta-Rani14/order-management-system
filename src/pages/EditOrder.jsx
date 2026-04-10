import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import CreateOrderForm from '../components/order-form/CreateOrderForm';
import { useOrders } from '../context/OrdersContext';

const EditOrder = () => {
  const { id } = useParams();
  const { orders } = useOrders();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return <Navigate to="/orders" />;
  }

  return (
    <PageWrapper>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold font-['Outfit']">Edit Order {id}</h1>
        <p className="text-brand-secondary">Update the details for this existing order entry.</p>
        <CreateOrderForm existingOrder={order} />
      </div>
    </PageWrapper>
  );
};

export default EditOrder;
