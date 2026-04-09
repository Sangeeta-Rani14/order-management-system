import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import NotificationPanel from '../notifications/NotificationPanel';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-64 h-20 bg-brand-dark/30 backdrop-blur-md border-b border-brand-border/30 z-40 flex items-center justify-between px-8">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary w-5 h-5 group-focus-within:text-brand-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search for orders, customers, or analytics..." 
            className="w-full bg-brand-surface/50 border border-brand-border/30 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 hover:bg-brand-surface/70 transition-all placeholder:text-brand-secondary/50 text-brand-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-brand-accent/10 text-brand-secondary hover:text-brand-accent transition-all border border-transparent hover:border-brand-accent/30"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl hover:bg-brand-accent/10 transition-all border border-transparent hover:border-brand-accent/30 ${showNotifications ? 'text-brand-accent bg-brand-accent/5 border-brand-accent/30' : 'text-brand-secondary hover:text-brand-accent'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-brand-dark"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 z-50">
              <NotificationPanel />
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-brand-border/30 mx-2"></div>

        <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-brand-border/30">
          <div className="w-9 h-9 rounded-lg bg-brand-gradient flex items-center justify-center font-bold text-white shadow-lg shadow-brand-accent/10">
            JD
          </div>
          <div className="text-left pr-2">
            <p className="text-xs font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">John Doe</p>
            <p className="text-[10px] text-brand-secondary font-medium tracking-wider uppercase">Senior Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
