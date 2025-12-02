import React, { useState } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Upload, X, Info } from 'lucide-react';
import { Toast } from '../ui/Toast';

interface RegistrarPerdidoProps {
  onNavigate: (screen: string) => void;
}

export function RegistrarPerdido({ onNavigate }: RegistrarPerdidoProps) {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    location: '',
    locationDetail: '',
    date: '',
    time: '',
    description: '',
    enableAlert: true
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  
  const categories = ['Eletrônicos', 'Documentos', 'Materiais acadêmicos', 'Acessórios', 'Roupas', 'Outros'];
  const locations = [
    'Pavilhão Pedro Calmon',
    'Biblioteca Central',
    'CEU',
    'Cantina',
    'Ponto de ônibus interno',
    'Reitoria',
    'Pavilhão Adonias Filho',
    'Departamento de Ciências Exatas',
    'Outros'
  ];
  const placesVisited = [
    'Biblioteca Central',
    'Cantina',
    'Pavilhão Pedro Calmon',
    'CEU',
    'Estacionamento',
    'Laboratório de Informática',
    'Quadra esportiva',
    'Auditório'
  ];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const togglePlace = (place: string) => {
    setSelectedPlaces(prev =>
      prev.includes(place) ? prev.filter(p => p !== place) : [...prev, place]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.category) newErrors.category = 'Categoria é obrigatória';
    if (!formData.name) newErrors.name = 'Nome do objeto é obrigatório';
    if (!formData.location) newErrors.location = 'Local provável é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setShowToast(true);
    setTimeout(() => {
      onNavigate('my-objects');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />
      
      <div className="max-w-[900px] mx-auto px-20 py-12">
        <h1 className="text-gray-900 mb-2">Registrar objeto perdido</h1>
        <p className="text-gray-600 mb-8">
          Descreva o objeto que você perdeu para receber alertas quando objetos semelhantes forem encontrados
        </p>
        
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload de foto (opcional) */}
            <div>
              <label className="block text-gray-700 mb-2">
                Foto antiga do objeto (opcional)
              </label>
              <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <Info size={18} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Se tiver foto antiga, isso ajuda na identificação
                </p>
              </div>
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#2563EB] transition-colors bg-gray-50">
                  <Upload size={48} className="text-gray-400" />
                  <p className="text-gray-600 mt-4 mb-2">Arraste uma foto aqui ou clique para selecionar</p>
                  <p className="text-gray-500 text-sm">PNG, JPG até 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {/* Categoria */}
            <div>
              <label className="block text-gray-700 mb-2">
                Categoria do objeto <span className="text-[#DC2626]">*</span>
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
              {errors.category && <p className="text-[#DC2626] text-sm mt-1">{errors.category}</p>}
            </div>
            
            {/* Nome do objeto */}
            <Input
              label={<>Nome do objeto <span className="text-[#DC2626]">*</span></>}
              type="text"
              placeholder="Ex: Caderno azul com capa rígida"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              error={errors.name}
            />
            
            {/* Local */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Local provável onde perdeu <span className="text-[#DC2626]">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-lg bg-white outline-none ${
                    errors.location
                      ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626] focus:ring-opacity-20'
                      : 'border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20'
                  }`}
                >
                  <option value="">Selecione...</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {errors.location && <p className="text-[#DC2626] text-sm mt-1">{errors.location}</p>}
              </div>
              
              <Input
                label="Outros detalhes do local"
                type="text"
                placeholder="Ex: Próximo à entrada principal"
                value={formData.locationDetail}
                onChange={(e) => setFormData({...formData, locationDetail: e.target.value})}
              />
            </div>
            
            {/* Data e hora */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={<>Data aproximada da perda <span className="text-[#DC2626]">*</span></>}
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                error={errors.date}
              />
              
              <Input
                label="Horário aproximado (opcional)"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
            
            {/* Por onde passou */}
            <div>
              <label className="block text-gray-700 mb-2">
                Por onde você passou naquele dia
              </label>
              <p className="text-gray-600 text-sm mb-3">
                Marque os locais que você visitou. Isso ajuda a identificar onde o objeto pode estar.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {placesVisited.map((place) => (
                  <label key={place} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedPlaces.includes(place)}
                      onChange={() => togglePlace(place)}
                      className="w-4 h-4 text-[#2563EB] border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{place}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Descrição */}
            <Input
              label="Descrição detalhada"
              multiline
              rows={4}
              placeholder="Descreva características, marcas, cores, detalhes que ajudem na identificação..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            
            {/* Alerta */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableAlert}
                  onChange={(e) => setFormData({...formData, enableAlert: e.target.checked})}
                  className="w-5 h-5 text-[#2563EB] border-gray-300 rounded mt-0.5"
                />
                <div>
                  <p className="text-gray-900">Ativar alerta de correspondência</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Você receberá uma notificação quando objetos semelhantes forem cadastrados como encontrados
                  </p>
                </div>
              </label>
            </div>
            
            {/* Botões */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button type="button" variant="secondary" onClick={() => onNavigate('dashboard')}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Publicar objeto perdido
              </Button>
            </div>
          </form>
        </Card>
      </div>
      
      {showToast && (
        <Toast
          type="success"
          message="Objeto perdido registrado com sucesso. Você receberá alertas de correspondência."
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
