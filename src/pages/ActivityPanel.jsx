import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import { 
  Clock, ShoppingBag, User, Settings, CheckCircle2, 
  AlertCircle, Bell, Filter, Check, Trash2, ShieldAlert,
  ArrowRight, Search
} from 'lucide-react';

const ActivityPanel = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', user: 'System', title: 'Status Escalated', text: 'Order #ORD-7281 changed to Pending Approval', time: '10:45 AM', date: 'Today', icon: ShoppingBag, color: 'text-amber-500', unread: true },
    { id: 2, type: 'alert', user: 'Security Bot', title: 'Unauthorized Login', text: 'Suspicious login attempt detected from IP: 192.168.1.1', time: '09:12 AM', date: 'Today', icon: ShieldAlert, color: 'text-rose-500', unread: true },
    { id: 3, type: 'user', user: 'Admin (John)', title: 'New Onboarding', text: 'Marcus Chen added to the Client Registry', time: '09:00 AM', date: 'Today', icon: User, color: 'text-brand-accent', unread: false },
    { id: 4, type: 'system', user: 'System', title: 'Report Generated', text: 'Monthly fiscal projection for Q3 is ready', time: '04:00 AM', date: 'Today', icon: Settings, color: 'text-brand-secondary', unread: false },
    { id: 5, type: 'order', user: 'Logistics', title: 'Delivery Confirmed', text: 'Order #ORD-4432 successfully reached customer', time: '05:30 PM', date: 'Yesterday', icon: CheckCircle2, color: 'text-emerald-500', unread: false },
    { id: 6, type: 'alert', user: 'System', title: 'Stock Critical', text: 'Cloud Instance regional capacity at 95%', time: '02:15 PM', date: 'Yesterday', icon: AlertCircle, color: 'text-rose-500', unread: false },
  ]);

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);
  
  const grouped = filtered.reduce((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                <Bell className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-black font-['Outfit'] text-brand-primary tracking-tight">Notification Center</h1>
            </div>
            <p className="text-brand-secondary text-sm font-medium">Synchronize with system activities and real-time alerts.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs font-bold text-brand-primary hover:border-brand-accent transition-all uppercase tracking-widest"
            >
              <Check className="w-4 h-4" /> Mark all read
            </button>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex items-center gap-2 p-1 bg-brand-surface border border-brand-border rounded-2xl w-fit">
          {['all', 'order', 'alert', 'system'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === t 
                  ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' 
                  : 'text-brand-secondary hover:text-brand-primary hover:bg-brand-accent/5'
              }`}
            >
              {t} {t === 'all' && `(${notifications.length})`}
            </button>
          ))}
        </div>

        {/* ── ACTIVITY FEED ── */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-[11px] font-black text-brand-secondary/40 uppercase tracking-[0.2em] whitespace-nowrap">{date}</h3>
                <div className="h-px w-full bg-brand-border/30" />
              </div>

              <div className="space-y-3">
                {items.map((n) => (
                  <div 
                    key={n.id} 
                    onClick={() => toggleRead(n.id)}
                    className={`group relative p-5 sm:p-6 rounded-[2rem] border transition-all cursor-pointer overflow-hidden ${
                      n.unread 
                        ? 'bg-brand-accent/[0.03] border-brand-accent/20 ring-4 ring-brand-accent/[0.02]' 
                        : 'bg-brand-surface/40 border-brand-border hover:border-brand-secondary/40'
                    }`}
                  >
                    {/* Unread Indicator Dot */}
                    {n.unread && (
                      <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
                    )}

                    <div className="flex gap-6">
                      <div className={`p-4 rounded-2xl bg-brand-surface border border-brand-border/40 shadow-sm transition-transform group-hover:scale-110 ${n.color}`}>
                        <n.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-black text-sm uppercase tracking-tight ${n.unread ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                            {n.title}
                          </h4>
                          <span className="text-[10px] font-bold text-brand-secondary/40 font-mono">{n.time}</span>
                        </div>
                        
                        <p className={`text-sm leading-relaxed max-w-2xl ${n.unread ? 'text-brand-primary font-medium' : 'text-brand-secondary'}`}>
                          {n.text}
                        </p>

                        <div className="flex items-center gap-6 pt-3">
                           <div className="flex items-center gap-1.5 opacity-60">
                             <User className="w-3 h-3 text-brand-accent" />
                             <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary">{n.user}</span>
                           </div>
                           <div className="h-1 w-1 rounded-full bg-brand-border" />
                           <div className="flex items-center gap-1 text-[10px] font-bold text-brand-accent group-hover:gap-2 transition-all">
                             Context Details <ArrowRight className="w-3 h-3" />
                           </div>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <div className="hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                           className="p-3 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
            <div className="py-20 text-center space-y-4 opacity-40">
               <div className="flex justify-center">
                 <Search className="w-16 h-16" />
               </div>
               <p className="font-black text-xs uppercase tracking-widest">No matching activities found</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ActivityPanel;
