import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import CreateOrderForm from '../components/order-form/CreateOrderForm';

const CreateOrder = () => {
  return (
    <PageWrapper>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold font-['Outfit'] text-brand-primary">Create New Order</h1>
        <p className="text-slate-400">Step through our smart wizard to generate a new order entry.</p>
        <CreateOrderForm />
      </div>
    </PageWrapper>
  );
};

export default CreateOrder;
