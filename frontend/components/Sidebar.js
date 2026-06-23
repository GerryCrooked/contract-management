import React from 'react';
import { Home, FileText, Settings, Users, LogOut, BarChart2, Briefcase, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#0f172a] text-slate-300 flex flex-col fixed left-0 top-0 shadow-xl z-20">
      <div className="p-6 text-xl font-bold border-b border-slate-800/60 flex items-center space-x-3 tracking-wide">
        <div className="bg-indigo-500 p-1.5 rounded-lg">
          <Briefcase className="text-white" size={22} />
        </div>
        <span className="text-white font-semibold tracking-tight">ExecutiveView</span>
      </div>
      <div className="px-4 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Analytics & Operations
      </div>
      <nav className="flex-1 px-3 space-y-1">
        <a href="#" className="group flex items-center justify-between p-3 bg-indigo-500/10 rounded-xl text-indigo-400 font-medium transition-all">
          <div className="flex items-center space-x-3">
            <Home size={20} className="text-indigo-400" />
            <span>Overview</span>
          </div>
          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <a href="#" className="group flex items-center justify-between p-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl font-medium transition-all">
          <div className="flex items-center space-x-3">
            <BarChart2 size={20} />
            <span>Financials</span>
          </div>
        </a>
        <a href="#" className="group flex items-center justify-between p-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl font-medium transition-all">
          <div className="flex items-center space-x-3">
            <FileText size={20} />
            <span>Contracts</span>
          </div>
        </a>
        <a href="#" className="group flex items-center justify-between p-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl font-medium transition-all">
          <div className="flex items-center space-x-3">
            <Users size={20} />
            <span>Organization</span>
          </div>
        </a>
      </nav>

      <div className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        System
      </div>
      <nav className="px-3 pb-4 space-y-1">
        <a href="#" className="flex items-center space-x-3 p-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl font-medium transition-all">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>

      <div className="p-4 border-t border-slate-800/60 mt-auto">
        <div className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
           <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
             CEO
           </div>
           <div className="flex-1">
             <p className="text-sm font-medium text-white">Alice Walker</p>
             <p className="text-xs text-slate-500">Chief Executive</p>
           </div>
           <button className="text-slate-400 hover:text-red-400 transition-colors">
             <LogOut size={18} />
           </button>
        </div>
      </div>
    </div>
  );
}
