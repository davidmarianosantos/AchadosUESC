import React, { useState } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';

interface PerfilProps {
  onNavigate: (screen: string) => void;
}

export function Perfil({ onNavigate }: PerfilProps) {
  const [activeTab, setActiveTab] = useState<'dados' | 'preferencias'>('dados');
  const [showToast, setShowToast] = useState(false);
  
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@uesc.br',
    cpf: '123.456.789-00',
    userType: 'aluno'
  });
  
  const [preferences, setPreferences] = useState({
    emailMatches: true,
    emailMessages: true,
    highContrast: false,
    largeFont: false
  });
  
  const handleSaveData = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
  };
  
  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />
      
      <div className="max-w-[900px] mx-auto px-20 py-12">
        <h1 className="text-gray-900 mb-8">Perfil e Configurações</h1>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'dados', label: 'Dados pessoais' },
            { id: 'preferencias', label: 'Preferências' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Dados pessoais */}
        {activeTab === 'dados' && (
          <Card className="p-8">
            <form onSubmit={handleSaveData} className="space-y-6">
              <Input
                label="Nome completo"
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
              />
              
              <div>
                <Input
                  label="E-mail institucional"
                  type="email"
                  value={userData.email}
                  disabled
                />
                <p className="text-gray-500 text-sm mt-1">
                  O e-mail institucional não pode ser alterado
                </p>
              </div>
              
              <div>
                <Input
                  label="CPF"
                  type="text"
                  value={userData.cpf}
                  disabled
                />
                <p className="text-gray-500 text-sm mt-1">
                  O CPF não pode ser alterado
                </p>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">
                  Tipo de vínculo
                </label>
                <select
                  value={userData.userType}
                  onChange={(e) => setUserData({...userData, userType: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20"
                >
                  <option value="aluno">Aluno</option>
                  <option value="professor">Professor</option>
                  <option value="servidor">Servidor técnico-administrativo</option>
                  <option value="visitante">Visitante autorizado</option>
                </select>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button type="submit" variant="primary">
                  Salvar alterações
                </Button>
              </div>
            </form>
          </Card>
        )}
        
        {/* Preferências */}
        {activeTab === 'preferencias' && (
          <Card className="p-8">
            <form onSubmit={handleSavePreferences} className="space-y-8">
              <div>
                <h3 className="text-gray-900 mb-4">Notificações</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.emailMatches}
                      onChange={(e) => setPreferences({...preferences, emailMatches: e.target.checked})}
                      className="w-5 h-5 text-[#2563EB] border-gray-300 rounded mt-0.5"
                    />
                    <div>
                      <p className="text-gray-900">Receber e-mail quando houver correspondência</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Você receberá um e-mail quando um objeto correspondente ao que você perdeu for encontrado
                      </p>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.emailMessages}
                      onChange={(e) => setPreferences({...preferences, emailMessages: e.target.checked})}
                      className="w-5 h-5 text-[#2563EB] border-gray-300 rounded mt-0.5"
                    />
                    <div>
                      <p className="text-gray-900">Receber notificações de mensagens internas</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Você receberá uma notificação quando receber uma nova mensagem
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              
              <hr className="border-gray-200" />
              
              <div>
                <h3 className="text-gray-900 mb-4">Acessibilidade</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.highContrast}
                      onChange={(e) => setPreferences({...preferences, highContrast: e.target.checked})}
                      className="w-5 h-5 text-[#2563EB] border-gray-300 rounded mt-0.5"
                    />
                    <div>
                      <p className="text-gray-900">Aumentar contraste</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Melhora a legibilidade aumentando o contraste entre texto e fundo
                      </p>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.largeFont}
                      onChange={(e) => setPreferences({...preferences, largeFont: e.target.checked})}
                      className="w-5 h-5 text-[#2563EB] border-gray-300 rounded mt-0.5"
                    />
                    <div>
                      <p className="text-gray-900">Tamanho de fonte maior</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Aumenta o tamanho da fonte em toda a plataforma
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button type="submit" variant="primary">
                  Salvar preferências
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
      
      {showToast && (
        <Toast
          type="success"
          message="Configurações salvas com sucesso!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
