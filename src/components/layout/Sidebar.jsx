import React from 'react';
import { LayoutDashboard, ShoppingCart, Users, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Orders', icon: ShoppingCart, path: '/orders' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
   
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-brand-dark/50 backdrop-blur-xl border-r border-brand-border/30 flex flex-col z-50">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-accent/20">
            <ShoppingCart className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-primary font-['Outfit']">OMS Pro</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                  : 'text-brand-secondary hover:text-brand-primary hover:bg-brand-accent/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-90 text-brand-accent' : 'opacity-0 group-hover:opacity-100'}`} />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brand-border/30">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-brand-secondary hover:text-status-cancelled hover:bg-status-cancelled/5 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
