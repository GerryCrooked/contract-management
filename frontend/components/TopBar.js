import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8">
      <div className="flex items-center">
        <button className="lg:hidden mr-4 text-slate-500 hover:text-slate-700">
          <Menu size={24} />
        </button>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search contracts, partners, or analytics..."
            className="pl-10 pr-4 py-2 w-96 bg-slate-100/50 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-sm font-medium text-slate-500 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>System Status: Optimal</span>
        </div>
        <div className="h-6 w-px bg-slate-200"></div>
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </div>
  );
}
