import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Upload, X } from 'lucide-react';
import { Toast } from '../ui/Toast';

interface RegistrarEncontradoProps {
  onNavigate: (screen: string) => void;
}

export function RegistrarEncontrado({ onNavigate }: RegistrarEncontradoProps) {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    location: '',
    locationDetail: '',
    date: '',
    time: '',
    description: '',
    currentLocation: '',
    allowMessages: true
  });

  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

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

  // TOAST sucesso – some automaticamente
  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  // TOAST erro – some automaticamente
  useEffect(() => {
    if (errorToast) {
      const t = setTimeout(() => setErrorToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [errorToast]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 10) {
      setErrorToast("Você pode enviar no máximo 10 fotos.");
      return;
    }

    const newImages: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);

        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (images.length === 0) newErrors.images = 'Pelo menos 1 foto é obrigatória';
    if (!formData.category) newErrors.category = 'Categoria é obrigatória';
    if (!formData.name) newErrors.name = 'Nome do objeto é obrigatório';
    if (!formData.location) newErrors.location = 'Local é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.currentLocation) newErrors.currentLocation = 'Informe onde o objeto está agora';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorToast("Preencha todos os campos obrigatórios.");
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
        <h1 className="text-gray-900 mb-2">Registrar objeto encontrado</h1>
        <p className="text-gray-600 mb-8">
          Preencha as informações do objeto que você encontrou para ajudar a devolver ao dono
        </p>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Upload de fotos */}
            <div>
              <label className="block text-gray-700 mb-2">
                Fotos do objeto (até 10) <span className="text-[#DC2626]">*</span>
              </label>

              <label
                className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  errors.images ? 'border-[#DC2626] bg-red-50' : 'border-gray-300 hover:border-[#2563EB] bg-gray-50'
                }`}
              >
                <Upload size={48} className={errors.images ? 'text-[#DC2626]' : 'text-gray-400'} />
                <p className="text-gray-600 mt-4 mb-2">Arraste fotos aqui ou clique para selecionar</p>
                <p className="text-gray-500 text-sm">PNG, JPG — até 10 fotos</p>

                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>

              {errors.images && (
                <p className="text-[#DC2626] text-sm mt-1">{errors.images}</p>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
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
                    onClick={() => setFormData({ ...formData, category: cat })}
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
              {errors.category && (
                <p className="text-[#DC2626] text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Nome */}
            <Input
              label={<>Nome do objeto <span className="text-[#DC2626]">*</span></>}
              type="text"
              placeholder="Ex: Carteira de couro marrom"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            {/* Local */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Local onde foi encontrado <span className="text-[#DC2626]">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2.5 border rounded-lg bg-white outline-none ${
                    errors.location ? 'border-[#DC2626]' : 'border-gray-300 focus:border-[#2563EB]'
                  }`}
                >
                  <option value="">Selecione...</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-[#DC2626] text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <Input
                label="Detalhe do local (opcional)"
                type="text"
                placeholder="Ex: Sala 203, corredor esquerdo"
                value={formData.locationDetail}
                onChange={(e) => setFormData({ ...formData, locationDetail: e.target.value })}
              />
            </div>

            {/* Data e Hora */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={<>Data em que foi encontrado <span className="text-[#DC2626]">*</span></>}
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                error={errors.date}
              />

              <Input
                label="Horário aproximado"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            {/* Descrição */}
            <Input
              label="Descrição detalhada"
              multiline
              rows={4}
              placeholder="Descreva características visuais, marcas, adesivos, chaveiros, etc."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {/* Onde está agora */}
            <div>
              <label className="block text-gray-700 mb-2">
                Onde o objeto está agora? <span className="text-[#DC2626]">*</span>
              </label>
              <div className="space-y-2">
                {['Comigo', 'Entregue na segurança', 'Secretaria do curso', 'Outro'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="currentLocation"
                      value={option}
                      checked={formData.currentLocation === option}
                      onChange={(e) =>
                        setFormData({ ...formData, currentLocation: e.target.value })
                      }
                      className="w-4 h-4 text-[#2563EB]"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {errors.currentLocation && (
                <p className="text-[#DC2626] text-sm mt-1">{errors.currentLocation}</p>
              )}
            </div>

            {/* Permitir mensagens */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowMessages}
                onChange={(e) =>
                  setFormData({ ...formData, allowMessages: e.target.checked })
                }
                className="w-4 h-4 text-[#2563EB] border-gray-300 rounded"
              />
              <span className="text-gray-700">
                Permitir mensagens internas de usuários interessados neste objeto
              </span>
            </label>

            {/* Botões */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button type="button" variant="secondary" onClick={() => onNavigate('dashboard')}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Publicar objeto encontrado
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Toast de sucesso */}
      {showToast && (
        <Toast
          type="success"
          message="Objeto encontrado registrado com sucesso. Nº de protocolo: 12345"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Toast de erro */}
      {errorToast && (
        <Toast
          type="error"
          message={errorToast}
          onClose={() => setErrorToast(null)}
        />
      )}
    </div>
  );
}
