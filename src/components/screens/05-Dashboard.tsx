import React from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Package, ArrowRight, Clock } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const matchedObjects = [
    {
      id: 1,
      name: 'Carteira preta',
      location: 'Biblioteca Central',
      date: '30/11/2025',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400'
    },
    {
      id: 2,
      name: 'Mochila azul',
      location: 'Pavilhão Pedro Calmon',
      date: '29/11/2025',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
    }
  ];
  
  const recentActivities = [
    { text: 'Você registrou o objeto "Chave de carro" como perdido', date: '30/11/2025, 14:30' },
    { text: 'Nova correspondência encontrada para "Carteira preta"', date: '30/11/2025, 10:15' },
    { text: 'Nova correspondência encontrada para "Mochila Azul"', date: '29/11/2025, 20:15' },
    { text: 'Status atualizado para "Devolvido" - Caderno de anotações', date: '28/11/2025, 16:45' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />
      
      <div className="max-w-[1440px] mx-auto px-20 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Bem-vindo de volta, João!</h1>
        
        {/* Ações principais */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer group" hover>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <Search size={24} className="text-[#F59E0B]" />
                </div>
                <h2 className="text-gray-900 mb-2">Perdi um objeto</h2>
                <p className="text-gray-600 mb-4">
                  Registre um objeto que você perdeu no campus para receber alertas de correspondência
                </p>
                <button 
                  onClick={() => onNavigate('register-lost')}
                  className="flex items-center gap-2 text-[#2563EB] hover:gap-3 transition-all"
                >
                  Registrar objeto perdido
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Card>
          
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer group" hover>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Package size={24} className="text-[#16A34A]" />
                </div>
                <h2 className="text-gray-900 mb-2">Encontrei um objeto</h2>
                <p className="text-gray-600 mb-4">
                  Cadastre um objeto que você encontrou para ajudar a devolver ao dono
                </p>
                <button 
                  onClick={() => onNavigate('register-found')}
                  className="flex items-center gap-2 text-[#2563EB] hover:gap-3 transition-all"
                >
                  Registrar objeto encontrado
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Correspondências sugeridas */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Correspondências sugeridas</h2>
            <button 
              onClick={() => onNavigate('search')}
              className="text-[#2563EB] hover:underline"
            >
              Ver todas
            </button>
          </div>
          
          {matchedObjects.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {matchedObjects.map((obj) => (
                <Card key={obj.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" hover>
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img src={obj.image} alt={obj.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <Badge status="correspondencia" className="mb-3">
                      Correspondência sugerida
                    </Badge>
                    <h3 className="text-gray-900 mb-2">{obj.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{obj.location}</p>
                    <p className="text-gray-500 text-sm mb-4">{obj.date}</p>
                    <button 
                      onClick={() => onNavigate('object-detail')}
                      className="text-[#2563EB] text-sm hover:underline"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-600">Ainda não há correspondências sugeridas</p>
            </Card>
          )}
        </div>
        
        {/* Atividades recentes */}
        <div>
          <h2 className="text-gray-900 text-xl font-semibold mb-6">Atividades recentes</h2>
          <Card className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-5 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock size={16} className="text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.text}</p>
                  <p className="text-gray-500 text-sm mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
