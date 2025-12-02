import React, { useState } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Info } from 'lucide-react';
import { Toast } from '../ui/Toast';

interface EditarObjetoProps {
  onNavigate: (screen: string) => void;
}

export function EditarObjeto({ onNavigate }: EditarObjetoProps) {
  const [formData, setFormData] = useState({
    category: 'Acessórios',
    name: 'Carteira de couro preta',
    location: 'Biblioteca Central',
    locationDetail: 'Próximo ao balcão de empréstimos',
    date: '2024-11-30',
    time: '14:30',
    description: 'Carteira de couro sintético na cor preta. Possui compartimento para moedas com zíper dourado.',
    currentLocation: 'Entregue na segurança',
    allowMessages: true
  });
  const [showToast, setShowToast] = useState(false);
  
  const categories = ['Eletrônicos', 'Documentos', 'Materiais acadêmicos', 'Acessórios', 'Roupas', 'Outros'];
  const locations = [
    'Pavilhão Pedro Calmon',
    'Biblioteca Central',
    'CEU',
    'Cantina',
    'Ponto de ônibus interno',
    'Reitoria'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      onNavigate('my-objects');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />
      
      <div className="max-w-[900px] mx-auto px-20 py-12">
        <h1 className="text-gray-900 mb-2">Editar objeto encontrado</h1>
        <p className="text-gray-600 mb-6">
          Protocolo: #12345
        </p>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2 mb-8">
          <Info size={18} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Você só pode editar objetos que ainda não foram marcados como devolvidos.
          </p>
        </div>
        
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Categoria */}
            <div>
              <label className="block text-gray-700 mb-2">
                Categoria do objeto
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({...formData, category: cat})}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      formData.category === cat
                        ? 'bg-[#2563EB] text-white border-[#2563EB]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#2563EB]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Nome do objeto */}
            <Input
              label="Nome do objeto"
              type="text"
              placeholder="Ex: Carteira de couro marrom"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            {/* Local */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Local onde foi encontrado
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              <Input
                label="Detalhe do local (opcional)"
                type="text"
                placeholder="Ex: Sala 203, corredor esquerdo"
                value={formData.locationDetail}
                onChange={(e) => setFormData({...formData, locationDetail: e.target.value})}
              />
            </div>
            
            {/* Data e hora */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Data em que foi encontrado"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              
              <Input
                label="Horário aproximado"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
            
            {/* Descrição */}
            <Input
              label="Descrição detalhada"
              multiline
              rows={4}
              placeholder="Descreva características visuais, marcas, adesivos, chaveiros, etc."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            
            {/* Onde está agora */}
            <div>
              <label className="block text-gray-700 mb-2">
                Onde o objeto está agora?
              </label>
              <div className="space-y-2">
                {['Comigo', 'Entregue na segurança', 'Secretaria do curso', 'Outro'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="currentLocation"
                      value={option}
                      checked={formData.currentLocation === option}
                      onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
                      className="w-4 h-4 text-[#2563EB]"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Permitir mensagens */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowMessages}
                onChange={(e) => setFormData({...formData, allowMessages: e.target.checked})}
                className="w-4 h-4 text-[#2563EB] border-gray-300 rounded"
              />
              <span className="text-gray-700">Permitir mensagens internas de usuários interessados neste objeto</span>
            </label>
            
            {/* Botões */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button type="button" variant="secondary" onClick={() => onNavigate('my-objects')}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Salvar alterações
              </Button>
            </div>
          </form>
        </Card>
      </div>
      
      {showToast && (
        <Toast
          type="success"
          message="Alterações salvas com sucesso!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
