import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import { Clock, ShoppingBag, User, Settings, CheckCircle2, AlertCircle } from 'lucide-react';

const ActivityPanel = () => {
  const activities = [
    { id: 1, type: 'order', user: 'System', text: 'Order #ORD-7281 status changed to Pending', time: '10:45 AM', date: 'Today', icon: ShoppingBag, color: 'text-amber-400' },
    { id: 2, type: 'user', user: 'Admin (John)', text: 'New customer profile created for Marcus Chen', time: '09:12 AM', date: 'Today', icon: User, color: 'text-brand-accent' },
    { id: 3, type: 'system', user: 'System', text: 'Weekly analytics report generated', time: '04:00 AM', date: 'Today', icon: Settings, color: 'text-slate-400' },
    { id: 4, type: 'success', user: 'Harvy S.', text: 'Marked #ORD-4432 as completed', time: '05:30 PM', date: 'Yesterday', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 5, type: 'alert', user: 'Mike R.', text: 'Flagged #ORD-5501 for security review', time: '02:15 PM', date: 'Yesterday', icon: AlertCircle, color: 'text-rose-400' },
  ];

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold font-['Outfit'] text-white">Activity Feed</h1>
        <p className="text-slate-400">Keep track of every action taken across the system.</p>

        <Card noPadding>
          <div className="divide-y divide-brand-border/20">
            {activities.map((activity, i) => (
              <div key={activity.id} className="p-6 hover:bg-white/5 transition-all">
                <div className="flex gap-6">
                  <div className={`p-3 rounded-2xl bg-white/5 ${activity.color} h-fit shrink-0 border border-current opacity-20`}>
                    <activity.icon className="w-5 h-5 opacity-100" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <p className="font-bold text-white tracking-tight">{activity.text}</p>
                      <span className="text-[10px] bg-brand-surface border border-brand-border px-2 py-0.5 rounded text-slate-500 font-bold uppercase tracking-widest">{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <User className="w-3 h-3 text-brand-accent" /> {activity.user}
                      </div>
                      <div className="h-1 w-1 rounded-full bg-slate-700"></div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3 h-3" /> {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default ActivityPanel;
