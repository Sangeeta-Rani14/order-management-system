import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { Search, Filter, MoreVertical, Download, Plus, ArrowUpDown, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { mockOrders } from '../data/mockOrders';
import { Link } from 'react-router-dom';

const OrderListing = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-['Outfit'] text-brand-primary">Order Management</h1>
            <p className="text-brand-secondary mt-1">Manage, Track, and Update your customer orders.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-sm font-medium hover:bg-brand-accent/5 transition-all text-brand-primary">
              <Download className="w-4 h-4" /> Export
            </button>
            <Link to="/orders/new">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-gradient rounded-xl text-sm font-bold text-white shadow-lg shadow-brand-accent/20 hover:scale-105 transition-all">
                <Plus className="w-4 h-4" /> Create Order
              </button>
            </Link>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-brand-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search by ID or customer name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all text-brand-primary placeholder:text-brand-secondary/50"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <select 
              className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-2.5 pl-12 pr-4 text-sm appearance-none focus:outline-none focus:border-brand-accent/50 transition-all text-brand-primary font-medium"
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
        <Card noPadding className="border-brand-border/20">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-brand-border/30">
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
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
                    <tr key={order.id} className="hover:bg-brand-accent/5 transition-colors group">
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-brand-accent group-hover:scale-105 transition-transform">
                        <Link to={`/orders/${order.id}`} className="hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center font-bold text-xs text-white group-hover:bg-brand-gradient transition-all shadow-md">
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
                      <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-lg hover:bg-brand-surface transition-all text-slate-500 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-3">
                        <Search className="w-12 h-12 text-slate-700 mb-2" />
                        <p className="text-lg font-semibold text-slate-300">No orders found</p>
                        <p className="text-sm">Try adjusting your filters or search terms.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-brand-border/30 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-300 font-bold">{filteredOrders.length}</span> of <span className="text-slate-300 font-bold">{mockOrders.length}</span> orders
            </span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl border border-brand-border/30 text-slate-500 hover:text-white hover:bg-brand-surface disabled:opacity-30 disabled:hover:bg-transparent" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl border border-brand-border/30 text-slate-500 hover:text-white hover:bg-brand-surface">
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
