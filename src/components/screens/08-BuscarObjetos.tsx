import React, { useState, useMemo } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';

interface BuscarObjetosProps {
  onNavigate: (screen: string) => void;
}

export function BuscarObjetos({ onNavigate }: BuscarObjetosProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'todos',
    categories: [] as string[],
    location: '',
    dateStart: '',
    dateEnd: '',
    status: [] as string[]
  });

  const categories = ['Eletrônicos', 'Documentos', 'Materiais acadêmicos', 'Acessórios', 'Roupas', 'Outros'];
  const locations = [
    'Pavilhão Pedro Calmon',
    'Biblioteca Central',
    'CEU',
    'Cantina',
    'Ponto de ônibus interno',
    'Reitoria'
  ];

  const objects = [
    { id: 1, name: 'Carteira de couro preta', category: 'Acessórios', location: 'Biblioteca Central', date: '2025-11-30', type: 'encontrado', status: 'perdido', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', protocol: '#12345' },
    { id: 2, name: 'Mochila azul marinho', category: 'Acessórios', location: 'Pavilhão Pedro Calmon', date: '2025-11-29', type: 'encontrado', status: 'correspondencia', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', protocol: '#12344', isMatch: true },
    { id: 3, name: 'Caderno de Cálculo', category: 'Materiais acadêmicos', location: 'CEU', date: '2025-11-28', type: 'encontrado', status: 'em-processo', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400', protocol: '#12343' },
    { id: 4, name: 'Fone de ouvido Bluetooth', category: 'Eletrônicos', location: 'Cantina', date: '2025-11-27', type: 'perdido', status: 'perdido', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', protocol: '#12342' },
    { id: 5, name: 'Carteirinha de estudante', category: 'Documentos', location: 'Reitoria', date: '2025-11-26', type: 'encontrado', status: 'devolvido', image: 'https://images.unsplash.com/photo-1631367095683-d311812cce5e?w=400', protocol: '#12341' },
    { id: 6, name: 'Garrafa térmica vermelha', category: 'Acessórios', location: 'Biblioteca Central', date: '2025-11-25', type: 'encontrado', status: 'perdido', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', protocol: '#12340' }
  ];

  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const toggleStatus = (stat: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(stat)
        ? prev.status.filter(s => s !== stat)
        : [...prev.status, stat]
    }));
  };

  const filteredObjects = useMemo(() => {
    return objects.filter(obj => {
      // Busca por nome
      if (searchTerm && !obj.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      // Tipo
      if (filters.type === 'encontrados' && obj.type !== 'encontrado') return false;
      if (filters.type === 'perdidos' && obj.type !== 'perdido') return false;

      // Categoria
      if (filters.categories.length > 0 && !filters.categories.includes(obj.category)) return false;

      // Local
      if (filters.location && obj.location !== filters.location) return false;

      // Período
      if (filters.dateStart && new Date(obj.date) < new Date(filters.dateStart)) return false;
      if (filters.dateEnd && new Date(obj.date) > new Date(filters.dateEnd)) return false;

      // Status
      if (filters.status.length > 0 && !filters.status.includes(obj.status)) return false;

      return true;
    });
  }, [searchTerm, filters]);

  const clearFilters = () => {
    setFilters({ type: 'todos', categories: [], location: '', dateStart: '', dateEnd: '', status: [] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />

      <div className="max-w-[1440px] mx-auto px-20 py-8">
        {/* Barra de busca */}
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Digite o nome do objeto (ex: carteira, pendrive)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filtros laterais */}
          <aside className="w-80 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-gray-700" />
                <h2 className="text-gray-900">Filtros</h2>
              </div>

              <div className="space-y-6">
                {/* Tipo de registro */}
                <div>
                  <h3 className="text-gray-900 mb-3">Tipo de registro</h3>
                  <div className="space-y-2">
                    {[{ value: 'todos', label: 'Todos' }, { value: 'encontrados', label: 'Objetos encontrados' }, { value: 'perdidos', label: 'Objetos perdidos' }].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={option.value}
                          checked={filters.type === option.value}
                          onChange={(e) => setFilters({...filters, type: e.target.value})}
                          className="w-4 h-4 text-[#2563EB]"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Categoria */}
                <div>
                  <h3 className="text-gray-900 mb-3">Categoria</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-4 h-4 text-[#2563EB] border-gray-300 rounded"
                        />
                        <span className="text-gray-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Local */}
                <div>
                  <h3 className="text-gray-900 mb-3">Local</h3>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                  >
                    <option value="">Todos os locais</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <hr className="border-gray-200" />

                {/* Período */}
                <div>
                  <h3 className="text-gray-900 mb-3">Período</h3>
                  <div className="space-y-3">
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
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Status */}
                <div>
                  <h3 className="text-gray-900 mb-3">Status</h3>
                  <div className="space-y-2">
                    {[{ value: 'em-aberto', label: 'Em aberto' }, { value: 'em-processo', label: 'Em processo de devolução' }, { value: 'devolvido', label: 'Devolvido' }].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.status.includes(option.value)}
                          onChange={() => toggleStatus(option.value)}
                          className="w-4 h-4 text-[#2563EB] border-gray-300 rounded"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            </Card>
          </aside>

          {/* Lista de resultados */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                Encontrados <span className="text-gray-900">{filteredObjects.length}</span> objetos
              </p>
            </div>

            {filteredObjects.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-600">Nenhum objeto encontrado com os critérios selecionados.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {filteredObjects.map((obj) => (
                  <Card key={obj.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" hover>
                    <div className="aspect-video bg-gray-200 overflow-hidden relative">
                      <img src={obj.image} alt={obj.name} className="w-full h-full object-cover" />
                      {obj.isMatch && (
                        <div className="absolute top-2 right-2">
                          <Badge status="correspondencia">Sugestão para você</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <Badge status={obj.status as any} className="mb-3">
                        {obj.status === 'perdido' && 'Em aberto'}
                        {obj.status === 'correspondencia' && 'Correspondência'}
                        {obj.status === 'em-processo' && 'Em processo'}
                        {obj.status === 'devolvido' && 'Devolvido'}
                      </Badge>
                      <h3 className="text-gray-900 mb-2">{obj.name}</h3>
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MapPin size={14} />
                          <span>{obj.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={14} />
                          <span>{obj.date}</span>
                        </div>
                        <p className="text-gray-500 text-sm">Protocolo: {obj.protocol}</p>
                      </div>
                      <button
                        onClick={() => onNavigate('object-detail')}
                        className="text-[#2563EB] hover:underline"
                      >
                        Ver detalhes
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
