import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, isPositive }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Icon size={22} strokeWidth={2.5} />
        </div>
      </div>

      {trend && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-slate-100">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-bold ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{trendValue}</span>
          </div>
          <span className="text-sm text-slate-400">{trend}</span>
        </div>
      )}

      {/* Decorative gradient blur */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
    </div>
  );
}
