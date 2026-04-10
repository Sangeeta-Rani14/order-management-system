import React from 'react';
import { Bell, Package, CheckCircle2, Info, Clock } from 'lucide-react';

const NotificationPanel = () => {
  const notifications = [
    { id: 1, type: 'order', title: 'New Order Received', message: 'Order #ORD-7281 has been placed by James Wilson.', time: '2 mins ago', icon: Package, color: 'text-indigo-400' },
    { id: 2, type: 'status', title: 'Payment Verified', message: 'Payment for #ORD-9120 has been cleared.', time: '15 mins ago', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 3, type: 'system', title: 'Status Update', message: 'Order #ORD-4432 is now out for delivery.', time: '1 hour ago', icon: Info, color: 'text-blue-400' },
    { id: 4, type: 'order', title: 'Order Cancelled', message: 'Order #ORD-5501 was cancelled by the customer.', time: '3 hours ago', icon: Clock, color: 'text-rose-400' },
  ];

  return (
    <div className="w-80 bg-brand-surface border border-brand-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      <div className="px-5 py-4 border-b border-brand-border/30 flex items-center justify-between bg-brand-surface/50">
        <h4 className="font-bold text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-accent" /> Notifications
        </h4>
        <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full font-bold">4 NEW</span>
      </div>

      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 border-b border-brand-border/10 hover:bg-white/5 transition-all cursor-pointer group">
            <div className="flex gap-4">
              <div className={`p-2 rounded-xl bg-white/5 ${n.color} group-hover:scale-110 transition-transform`}>
                <n.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white mb-0.5">{n.title}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-2">{n.message}</p>
                <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-brand-surface/20 border-t border-brand-border/30 text-center">
        <button className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors">Mark all as read</button>
      </div>
    </div>
  );
};

export default NotificationPanel;
