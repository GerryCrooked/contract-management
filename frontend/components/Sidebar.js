import React from 'react';
import { Home, FileText, Settings, Users, LogOut } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 text-2xl font-bold border-b border-gray-800 flex items-center space-x-2">
        <FileText className="text-indigo-500" />
        <span>ContractMgr</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center space-x-3 p-3 bg-indigo-600 rounded-lg text-white">
          <Home size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <FileText size={20} />
          <span>Contracts</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <Users size={20} />
          <span>Users</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <a href="#" className="flex items-center space-x-3 p-3 text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span>Log out</span>
        </a>
      </div>
    </div>
  );
}
