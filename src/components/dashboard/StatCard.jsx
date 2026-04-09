import React from 'react';
import Card from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => {
  return (
    <Card className="hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white font-['Outfit']">{value}</p>
          
          <div className="mt-4 flex items-center gap-2">
            <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend === 'up' ? 'bg-status-completed/10 text-status-completed' : 'bg-status-cancelled/10 text-status-cancelled'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {trendValue}%
            </span>
            <span className="text-xs text-slate-500 font-medium">vs last month</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg shadow-indigo-500/10`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
