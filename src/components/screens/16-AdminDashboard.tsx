import React from 'react';
import { Header } from '../Header';
import { AdminSidebar } from '../AdminSidebar';
import { Card } from '../ui/Card';
import { Package, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const metrics = [
    { label: 'Objetos cadastrados hoje', value: '12', icon: Package, color: 'bg-blue-100 text-[#2563EB]' },
    { label: 'Objetos em aberto', value: '45', icon: TrendingUp, color: 'bg-amber-100 text-[#F59E0B]' },
    { label: 'Objetos devolvidos no mês', value: '28', icon: CheckCircle, color: 'bg-green-100 text-[#16A34A]' },
    { label: 'Denúncias pendentes', value: '3', icon: AlertTriangle, color: 'bg-red-100 text-[#DC2626]' }
  ];
  
  const chartData = [
    { week: 'Sem 1', count: 15 },
    { week: 'Sem 2', count: 23 },
    { week: 'Sem 3', count: 18 },
    { week: 'Sem 4', count: 31 }
  ];
  
  const pendingActions = [
    {
      id: 1,
      type: 'denúncia',
      title: 'Denúncia sobre objeto #12340',
      description: 'Usuário reportou informações suspeitas',
      date: '30/11/2024'
    },
    {
      id: 2,
      type: 'validação',
      title: 'Objeto aguardando validação #12339',
      description: 'Documento com foto sensível',
      date: '29/11/2024'
    },
    {
      id: 3,
      type: 'denúncia',
      title: 'Denúncia sobre objeto #12335',
      description: 'Possível duplicação de registro',
      date: '28/11/2024'
    }
  ];
  
  const maxCount = Math.max(...chartData.map(d => d.count));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn isAdmin userName="Admin" onNavigate={onNavigate} />
      
      <div className="flex">
        <AdminSidebar activeScreen="admin-dashboard" onNavigate={onNavigate} />
        
        <main className="flex-1 p-8">
          <h1 className="text-gray-900 mb-8">Painel Administrativo</h1>
          
          {/* Métricas */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
                  <p className="text-gray-900 text-3xl">{metric.value}</p>
                </Card>
              );
            })}
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Gráfico */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-6">Objetos cadastrados (últimas 4 semanas)</h2>
              <div className="space-y-4">
                {chartData.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">{data.week}</span>
                      <span className="text-gray-900">{data.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#2563EB] h-3 rounded-full transition-all"
                        style={{ width: `${(data.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Ações pendentes */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Ações pendentes</h2>
                <Badge status="em-processo">{pendingActions.length}</Badge>
              </div>
              <div className="space-y-4">
                {pendingActions.map((action) => (
                  <div
                    key={action.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      if (action.type === 'denúncia') {
                        onNavigate('admin-report-detail');
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900">{action.title}</h3>
                      <Badge status={action.type === 'denúncia' ? 'em-processo' : 'perdido'}>
                        {action.type}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{action.description}</p>
                    <p className="text-gray-500 text-sm">{action.date}</p>
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
