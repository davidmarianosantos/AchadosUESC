import React, { useState } from 'react';
import { Header } from '../Header';
import { AdminSidebar } from '../AdminSidebar';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Download, TrendingUp, Package, MapPin } from 'lucide-react';

interface AdminRelatoriosProps {
  onNavigate: (screen: string) => void;
}

export function AdminRelatorios({ onNavigate }: AdminRelatoriosProps) {
  const [filters, setFilters] = useState({
    dateStart: '2024-11-01',
    dateEnd: '2024-11-30',
    location: '',
    type: 'todos'
  });
  
  const locations = [
    'Pavilhão Pedro Calmon',
    'Biblioteca Central',
    'CEU',
    'Cantina',
    'Ponto de ônibus interno',
    'Reitoria'
  ];
  
  const locationData = [
    { location: 'Biblioteca Central', count: 45, percentage: 30 },
    { location: 'Pavilhão Pedro Calmon', count: 38, percentage: 25 },
    { location: 'CEU', count: 32, percentage: 21 },
    { location: 'Cantina', count: 20, percentage: 13 },
    { location: 'Reitoria', count: 15, percentage: 10 },
    { location: 'Outros', count: 12, percentage: 8 }
  ];
  
  const monthlyData = [
    { month: 'Jul', count: 42 },
    { month: 'Ago', count: 55 },
    { month: 'Set', count: 48 },
    { month: 'Out', count: 67 },
    { month: 'Nov', count: 73 },
    { month: 'Dez', count: 58 }
  ];
  
  const maxMonthlyCount = Math.max(...monthlyData.map(d => d.count));
  const maxLocationCount = Math.max(...locationData.map(d => d.count));
  
  const summary = {
    totalObjects: 162,
    totalLost: 78,
    totalFound: 84,
    returned: 45,
    inProgress: 23,
    open: 94
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn isAdmin userName="Admin" onNavigate={onNavigate} />
      
      <div className="flex">
        <AdminSidebar activeScreen="admin-reports" onNavigate={onNavigate} />
        
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-900">Relatórios</h1>
            <Button variant="primary">
              <Download size={18} />
              Exportar relatório completo
            </Button>
          </div>
          
          {/* Filtros */}
          <Card className="p-6 mb-8">
            <h2 className="text-gray-900 mb-4">Filtros</h2>
            <div className="grid grid-cols-4 gap-4">
              <Input
                label="Data inicial"
                type="date"
                value={filters.dateStart}
                onChange={(e) => setFilters({...filters, dateStart: e.target.value})}
              />
              
              <Input
                label="Data final"
                type="date"
                value={filters.dateEnd}
                onChange={(e) => setFilters({...filters, dateEnd: e.target.value})}
              />
              
              <div>
                <label className="block text-gray-700 mb-2">Local</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20"
                >
                  <option value="">Todos os locais</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Tipo</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20"
                >
                  <option value="todos">Todos</option>
                  <option value="perdidos">Objetos perdidos</option>
                  <option value="encontrados">Objetos encontrados</option>
                </select>
              </div>
            </div>
          </Card>
          
          {/* Resumo */}
          <div className="grid grid-cols-6 gap-4 mb-8">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-2">
                <Package size={20} className="text-[#2563EB]" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Total de objetos</p>
              <p className="text-gray-900 text-2xl">{summary.totalObjects}</p>
            </Card>
            
            <Card className="p-5">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp size={20} className="text-[#F59E0B]" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Perdidos</p>
              <p className="text-gray-900 text-2xl">{summary.totalLost}</p>
            </Card>
            
            <Card className="p-5">
              <div className="flex items-center justify-between mb-2">
                <Package size={20} className="text-[#16A34A]" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Encontrados</p>
              <p className="text-gray-900 text-2xl">{summary.totalFound}</p>
            </Card>
            
            <Card className="p-5">
              <p className="text-gray-600 text-sm mb-1">Devolvidos</p>
              <p className="text-gray-900 text-2xl">{summary.returned}</p>
              <p className="text-green-600 text-xs mt-1">
                {Math.round((summary.returned / summary.totalObjects) * 100)}% do total
              </p>
            </Card>
            
            <Card className="p-5">
              <p className="text-gray-600 text-sm mb-1">Em processo</p>
              <p className="text-gray-900 text-2xl">{summary.inProgress}</p>
            </Card>
            
            <Card className="p-5">
              <p className="text-gray-600 text-sm mb-1">Em aberto</p>
              <p className="text-gray-900 text-2xl">{summary.open}</p>
            </Card>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Objetos por local */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={20} className="text-gray-700" />
                <h2 className="text-gray-900">Objetos por pavilhão/local</h2>
              </div>
              <div className="space-y-4">
                {locationData.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 text-sm">{data.location}</span>
                      <span className="text-gray-900">{data.count} ({data.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#2563EB] h-2 rounded-full transition-all"
                        style={{ width: `${(data.count / maxLocationCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Evolução mensal */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-gray-700" />
                <h2 className="text-gray-900">Evolução de registros por mês</h2>
              </div>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">{data.month}</span>
                      <span className="text-gray-900">{data.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#16A34A] h-3 rounded-full transition-all"
                        style={{ width: `${(data.count / maxMonthlyCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
