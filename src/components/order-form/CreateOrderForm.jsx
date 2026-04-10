import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import {
  User, Package, CreditCard, CheckCircle2, ChevronRight, ChevronLeft,
  Save, ShoppingBag, Phone, MapPin, Hash, Calendar, AlertCircle, Info,
  Mail, Settings, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrdersContext';

/* ── Success Toast ────────────────────────────────────── */
const SuccessToast = ({ data }) => (
  <div className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:right-8 sm:left-auto z-[100] animate-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-start gap-4 bg-emerald-950/95 border border-emerald-500/40 rounded-2xl px-5 py-4 shadow-2xl shadow-emerald-900/40 backdrop-blur-xl">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      </div>
      <div>
        <p className="text-white font-bold text-sm tracking-tight">{data.message}</p>
        <p className="text-emerald-400 text-[10px] font-mono mt-0.5">{data.id}</p>
        <p className="text-emerald-100/60 text-[10px] mt-1">Redirecting to project ledger…</p>
      </div>
    </div>
  </div>
);

/* ── Field Wrapper ────────────────────────────────────── */
const Field = ({ label, error, required, children, helper }) => (
  <div className="space-y-1.5 w-full">
    <div className="flex items-center justify-between">
      <label className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.1em] flex items-center gap-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {error && (
        <span className="text-[10px] font-bold text-rose-500 animate-in fade-in slide-in-from-right-1">
          {error}
        </span>
      )}
    </div>
    {children}
    {helper && !error && (
      <p className="text-[10px] text-brand-secondary/60 italic px-1">{helper}</p>
    )}
  </div>
);

/* ── Styled Input Base ────────────────────────────────── */
const inputBaseCls = (hasError) => 
  `w-full bg-brand-surface border rounded-xl py-3 px-4 focus:outline-none transition-all text-sm sm:text-base ${
    hasError 
      ? 'border-rose-500/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 text-rose-500 placeholder:text-rose-300' 
      : 'border-brand-border focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/5 text-brand-primary placeholder:text-brand-secondary/40'
  }`;

/* ────────────────────────────────────────────────────── */
const CreateOrderForm = ({ existingOrder }) => {
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { addOrder, updateOrder } = useOrders();

  const [formData, setFormData] = useState({
    customerName: existingOrder?.customer || '',
    email: existingOrder?.email || '',
    phone: existingOrder?.phone || '',
    address: existingOrder?.address || '',
    product: existingOrder?.product_key || existingOrder?.product || '', 
    quantity: existingOrder?.quantity || existingOrder?.items || '1',
    priority: existingOrder?.priority || 'medium',
    status: existingOrder?.status || 'pending',
    date: existingOrder?.date || new Date().toISOString().split('T')[0],
    paymentMethod: existingOrder?.paymentMethod || 'credit_card',
    notes: existingOrder?.notes || '',
  });

  const set = (key) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear error for this field
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const validateStep = (currentStep) => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.address.trim()) newErrors.address = 'City is required';
    } else if (currentStep === 2) {
      if (!formData.product) newErrors.product = 'Select a product';
      if (formData.quantity < 1) newErrors.quantity = 'Min quantity is 1';
      if (!formData.date) newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };
  
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    if (existingOrder) {
      updateOrder(existingOrder.id, {
        customer: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        product: formData.product,
        items: parseInt(formData.quantity, 10),
        priority: formData.priority,
        status: formData.status,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      });
      setToast({ id: existingOrder.id, message: 'Registry Synchronized!' });
    } else {
      const newOrder = addOrder(formData);
      setToast({ id: newOrder.id, message: 'Order Confirmed!' });
    }
    
    setTimeout(() => {
      setToast(null);
      navigate('/orders');
    }, 2200);
  };

  const steps = [
    { title: 'Customer Profile', icon: User, desc: 'Client identity and contact' },
    { title: 'Project Specs', icon: Settings, desc: 'Requirement configuration' },
    { title: 'Review & Pay', icon: CreditCard, desc: 'Finalizing transaction' },
  ];

  return (
    <>
      {toast && <SuccessToast data={toast} />}

      <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-0">
        {/* ── Visual Stepper ── */}
        <div className="grid grid-cols-3 gap-4 mb-10 sm:mb-14">
          {steps.map((s, i) => {
            const isCompleted = step > i + 1;
            const isActive = step === i + 1;
            return (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="relative w-full flex items-center justify-center mb-4">
                  {/* Connector Line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[50%] right-[-50%] top-1/2 -translate-y-1/2 h-0.5 bg-brand-border/30">
                      <div className={`h-full bg-brand-gradient transition-all duration-700 ${isCompleted ? 'w-full' : 'w-0'}`} />
                    </div>
                  )}
                  
                  <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isActive ? 'bg-brand-gradient text-white scale-110 shadow-xl shadow-brand-accent/30 ring-4 ring-brand-accent/5' : 
                    isCompleted ? 'bg-brand-accent text-white' : 'bg-brand-surface border-2 border-brand-border text-brand-secondary/40'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-brand-accent' : 'text-brand-secondary/60'}`}>{s.title}</p>
                  <p className="text-[9px] text-brand-secondary/40 mt-1">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Card className="shadow-2xl shadow-brand-accent/5 overflow-visible">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ── Header ── */}
            <div className="pb-6 border-b border-brand-border/30">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-primary flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent">
                  {React.createElement(steps[step-1].icon, { className: 'w-5 h-5' })}
                </div>
                {existingOrder ? 'Update Instance' : steps[step - 1].title}
              </h2>
              <p className="text-sm text-brand-secondary mt-1">{existingOrder ? `Modifying order record ${existingOrder.id}` : steps[step-1].desc}</p>
            </div>

            {/* ── STEP 1: CUSTOMER INFO ── */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <Field label="Client Full Name" required error={errors.customerName} helper="Enter legal or company name">
                  <div className="relative group">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.customerName ? 'text-rose-400' : 'text-brand-secondary group-focus-within:text-brand-accent'}`} />
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      className={`${inputBaseCls(errors.customerName)} pl-12`}
                      value={formData.customerName}
                      onChange={set('customerName')}
                    />
                  </div>
                </Field>

                <Field label="Business Email" required error={errors.email}>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.email ? 'text-rose-400' : 'text-brand-secondary group-focus-within:text-brand-accent'}`} />
                    <input
                      type="email"
                      placeholder="alex@company.com"
                      className={`${inputBaseCls(errors.email)} pl-12`}
                      value={formData.email}
                      onChange={set('email')}
                    />
                  </div>
                </Field>

                <Field label="Phone Contact" helper="Optional mobile or office line">
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary group-focus-within:text-brand-accent transition-colors" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className={`${inputBaseCls(false)} pl-12`}
                      value={formData.phone}
                      onChange={set('phone')}
                    />
                  </div>
                </Field>

                <Field label="Primary City" required error={errors.address} helper="Regional logistics anchor">
                  <div className="relative group">
                    <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.address ? 'text-rose-400' : 'text-brand-secondary group-focus-within:text-brand-accent'}`} />
                    <input
                      type="text"
                      placeholder="e.g. Neo Tokyo"
                      className={`${inputBaseCls(errors.address)} pl-12`}
                      value={formData.address}
                      onChange={set('address')}
                    />
                  </div>
                </Field>
              </div>
            )}

            {/* ── STEP 2: PROJECT SPECS ── */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <Field label="Product Tier" required error={errors.product}>
                  <div className="relative group">
                    <ShoppingBag className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.product ? 'text-rose-400' : 'text-brand-secondary group-focus-within:text-brand-accent'}`} />
                    <select
                      className={`${inputBaseCls(errors.product)} pl-12 appearance-none`}
                      value={formData.product}
                      onChange={set('product')}
                    >
                      <option value="" disabled>Select Specification...</option>
                      <option value="cloud_pro">Cloud Core Professional</option>
                      <option value="enterprise_suite">Elite Enterprise Suite</option>
                      <option value="data_analytics">Neural Data Analytics</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary pointer-events-none group-focus-within:rotate-180 transition-transform" />
                  </div>
                </Field>

                <Field label="Project Date" required error={errors.date} helper="Execution or delivery threshold">
                  <div className="relative group">
                    <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.date ? 'text-rose-400' : 'text-brand-secondary group-focus-within:text-brand-accent'}`} />
                    <input
                      type="date"
                      className={`${inputBaseCls(errors.date)} pl-12`}
                      value={formData.date}
                      onChange={set('date')}
                    />
                  </div>
                </Field>

                <Field label="Quantity Units" required error={errors.quantity}>
                  <div className="relative group">
                    <Hash className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.quantity ? 'text-rose-400' : 'text-brand-secondary group-focus-within:text-brand-accent'}`} />
                    <input
                      type="number"
                      min="1"
                      className={`${inputBaseCls(errors.quantity)} pl-12`}
                      value={formData.quantity}
                      onChange={set('quantity')}
                    />
                  </div>
                </Field>

                <Field label="Current Status" helper="Initial phase classification">
                  <div className="grid grid-cols-2 gap-2">
                    {['pending', 'progress'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, status: s }))}
                        className={`py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                          formData.status === s 
                            ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-sm' 
                            : 'bg-brand-surface border-brand-border text-brand-secondary/50 hover:border-brand-accent/20'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="md:col-span-2">
                  <Field label="Priority Protocol">
                    <div className="flex flex-wrap gap-2">
                      {['low', 'medium', 'high'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, priority: p }))}
                          className={`flex-1 min-w-[100px] py-3 rounded-xl border-2 text-xs font-bold uppercase tracking-widest transition-all ${
                            formData.priority === p 
                              ? 'bg-brand-accent border-brand-accent text-white shadow-lg shadow-brand-accent/20' 
                              : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-secondary/40'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field label="Internal Annotation" helper="Confidential project details">
                    <textarea
                      rows="3"
                      placeholder="Add specific execution requirements here..."
                      className={inputBaseCls(false)}
                      value={formData.notes}
                      onChange={set('notes')}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* ── STEP 3: REVIEW & PAY ── */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Method Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'credit_card', name: 'Secure Card', desc: 'Encrypted Gateway', icon: CreditCard },
                    { id: 'paypal', name: 'Digital Wallet', desc: 'Instant Verification', icon: Info },
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id }))}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                        formData.paymentMethod === method.id 
                          ? 'border-brand-accent bg-brand-accent/5 ring-4 ring-brand-accent/5' 
                          : 'border-brand-border/40 hover:border-brand-border'
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${formData.paymentMethod === method.id ? 'bg-brand-accent text-white' : 'bg-brand-surface border border-brand-border/30 text-brand-secondary'}`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className={`font-black text-sm uppercase tracking-tight ${formData.paymentMethod === method.id ? 'text-brand-accent' : 'text-brand-primary'}`}>{method.name}</p>
                        <p className="text-[10px] text-brand-secondary font-medium">{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ledger Summary */}
                <div className="bg-brand-surface border border-brand-border p-6 sm:p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-32 h-32 text-brand-accent" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-white">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-xs sm:text-sm text-brand-primary uppercase tracking-[0.2em]">Deployment Ledger</h4>
                        <p className="text-[10px] text-brand-secondary font-medium">System verification of order integrity</p>
                      </div>
                    </div>

                    <div className="space-y-4 max-w-sm">
                      {[
                        { label: 'Client Entity', value: formData.customerName },
                        { label: 'Asset Tier', value: formData.product || 'Not set' },
                        { label: 'Quantity', value: formData.quantity },
                        { label: 'Schedule', value: formData.date },
                        { label: 'Priority', value: formData.priority, accent: true },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between items-center text-xs">
                          <span className="text-brand-secondary font-bold uppercase tracking-widest text-[9px]">{row.label}</span>
                          <span className={`${row.accent ? 'text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full font-black' : 'text-brand-primary font-bold'}`}>
                            {row.value || 'N/A'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-brand-border flex justify-between items-end">
                      <div>
                        <p className="text-[9px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-1">Total Resource Value</p>
                        <p className="text-3xl font-black text-brand-primary tracking-tighter">$ {(parseInt(formData.quantity || 0) * 899).toLocaleString()}</p>
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                        Zero Tax
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── FOOTER ACTIONS ── */}
            <div className="pt-8 border-t border-brand-border/30 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  step === 1 
                    ? 'opacity-0 pointer-events-none' 
                    : 'bg-brand-surface border border-brand-border text-brand-secondary hover:text-brand-primary hover:border-brand-secondary/40'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous Phase
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-gradient px-10 py-3 rounded-xl text-white font-black shadow-xl shadow-brand-accent/20 hover:scale-[1.03] active:scale-95 transition-all text-xs sm:text-sm uppercase tracking-widest"
                >
                  Confirm Policy <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-accent px-12 py-3 rounded-xl text-white font-black shadow-xl shadow-brand-accent/30 hover:scale-[1.03] active:scale-95 transition-all text-xs sm:text-sm uppercase tracking-widest"
                >
                  <Save className="w-4 h-4" /> {existingOrder ? 'Sync Updates' : 'Execute Order'}
                </button>
              )}
            </div>
          </form>
        </Card>

        {/* ── Context Help ── */}
        <div className="mt-8 flex items-center justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2 text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
             <AlertCircle className="w-3 h-3" /> Encrypted Session
           </div>
           <div className="flex items-center gap-2 text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
             <Info className="w-3 h-3" /> Auto-Save Active
           </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrderForm;
