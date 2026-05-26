import React from 'react';

export default function StatCard({ title, value, icon: Icon, colorClass, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className="text-sm mt-2 text-green-600 flex items-center">
             <span className="font-medium">{trend}</span>
             <span className="text-gray-400 ml-1">vs last month</span>
          </p>
        )}
      </div>
      <div className={`p-4 rounded-full ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  );
}
