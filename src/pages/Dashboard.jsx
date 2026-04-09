import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import StatCard from '../components/dashboard/StatCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { ShoppingBag, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockOrders, orderStats } from '../data/mockOrders';
import { Link } from 'react-router-dom';

const chartData = [
  { name: 'Mon', orders: 12 },
  { name: 'Tue', orders: 19 },
  { name: 'Wed', orders: 15 },
  { name: 'Thu', orders: 22 },
  { name: 'Fri', orders: 30 },
  { name: 'Sat', orders: 25 },
  { name: 'Sun', orders: 28 },
];

const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-['Outfit'] text-brand-primary">Dashboard Overview</h1>
            <p className="text-brand-secondary mt-1">Welcome back, John. Here's what's happening with your orders today.</p>
          </div>
          <Link to="/orders/new">
            <button className="bg-brand-gradient px-6 py-2.5 rounded-xl text-white font-semibold shadow-lg shadow-brand-accent/20 hover:scale-105 transition-all text-sm">
              + Create New Order
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Orders" 
            value={orderStats.total} 
            icon={ShoppingBag} 
            trend="up" 
            trendValue="12.5"
            color="from-indigo-500 to-purple-600"
          />
          <StatCard 
            title="Pending Approval" 
            value={orderStats.pending} 
            icon={Clock} 
            trend="up" 
            trendValue="3.2"
            color="from-amber-400 to-orange-600"
          />
          <StatCard 
            title="Completed" 
            value={orderStats.completed} 
            icon={CheckCircle2} 
            trend="up" 
            trendValue="8.4"
            color="from-emerald-400 to-teal-600"
          />
          <StatCard 
            title="Cancelled" 
            value={orderStats.cancelled} 
            icon={XCircle} 
            trend="down" 
            trendValue="1.5"
            color="from-rose-500 to-pink-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <Card className="lg:col-span-2" title="Order Volume Trend" subtitle="Visualize your weekly order performance">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155', 
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorOrders)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recent Orders List */}
          <Card title="Recent Activity" subtitle="Latest status updates" footer={
            <Link to="/orders" className="text-brand-accent text-sm font-semibold flex items-center justify-center gap-2 hover:gap-3 transition-all">
              View All Orders <ArrowRight className="w-4 h-4" />
            </Link>
          }>
            <div className="space-y-6">
              {mockOrders.slice(0, 4).map((order) => (
                <div key={order.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center font-bold text-xs text-white group-hover:border-brand-accent/50 transition-colors">
                      {order.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-primary">{order.customer}</p>
                      <p className="text-xs text-brand-secondary">{order.id} • ${order.total}</p>
                    </div>
                  </div>
                  <Badge status={order.status}>{order.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
