import React from 'react';
import { Bell, Package, CheckCircle2, Info, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationPanel = () => {
  const notifications = [
    { id: 1, type: 'order', title: 'New Order Received', message: 'Order #ORD-7281 has been placed by James Wilson.', time: '2 mins ago', icon: Package, color: 'text-indigo-500', unread: true },
    { id: 2, type: 'alert', title: 'Security Alert', message: 'Unauthorized login attempt blocked from Singapore.', time: '15 mins ago', icon: ShieldAlert, color: 'text-rose-500', unread: true },
    { id: 3, type: 'status', title: 'Payment Verified', message: 'Payment for #ORD-9120 has been cleared successfully.', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-500', unread: false },
  ];

  return (
    <div className="w-80 sm:w-96 bg-brand-surface border border-brand-border rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 ring-4 ring-brand-accent/5">
      <div className="px-6 py-5 border-b border-brand-border/30 flex items-center justify-between bg-brand-surface/50">
        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-brand-primary flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-accent" /> Intelligence
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-[9px] bg-brand-accent text-white px-2 py-0.5 rounded-full font-black animate-pulse">2 NEW</span>
        </div>
      </div>

      <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
        {notifications.map((n) => (
          <div key={n.id} className={`p-5 border-b border-brand-border/10 transition-all cursor-pointer group relative ${n.unread ? 'bg-brand-accent/[0.03]' : 'hover:bg-brand-surface/50'}`}>
            {n.unread && (
              <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-brand-accent rounded-full" />
            )}
            <div className="flex gap-4">
              <div className={`p-3 rounded-xl bg-brand-surface border border-brand-border/30 ${n.color} group-hover:scale-110 transition-transform shadow-sm`}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className={`text-xs font-black uppercase tracking-tight ${n.unread ? 'text-brand-primary' : 'text-brand-secondary'}`}>{n.title}</p>
                <p className={`text-[11px] leading-relaxed line-clamp-2 ${n.unread ? 'text-brand-primary font-medium' : 'text-brand-secondary/70'}`}>{n.message}</p>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[10px] text-brand-secondary/40 font-bold uppercase">{n.time}</p>
                  <p className="text-[10px] text-brand-accent font-black opacity-0 group-hover:opacity-100 transition-opacity">VIEW</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/notifications" className="block p-4 bg-brand-surface border-t border-brand-border/30 text-center group">
        <button className="text-[11px] font-black text-brand-secondary uppercase tracking-widest group-hover:text-brand-accent transition-colors flex items-center justify-center gap-2 w-full">
          Enter Control Center <ArrowRight className="w-4 h-4" />
        </button>
      </Link>
    </div>
  );
};

export default NotificationPanel;
