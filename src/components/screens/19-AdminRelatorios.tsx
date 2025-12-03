import React, { useState, useMemo } from 'react';
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
  // -----------------------
  // Estado dos filtros
  // -----------------------
  const [filters, setFilters] = useState({
    dateStart: '2025-11-01',
    dateEnd: '2025-11-30',
    location: '',
    type: 'todos'
  });

  // -----------------------
  // Dados brutos simulados
  // -----------------------
  const rawObjects = [
    { date: '2025-11-05', type: 'perdido', location: 'Biblioteca Central' },
    { date: '2025-11-08', type: 'encontrado', location: 'Biblioteca Central' },
    { date: '2025-11-12', type: 'perdido', location: 'CEU' },
    { date: '2025-11-15', type: 'encontrado', location: 'CEU' },
    { date: '2025-11-18', type: 'perdido', location: 'Cantina' },
    { date: '2025-11-19', type: 'encontrado', location: 'Cantina' },
    { date: '2025-11-20', type: 'perdido', location: 'Reitoria' },
    { date: '2025-11-22', type: 'encontrado', location: 'Pavilhão Pedro Calmon' },
    { date: '2025-11-23', type: 'perdido', location: 'Pavilhão Pedro Calmon' },
  ];

  const locations = [
    'Pavilhão Pedro Calmon',
    'Biblioteca Central',
    'CEU',
    'Cantina',
    'Ponto de ônibus interno',
    'Reitoria'
  ];

  // -----------------------
  // Aplicação dos filtros
  // -----------------------
  const filteredObjects = useMemo(() => {
    return rawObjects.filter(obj => {
      const d = new Date(obj.date);
      const from = new Date(filters.dateStart);
      const to = new Date(filters.dateEnd);

      if (d < from || d > to) return false;
      if (filters.location && obj.location !== filters.location) return false;
      if (filters.type !== 'todos' && obj.type !== filters.type) return false;

      return true;
    });
  }, [filters]);

  // -----------------------
  // Estatísticas (dinâmicas!)
  // -----------------------
  const summary = useMemo(() => {
    return {
      totalObjects: filteredObjects.length,
      totalLost: filteredObjects.filter(o => o.type === 'perdido').length,
      totalFound: filteredObjects.filter(o => o.type === 'encontrado').length,
      // Simulados:
      returned: Math.round(filteredObjects.length * 0.30),
      inProgress: Math.round(filteredObjects.length * 0.12),
      open: Math.round(filteredObjects.length * 0.58),
    };
  }, [filteredObjects]);

  // -----------------------
  // Objetos por local
  // -----------------------
  const locationData = useMemo(() => {
    const map: Record<string, number> = {};

    filteredObjects.forEach(obj => {
      if (!map[obj.location]) map[obj.location] = 0;
      map[obj.location]++;
    });

    return Object.entries(map).map(([location, count]) => ({
      location,
      count,
      percentage: Math.round((count / filteredObjects.length) * 100) || 0
    }));
  }, [filteredObjects]);

  const maxLocationCount = Math.max(...locationData.map(d => d.count), 1);

  // -----------------------
  // Evolução mensal (simulado)
  // -----------------------
  const monthlyData = [
    { month: 'Jul', count: 42 },
    { month: 'Ago', count: 55 },
    { month: 'Set', count: 48 },
    { month: 'Out', count: 67 },
    { month: 'Nov', count: filteredObjects.length }, // dinâmico!
    { month: 'Dez', count: 58 }
  ];

  const maxMonthlyCount = Math.max(...monthlyData.map(d => d.count), 1);

  // -----------------------
  // RETORNO DA TELA
  // -----------------------
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

          {/* FILTROS */}
          <Card className="p-6 mb-8">
            <h2 className="text-gray-900 mb-4">Filtros</h2>
            <div className="grid grid-cols-4 gap-4">

              <Input
                label="Data inicial"
                type="date"
                value={filters.dateStart}
                onChange={(e) => setFilters({ ...filters, dateStart: e.target.value })}
              />

              <Input
                label="Data final"
                type="date"
                value={filters.dateEnd}
                onChange={(e) => setFilters({ ...filters, dateEnd: e.target.value })}
              />

              <div>
                <label className="block text-gray-700 mb-2">Local</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="">Todos os locais</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Tipo</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="todos">Todos</option>
                  <option value="perdido">Objetos perdidos</option>
                  <option value="encontrado">Objetos encontrados</option>
                </select>
              </div>

            </div>
          </Card>

          {/* RESUMO */}
          <div className="grid grid-cols-6 gap-4 mb-8">

            <Card className="p-5">
              <Package size={20} className="text-[#2563EB] mb-2" />
              <p className="text-gray-600 text-sm mb-1">Total de objetos</p>
              <p className="text-gray-900 text-2xl">{summary.totalObjects}</p>
            </Card>

            <Card className="p-5">
              <TrendingUp size={20} className="text-[#F59E0B] mb-2" />
              <p className="text-gray-600 text-sm mb-1">Perdidos</p>
              <p className="text-gray-900 text-2xl">{summary.totalLost}</p>
            </Card>

            <Card className="p-5">
              <Package size={20} className="text-[#16A34A] mb-2" />
              <p className="text-gray-600 text-sm mb-1">Encontrados</p>
              <p className="text-gray-900 text-2xl">{summary.totalFound}</p>
            </Card>

            <Card className="p-5">
              <p className="text-gray-600 text-sm mb-1">Devolvidos</p>
              <p className="text-gray-900 text-2xl">{summary.returned}</p>
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
            
            {/* Por local */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={20} className="text-gray-700" />
                <h2 className="text-gray-900">Objetos por pavilhão/local</h2>
              </div>

              <div className="space-y-4">
                {locationData.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700 text-sm">{data.location}</span>
                      <span className="text-gray-900">{data.count} ({data.percentage}%)</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#2563EB] h-2 rounded-full"
                        style={{
                          width: `${(data.count / maxLocationCount) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Por mês */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-gray-700" />
                <h2 className="text-gray-900">Evolução de registros por mês</h2>
              </div>

              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700">{data.month}</span>
                      <span className="text-gray-900">{data.count}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#16A34A] h-3 rounded-full"
                        style={{
                          width: `${(data.count / maxMonthlyCount) * 100}%`
                        }}
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
