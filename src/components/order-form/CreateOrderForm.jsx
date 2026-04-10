import React, { useState } from 'react';
import Card from '../ui/Card';
import {
  User, Package, CreditCard, CheckCircle2, ChevronRight, ChevronLeft,
  Save, ShoppingBag, Phone, MapPin, Hash,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrdersContext';

/* ── Tiny success toast ───────────────────────────────── */
const SuccessToast = ({ data }) => (
  <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-start gap-4 bg-emerald-950/90 border border-emerald-500/40 rounded-2xl px-6 py-4 shadow-2xl shadow-emerald-900/40 backdrop-blur-xl min-w-[320px]">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      </div>
      <div>
        <p className="text-white font-bold text-sm">{data.message}</p>
        <p className="text-emerald-400 text-xs mt-0.5 font-mono">{data.id}</p>
        <p className="text-emerald-100/70 text-xs mt-1">Redirecting to Orders list…</p>
      </div>
    </div>
  </div>
);

/* ── Field wrapper ────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-brand-secondary uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

/* ── Styled input ─────────────────────────────────────── */
const inputCls =
  'w-full bg-brand-surface/50 border border-brand-border/60 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all text-brand-primary placeholder:text-brand-secondary/50 hover:border-brand-border';

/* ────────────────────────────────────────────────────── */
const CreateOrderForm = ({ existingOrder }) => {
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    customerName: existingOrder?.customer || '',
    email: existingOrder?.email || '',
    phone: existingOrder?.phone || '',
    address: existingOrder?.address || '',
    product: existingOrder?.product_key || existingOrder?.product || '', // Handle keys or labels
    quantity: existingOrder?.quantity || existingOrder?.items || '1',
    priority: existingOrder?.priority || 'medium',
    paymentMethod: existingOrder?.paymentMethod || 'credit_card',
    notes: existingOrder?.notes || '',
  });

  const navigate = useNavigate();
  const { addOrder, updateOrder } = useOrders();

  const set = (key) => (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingOrder) {
      updateOrder(existingOrder.id, {
        customer: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        product: formData.product,
        items: parseInt(formData.quantity, 10),
        priority: formData.priority,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      });
      setToast({ id: existingOrder.id, message: 'Order Updated!' });
    } else {
      const newOrder = addOrder(formData);
      setToast({ id: newOrder.id, message: 'Order Created!' });
    }
    
    setTimeout(() => {
      setToast(null);
      navigate('/orders');
    }, 2200);
  };

  const steps = [
    { title: 'Customer Info', icon: User },
    { title: 'Order Details', icon: Package },
    { title: 'Payment', icon: CreditCard },
  ];

  return (
    <>
      {toast && <SuccessToast data={toast} />}

      <div className="max-w-4xl mx-auto py-8">
        {/* ── Stepper ── */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
                    step >= i + 1
                      ? 'bg-brand-gradient text-white scale-110'
                      : 'bg-brand-surface border border-brand-border text-brand-secondary'
                  }`}
                >
                  <s.icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${
                    step >= i + 1 ? 'text-brand-accent' : 'text-brand-secondary'
                  }`}
                >
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 bg-brand-border/30 relative -top-4">
                  <div
                    className={`absolute inset-0 bg-brand-accent transition-all duration-500 ${
                      step > i + 1 ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <Card
          title={existingOrder ? `Edit Order ${existingOrder.id}` : steps[step - 1].title}
          subtitle={existingOrder ? 'Make changes to this order entry.' : `Complete step ${step} of 3 to create a new order`}
        >
          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            {/* ── Step 1: Customer Info ── */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
                <Field label="Full Name">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className={`${inputCls} pl-10`}
                      value={formData.customerName}
                      onChange={set('customerName')}
                      required
                    />
                  </div>
                </Field>

                <Field label="Email Address">
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={inputCls}
                    value={formData.email}
                    onChange={set('email')}
                    required
                  />
                </Field>

                <Field label="Phone Number">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className={`${inputCls} pl-10`}
                      value={formData.phone}
                      onChange={set('phone')}
                    />
                  </div>
                </Field>

                <Field label="City / Region">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
                    <input
                      type="text"
                      placeholder="e.g. New York"
                      className={`${inputCls} pl-10`}
                      value={formData.address}
                      onChange={set('address')}
                      required
                    />
                  </div>
                </Field>
              </div>
            )}

            {/* ── Step 2: Order Details ── */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
                <Field label="Select Product">
                  <select
                    className={inputCls}
                    value={formData.product}
                    onChange={set('product')}
                    required
                  >
                    <option value="" className="bg-brand-surface text-brand-primary">Choose a product…</option>
                    <option value="cloud_pro" className="bg-brand-surface text-brand-primary">Cloud Services Pro — $799</option>
                    <option value="enterprise_suite" className="bg-brand-surface text-brand-primary">Enterprise Suite — $2,499</option>
                    <option value="data_analytics" className="bg-brand-surface text-brand-primary">Data Analytics Plus — $1,199</option>
                  </select>
                </Field>

                <Field label="Quantity">
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
                    <input
                      type="number"
                      min="1"
                      max="99"
                      className={`${inputCls} pl-10`}
                      value={formData.quantity}
                      onChange={set('quantity')}
                    />
                  </div>
                </Field>

                <Field label="Priority">
                  <div className="flex gap-3">
                    {['low', 'medium', 'high'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, priority: p }))}
                        className={`flex-1 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                          formData.priority === p
                            ? 'bg-brand-accent/10 border-brand-accent text-brand-accent'
                            : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-slate-500'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Order Notes">
                  <textarea
                    rows="3"
                    placeholder="Any special instructions…"
                    className={inputCls}
                    value={formData.notes}
                    onChange={set('notes')}
                  />
                </Field>
              </div>
            )}

            {/* ── Step 3: Payment + Summary ── */}
            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'credit_card', name: 'Credit Card', desc: 'Secure online payment', icon: CreditCard },
                    { id: 'paypal', name: 'PayPal', desc: 'Fast and easy', icon: CheckCircle2 },
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id }))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-brand-accent bg-brand-accent/5 shadow-lg shadow-brand-accent/5'
                          : 'border-brand-border/40 hover:border-brand-border'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-xl ${
                            formData.paymentMethod === method.id
                              ? 'bg-brand-accent text-white'
                              : 'bg-brand-surface border border-brand-border/30 text-brand-secondary'
                          }`}
                        >
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${formData.paymentMethod === method.id ? 'text-white' : 'text-brand-primary'}`}>{method.name}</p>
                          <p className={`text-xs ${formData.paymentMethod === method.id ? 'text-white/70' : 'text-brand-secondary'}`}>{method.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary Card */}
                <div className="bg-brand-surface/30 p-6 rounded-2xl border border-brand-border/30">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary">Order Summary</h4>
                      <p className="text-xs text-brand-secondary italic">Review your details before submitting</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm divide-y divide-brand-border/20">
                    {[
                      { label: 'Customer', value: formData.customerName || '—' },
                      { label: 'Email', value: formData.email || '—' },
                      { label: 'Phone', value: formData.phone || '—' },
                      { label: 'Address', value: formData.address || '—' },
                      {
                        label: 'Product',
                        value:
                          formData.product
                            ? { cloud_pro: 'Cloud Services Pro', enterprise_suite: 'Enterprise Suite', data_analytics: 'Data Analytics Plus' }[formData.product] || formData.product
                            : '—',
                      },
                      { label: 'Quantity', value: formData.quantity },
                      {
                        label: 'Priority',
                        value: formData.priority,
                        accent: true,
                      },
                      { label: 'Payment', value: formData.paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal' },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between pt-3 first:pt-0">
                        <span className="text-brand-secondary">{row.label}</span>
                        <span
                          className={
                            row.accent
                              ? 'text-brand-accent font-bold uppercase text-xs tracking-wider'
                              : 'text-brand-primary font-medium'
                          }
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Navigation Buttons ── */}
            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  step === 1
                    ? 'opacity-0 pointer-events-none'
                    : 'bg-brand-surface border border-brand-border text-brand-secondary hover:text-brand-primary'
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
                  <Save className="w-4 h-4" /> {existingOrder ? 'Save Changes' : 'Finalize Order'}
                </button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateOrderForm;
