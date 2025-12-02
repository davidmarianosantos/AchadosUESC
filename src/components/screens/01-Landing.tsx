import React from 'react';
import { Search, Package } from 'lucide-react';
import { Card } from '../ui/Card';

interface LandingProps {
  onNavigate: (screen: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-[1440px] mx-auto px-20 py-32">
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-4">
            Achados UESC
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Sistema de achados e perdidos da Universidade Estadual de Santa Cruz
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-12 text-center hover:shadow-xl transition-shadow cursor-pointer group" hover>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Search size={40} className="text-[#2563EB]" />
              </div>
            </div>
            <h2 className="text-gray-900 mb-4">Perdi um objeto</h2>
            <p className="text-gray-600 mb-8">
              Busque e registre objetos perdidos no campus
            </p>
            <button 
              onClick={() => onNavigate('login')}
              className="w-full px-6 py-3.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              Registrar objeto perdido
            </button>
          </Card>
          
          <Card className="p-12 text-center hover:shadow-xl transition-shadow cursor-pointer group" hover>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Package size={40} className="text-[#16A34A]" />
              </div>
            </div>
            <h2 className="text-gray-900 mb-4">Encontrei um objeto</h2>
            <p className="text-gray-600 mb-8">
              Cadastre o objeto encontrado para ajudar a devolver ao dono
            </p>
            <button 
              onClick={() => onNavigate('login')}
              className="w-full px-6 py-3.5 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] transition-colors"
            >
              Registrar objeto encontrado
            </button>
          </Card>
        </div>
        
        <div className="mt-24 text-center">
          <div className="flex justify-center gap-8 text-gray-600">
            <button className="hover:text-[#2563EB] transition-colors">Sobre</button>
            <button className="hover:text-[#2563EB] transition-colors">Política de Privacidade</button>
            <button className="hover:text-[#2563EB] transition-colors">Termos de Uso</button>
            <button className="hover:text-[#2563EB] transition-colors">Ajuda</button>
          </div>
          <p className="text-gray-500 text-sm mt-8">
            © 2024 Universidade Estadual de Santa Cruz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
