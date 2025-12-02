import React from 'react';
import { LayoutDashboard, Package, AlertTriangle, Users, BarChart3, Settings } from 'lucide-react';

interface AdminSidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function AdminSidebar({ activeScreen, onNavigate }: AdminSidebarProps) {
  const menuItems = [
    { id: 'admin-dashboard', label: 'Visão geral', icon: LayoutDashboard },
    { id: 'admin-objects', label: 'Objetos', icon: Package },
    { id: 'admin-report-detail', label: 'Denúncias', icon: AlertTriangle },
    { id: 'admin-users', label: 'Usuários', icon: Users },
    { id: 'admin-reports', label: 'Relatórios', icon: BarChart3 },
  ];
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[#2563EB] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
