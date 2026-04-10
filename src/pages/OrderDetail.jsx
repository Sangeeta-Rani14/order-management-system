import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  CreditCard,
  CheckCircle2,
  FileText,
  AlertCircle,
  ShoppingBag,
  Edit2
} from 'lucide-react';
import { useOrders } from '../context/OrdersContext';

const OrderDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const { orders } = useOrders();

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const found = orders.find(o => o.id === id);
      setOrder(found);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id, orders]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-96 rounded-2xl" />
            </div>
            <Skeleton className="h-[600px] rounded-2xl" />
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!order) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-brand-primary">Order Not Found</h2>
          <p className="text-brand-secondary">The order with ID {id} could not be found.</p>
          <Link to="/orders">
            <button className="bg-brand-gradient px-6 py-2.5 rounded-xl text-white font-semibold">
              Back to Orders
            </button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const timeline = [
    { status: 'Order Placed', date: `${order.date}, 09:41 AM`, completed: true, icon: FileText },
    { status: 'Payment Verified', date: `${order.date}, 10:20 AM`, completed: true, icon: CreditCard },
    { status: 'In Processing', date: 'Processing...', completed: order.status !== 'pending', icon: Package },
    { status: 'Out for Delivery', date: 'Not Yet', completed: order.status === 'completed', icon: Truck },
    { status: 'Delivered', date: 'Not Yet', completed: order.status === 'completed', icon: CheckCircle2 },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/orders" className="p-2.5 rounded-xl bg-brand-surface border border-brand-border text-brand-secondary hover:text-brand-primary hover:bg-brand-surface transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold font-['Outfit']">{order.id}</h1>
                <Badge status={order.status}>{order.status}</Badge>
              </div>
              <p className="text-brand-secondary text-sm mt-1">Order created on {order.date} • Reference ID: #REF-{order.id.split('-')[1]}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/orders/edit/${order.id}`}>
              <button className="px-6 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-sm font-semibold hover:border-brand-accent transition-all flex items-center gap-2 text-brand-primary">
                <Edit2 className="w-4 h-4" /> Edit Order
              </button>
            </Link>
            <button className="px-6 py-2.5 bg-brand-gradient rounded-xl text-sm font-bold text-white shadow-lg shadow-brand-accent/20 hover:scale-105 transition-all">
              Track Shipment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <Card title="Order Summary" subtitle="Details of ordered items and pricing">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-brand-border/20 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-brand-surface border border-brand-border/40 flex items-center justify-center p-2">
                      <ShoppingBag className="w-8 h-8 text-brand-accent opacity-50" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-primary">{order.product || 'Premium Services Bundle'}</p>
                      <p className="text-xs text-brand-secondary mt-0.5 font-medium tracking-wide uppercase">Subscription • Professional</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs bg-brand-surface border border-brand-border px-2 py-0.5 rounded text-brand-primary">QTY: {order.items || 1}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-brand-primary">${(order.total / (order.items || 1)).toLocaleString()}</p>
                    <p className="text-xs text-brand-secondary font-medium">per unit</p>
                  </div>
                </div>
              </div>

              {/* Totals Section */}
              <div className="mt-8 p-6 rounded-2xl bg-brand-surface/30 border border-brand-border/30 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-secondary">Subtotal</span>
                  <span className="text-brand-primary font-semibold">${order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-secondary">Tax (0%)</span>
                  <span className="text-brand-primary font-semibold">$0.00</span>
                </div>
                <div className="pt-3 border-t border-brand-border/30 flex justify-between">
                  <span className="text-lg font-bold text-brand-primary uppercase tracking-tighter">Total Amount</span>
                  <span className="text-2xl font-black text-brand-accent">${order.total.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Tracking / Timeline */}
            <Card title="Timeline Updates" subtitle="Track the progress of this order">
              <div className="relative mt-4 ml-4">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-brand-border/50"></div>
                
                <div className="space-y-10 relative">
                  {timeline.map((step, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        step.completed ? 'bg-brand-accent border-brand-accent scale-110 shadow-lg shadow-brand-accent/30' : 'bg-brand-dark border-brand-border group-hover:border-slate-500'
                      }`}>
                        {step.completed ? (
                           <step.icon className="w-3 h-3 text-white" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-border"></div>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-bold tracking-tight ${step.completed ? 'text-brand-primary' : 'text-brand-secondary/50'}`}>{step.status}</p>
                        <p className="text-xs text-brand-secondary mt-1 flex items-center gap-1.5 tracking-wide uppercase font-semibold">
                          <Clock className="w-3 h-3" /> {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Info Panels */}
          <div className="space-y-8">
            {/* Customer Details */}
            <Card title="Customer Profile">
              <div className="flex flex-col items-center pb-6 border-b border-brand-border/20 text-center">
                <div className="w-20 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-brand-accent/10 mb-4">
                  {order.avatar}
                </div>
                <h4 className="text-xl font-bold">{order.customer}</h4>
                <p className="text-sm text-brand-secondary">{order.email}</p>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-brand-surface border border-brand-border/30 text-brand-secondary">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">Phone</p>
                    <p className="text-sm font-medium text-brand-primary">{order.phone || '+1 (555) 000-0000'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-brand-surface border border-brand-border/30 text-brand-secondary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">Address</p>
                    <p className="text-sm font-medium text-brand-primary">{order.address || 'Address not provided'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-brand-surface border border-brand-border/30 text-brand-secondary">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">Assigned Agent</p>
                    <p className="text-sm font-medium text-brand-primary">{order.assigned || 'Pending Assignment'}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Info */}
            <Card title="Order Notes" footer={
              <button className="text-xs font-bold text-brand-accent hover:underline w-full">Edit Notes</button>
            }>
              <div className="bg-brand-accent/5 border border-brand-accent/20 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div className="text-xs text-brand-primary leading-relaxed font-medium">
                  {order.notes || 'No special instructions provided for this order.'}
                </div>
              </div>
            </Card>

            {/* Progress Visualization */}
            <Card title="Completion Progress">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-secondary">
                  <span>Progress</span>
                  <span>{order.status === 'completed' ? '100' : order.status === 'progress' ? '65' : '15'}%</span>
                </div>
                <div className="w-full h-2.5 bg-brand-border/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-gradient transition-all duration-1000 ease-out" 
                    style={{ width: `${order.status === 'completed' ? '100' : order.status === 'progress' ? '65' : '15'}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-brand-secondary/50 italic font-medium">Estimated updates coming soon</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderDetail;
