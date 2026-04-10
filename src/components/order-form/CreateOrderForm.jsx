import React, { useState } from 'react';
import Card from '../ui/Card';
import { User, Package, CreditCard, CheckCircle2, ChevronRight, ChevronLeft, Save, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateOrderForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    product: '',
    quantity: '1',
    priority: 'medium',
    paymentMethod: 'credit_card',
    notes: ''
  });
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order created successfully!');
    navigate('/orders');
  };

  const steps = [
    { title: 'Customer Info', icon: User },
    { title: 'Order Details', icon: Package },
    { title: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-12">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`flex flex-col items-center gap-3 relative z-10`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
                step >= i + 1 ? 'bg-brand-gradient text-white scale-110' : 'bg-brand-surface border border-brand-border text-slate-500'
              }`}>
                <s.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${
                step >= i + 1 ? 'text-brand-accent' : 'text-slate-600'
              }`}>{s.title}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 bg-brand-border/30 relative -top-4">
                <div className={`absolute inset-0 bg-brand-accent transition-all duration-500 ${step > i + 1 ? 'w-full' : 'w-0'}`}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <Card title={steps[step-1].title} subtitle={`Complete step ${step} of 3 to create a new order`}>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe"
                  className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all text-white"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delivery Address</label>
                <textarea 
                  rows="3"
                  placeholder="Enter full address..."
                  className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all text-white"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                ></textarea>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Product</label>
                <select 
                  className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-accent/50 text-white"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                >
                  <option value="">Choose a product...</option>
                  <option value="cloud_pro">Cloud Services Pro</option>
                  <option value="enterprise_suite">Enterprise Suite</option>
                  <option value="data_analytics">Data Analytics Plus</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</label>
                <div className="flex gap-3">
                  {['low', 'medium', 'high'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({...formData, priority: p})}
                      className={`flex-1 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                        formData.priority === p 
                          ? 'bg-brand-accent/10 border-brand-accent text-brand-accent' 
                          : 'bg-brand-surface border-brand-border text-slate-500 hover:border-slate-500'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Notes</label>
                <textarea 
                  rows="3"
                  className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-accent/50 text-white"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                ></textarea>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'credit_card', name: 'Credit Card', desc: 'Secure online payment', icon: CreditCard },
                  { id: 'paypal', name: 'PayPal', desc: 'Fast and easy', icon: CheckCircle2 },
                ].map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setFormData({...formData, paymentMethod: method.id})}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === method.id 
                        ? 'border-brand-accent bg-brand-accent/5 shadow-lg shadow-brand-accent/5' 
                        : 'border-brand-border/40 hover:border-brand-border'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${formData.paymentMethod === method.id ? 'bg-brand-accent text-white' : 'bg-brand-surface text-slate-500'}`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{method.name}</p>
                        <p className="text-xs text-slate-500">{method.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-brand-surface/30 p-6 rounded-2xl border border-brand-border/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Order Summary</h4>
                    <p className="text-xs text-slate-500 italic">Review your details before submitting</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="text-slate-200">{formData.customerName || 'N/A'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Product</span><span className="text-slate-200">{formData.product || 'N/A'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Priority</span><span className="text-brand-accent font-bold uppercase text-xs">{formData.priority}</span></div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                step === 1 ? 'opacity-0' : 'bg-brand-surface border border-brand-border text-slate-400 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-brand-gradient px-8 py-2.5 rounded-xl text-white font-bold shadow-lg shadow-brand-accent/20 hover:scale-105 transition-all text-sm"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 bg-status-completed shadow-lg shadow-emerald-500/20 px-8 py-2.5 rounded-xl text-white font-bold hover:scale-105 transition-all text-sm"
              >
                <Save className="w-4 h-4" /> Finalize Order
              </button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateOrderForm;
