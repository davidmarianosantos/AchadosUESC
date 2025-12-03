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

  const [images, setImages] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastError, setToastError] = useState<string | null>(null);

  const MAX_PHOTOS = 10;

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

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > MAX_PHOTOS) {
      setToastError("Você pode enviar no máximo 10 fotos.");
      setTimeout(() => setToastError(null), 4000);
      return;
    }

    const newImages: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);

        if (newImages.length === files.length) {
          setImages(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
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

      // Aqui exibe o toast de validação
      setToastError("Preencha todos os campos obrigatórios.");
      setTimeout(() => setToastError(null), 4000);

      return;
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setTimeout(() => onNavigate('my-objects'), 2000);
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

            {/* Upload múltiplo */}
            <div>
              <label className="block text-gray-700 mb-2">
                Fotos do objeto (até 10)
              </label>

              <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <Info size={18} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Se tiver fotos antigas, isso ajuda na identificação
                </p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative">
                      <img src={img} className="w-full h-40 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#2563EB] transition-colors bg-gray-50">
                <Upload size={36} className="text-gray-400" />
                <p className="text-gray-600 mt-4 mb-2">Clique para selecionar fotos</p>
                <p className="text-gray-500 text-sm">PNG, JPG — até 10 fotos</p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUploadImages}
                  className="hidden"
                />
              </label>
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
              {errors.category && <p className="text-[#DC2626] text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Nome */}
            <Input
              label={<>Nome do objeto <span className="text-[#DC2626]">*</span></>}
              placeholder="Ex: Caderno azul com capa rígida"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            {/* Local */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Local provável <span className="text-[#DC2626]">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2.5 border rounded-lg bg-white outline-none ${
                    errors.location
                      ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]'
                      : 'border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]'
                  }`}
                >
                  <option value="">Selecione...</option>
                  {locations.map(loc => <option key={loc}>{loc}</option>)}
                </select>
                {errors.location && <p className="text-[#DC2626] text-sm mt-1">{errors.location}</p>}
              </div>

              <Input
                label="Outros detalhes"
                value={formData.locationDetail}
                onChange={(e) => setFormData({ ...formData, locationDetail: e.target.value })}
              />
            </div>

            {/* Data / Hora */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={<>Data aproximada <span className="text-[#DC2626]">*</span></>}
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

            {/* Locais visitados */}
            <div>
              <label className="block text-gray-700 mb-2">Por onde você passou</label>
              <p className="text-gray-600 text-sm mb-3">
                Ajuda a estimar onde o objeto pode estar.
              </p>

              <div className="grid grid-cols-2 gap-2">
                {placesVisited.map((place) => (
                  <label key={place} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedPlaces.includes(place)}
                      onChange={() => togglePlace(place)}
                      className="w-4 h-4 text-[#2563EB]"
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
              placeholder="Cores, marcas, detalhes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {/* Alerta */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableAlert}
                  onChange={(e) => setFormData({ ...formData, enableAlert: e.target.checked })}
                  className="w-5 h-5 text-[#2563EB]"
                />
                <div>
                  <p className="text-gray-900">Ativar alerta de correspondência</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Você será notificado quando objetos semelhantes forem encontrados.
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

      {/* Toasts */}
      {showToast && (
        <Toast
          type="success"
          message="Objeto perdido registrado com sucesso!"
          onClose={() => setShowToast(false)}
        />
      )}

      {toastError && (
        <Toast
          type="error"
          message={toastError}
          onClose={() => setToastError(null)}
        />
      )}
    </div>
  );
}
