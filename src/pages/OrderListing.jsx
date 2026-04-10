import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { Search, Filter, MoreVertical, Download, Plus, ArrowUpDown, ChevronLeft, ChevronRight, Mail, Sparkles, Edit2, Trash2 } from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { mockOrders } from '../data/mockOrders';
import { Link } from 'react-router-dom';

const OrderListing = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { orders, deleteOrder } = useOrders();

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete order ${id}?`)) {
      deleteOrder(id);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // IDs that are new (not in the original mock data)
  const mockIds = new Set(mockOrders.map((o) => o.id));
  const isNew = (id) => !mockIds.has(id);

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-['Outfit'] text-brand-primary">Order Management</h1>
            <p className="text-brand-secondary mt-1 text-sm md:text-base">Manage, Track, and Update your orders.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-brand-surface border border-brand-border rounded-xl text-xs font-medium hover:bg-brand-accent/5 transition-all text-brand-primary">
              <Download className="w-4 h-4" /> Export
            </button>
            <Link to="/orders/new" className="flex-1 sm:flex-none">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-gradient rounded-xl text-xs font-bold text-white shadow-lg shadow-brand-accent/20 hover:scale-105 transition-all">
                <Plus className="w-4 h-4" /> Create
              </button>
            </Link>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4">
          <div className="sm:col-span-2 lg:col-span-3 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary w-4 h-4 group-focus-within:text-brand-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-brand-primary placeholder:text-brand-secondary/50"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary w-4 h-4" />
            <select 
              className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-2 pl-12 pr-4 text-sm appearance-none focus:outline-none focus:border-brand-accent/50 transition-all text-brand-primary font-medium"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="lg:col-span-2"></div>
        </div>

        {/* Table/List View */}
        <Card noPadding className="border-brand-border/20 w-full overflow-hidden">
          <div className="w-full overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-white/5 text-brand-secondary uppercase text-[10px] font-bold tracking-widest border-b border-brand-border">
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-brand-primary transition-colors">
                      Order ID <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/20">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <Skeleton className="h-10 w-10" variant="circle" />
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-2 w-32" />
                        </div>
                      </td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-14" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-8 ml-auto rounded-lg" /></td>
                    </tr>
                  ))
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      className={`border-b border-brand-border last:border-0 hover:bg-brand-surface/30 transition-all group ${
                        isNew(order.id) ? 'bg-emerald-500/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-brand-accent group-hover:scale-105 transition-transform">
                        <div className="flex items-center gap-2">
                          <Link to={`/orders/${order.id}`} className="hover:underline">
                            {order.id}
                          </Link>
                          {isNew(order.id) && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                              <Sparkles className="w-2.5 h-2.5" /> New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center font-bold text-xs text-brand-primary group-hover:bg-brand-gradient group-hover:text-white transition-all shadow-md">
                            {order.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">{order.customer}</p>
                            <p className="text-[10px] text-brand-secondary flex items-center gap-1"><Mail className="w-3 h-3" /> {order.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-brand-primary">
                        ${order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={order.status}>{order.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          order.priority === 'high' ? 'text-rose-400 bg-rose-400/10' : 
                          order.priority === 'medium' ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 bg-slate-400/10'
                        }`}>
                          {order.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-brand-secondary/80 font-medium">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <Link to={`/orders/edit/${order.id}`}>
                            <button className="p-2 rounded-lg hover:bg-brand-accent/10 transition-all text-brand-secondary hover:text-brand-accent" title="Edit Order">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDelete(order.id)}
                            className="p-2 rounded-lg hover:bg-rose-500/10 transition-all text-brand-secondary hover:text-rose-500" title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-brand-surface transition-all text-brand-secondary hover:text-white lg:block hidden">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-brand-secondary">
                      <div className="flex flex-col items-center gap-3">
                        <Search className="w-12 h-12 opacity-20 mb-2" />
                        <p className="text-lg font-semibold text-brand-primary">No orders found</p>
                        <p className="text-sm">Try adjusting your filters or search terms.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-brand-border flex items-center justify-between flex-wrap gap-4">
            <span className="text-xs text-brand-secondary font-medium">
              Showing <span className="text-brand-primary font-bold">{filteredOrders.length}</span> of <span className="text-brand-primary font-bold">{orders.length}</span> orders
            </span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl border border-brand-border text-brand-secondary hover:text-brand-primary hover:bg-brand-surface disabled:opacity-30 disabled:hover:bg-transparent" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl border border-brand-border text-brand-secondary hover:text-brand-primary hover:bg-brand-surface">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default OrderListing;
