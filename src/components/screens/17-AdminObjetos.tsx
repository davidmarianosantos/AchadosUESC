import React, { useState } from 'react';
import { Header } from '../Header';
import { AdminSidebar } from '../AdminSidebar';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Filter, Download, MoreVertical, Edit, Archive } from 'lucide-react';

interface AdminObjetosProps {
  onNavigate: (screen: string) => void;
}

export function AdminObjetos({ onNavigate }: AdminObjetosProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [showMenu, setShowMenu] = useState<number | null>(null);

  // Estados dos filtros
  const [fTipo, setFTipo] = useState("Todos");
  const [fStatus, setFStatus] = useState("Todos");
  const [fLocal, setFLocal] = useState("Todos");
  const [fCat, setFCat] = useState("Todos");

  const objects = [
    { id: 12345, name: 'Carteira de couro preta', type: 'Encontrado', location: 'Biblioteca Central', status: 'perdido', date: '30/11/2024', category: 'Acessórios' },
    { id: 12344, name: 'Mochila azul marinho', type: 'Encontrado', location: 'Pavilhão Pedro Calmon', status: 'correspondencia', date: '29/11/2024', category: 'Acessórios' },
    { id: 12343, name: 'Chave de carro Toyota', type: 'Perdido', location: 'Estacionamento', status: 'perdido', date: '29/11/2024', category: 'Outros' },
    { id: 12342, name: 'Caderno de Física', type: 'Encontrado', location: 'CEU', status: 'em-processo', date: '28/11/2024', category: 'Materiais acadêmicos' },
    { id: 12341, name: 'Fone de ouvido Bluetooth', type: 'Perdido', location: 'Cantina', status: 'perdido', date: '27/11/2024', category: 'Eletrônicos' },
    { id: 12340, name: 'Carteirinha de estudante', type: 'Encontrado', location: 'Reitoria', status: 'devolvido', date: '26/11/2024', category: 'Documentos' }
  ];

  // Filtro REAL
  const filteredObjects = objects.filter(obj => {
    return (
      (fTipo === "Todos" || obj.type === fTipo) &&
      (fStatus === "Todos" ||
        (fStatus === "Em aberto" && obj.status === "perdido") ||
        (fStatus === "Em processo" && obj.status === "em-processo") ||
        (fStatus === "Devolvido" && obj.status === "devolvido")
      ) &&
      (fLocal === "Todos" || obj.location === fLocal) &&
      (fCat === "Todos" || obj.category === fCat)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn isAdmin userName="Admin" onNavigate={onNavigate} />

      <div className="flex">
        <AdminSidebar activeScreen="admin-objects" onNavigate={onNavigate} />

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-900">Gestão de Objetos</h1>
            <Button variant="secondary">
              <Download size={18} />
              Exportar relatório (CSV)
            </Button>
          </div>

          {/* FILTROS */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-700" />
                <h2 className="text-gray-900">Filtros</h2>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-[#2563EB] hover:underline text-sm"
              >
                {showFilters ? "Ocultar" : "Mostrar"} filtros
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-4 gap-4">
                {/* Tipo */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">Tipo</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                    value={fTipo}
                    onChange={e => setFTipo(e.target.value)}
                  >
                    <option>Todos</option>
                    <option>Perdido</option>
                    <option>Encontrado</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                    value={fStatus}
                    onChange={e => setFStatus(e.target.value)}
                  >
                    <option>Todos</option>
                    <option>Em aberto</option>
                    <option>Em processo</option>
                    <option>Devolvido</option>
                  </select>
                </div>

                {/* Local */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">Local</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                    value={fLocal}
                    onChange={e => setFLocal(e.target.value)}
                  >
                    <option>Todos</option>
                    <option>Biblioteca Central</option>
                    <option>Pavilhão Pedro Calmon</option>
                    <option>CEU</option>
                    <option>Estacionamento</option>
                    <option>Cantina</option>
                    <option>Reitoria</option>
                  </select>
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">Categoria</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                    value={fCat}
                    onChange={e => setFCat(e.target.value)}
                  >
                    <option>Todos</option>
                    <option>Eletrônicos</option>
                    <option>Documentos</option>
                    <option>Acessórios</option>
                    <option>Outros</option>
                    <option>Materiais acadêmicos</option>
                  </select>
                </div>
              </div>
            )}
          </Card>

          {/* TABELA */}
          <Card className="overflow-hidden">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900 w-28">Protocolo</th>
                  <th className="px-6 py-4 text-left text-gray-900 w-60">Nome do objeto</th>
                  <th className="px-6 py-4 text-left text-gray-900 w-32">Tipo</th>
                  <th className="px-6 py-4 text-left text-gray-900 w-48">Local</th>
                  <th className="px-6 py-4 text-left text-gray-900 w-32">Status</th>
                  <th className="px-6 py-4 text-left text-gray-900 w-28">Data</th>
                  <th className="px-6 py-4 text-right text-gray-900 w-32">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {/* Caso nenhum objeto seja encontrado */}
                {filteredObjects.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-gray-500 text-sm"
                    >
                      Nenhum objeto encontrado com os filtros selecionados.
                    </td>
                  </tr>
                )}

                {filteredObjects.map(obj => (
                  <tr key={obj.id} className="hover:bg-gray-50 transition-colors">

                    <td className="px-6 py-4 text-gray-900">#{obj.id}</td>

                    <td className="px-6 py-4">
                      <p className="text-gray-900">{obj.name}</p>
                      <p className="text-gray-500 text-sm">{obj.category}</p>
                    </td>

                    <td className="px-6 py-4">
                      <Badge status={obj.type === "Perdido" ? "perdido" : "encontrado"}>
                        {obj.type}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-gray-700">{obj.location}</td>

                    <td className="px-6 py-4">
                      <Badge status={obj.status as any}>
                        {obj.status === "perdido" && "Em aberto"}
                        {obj.status === "correspondencia" && "Correspondência"}
                        {obj.status === "em-processo" && "Em processo"}
                        {obj.status === "devolvido" && "Devolvido"}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-gray-600">{obj.date}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">

                        <Button size="sm" variant="secondary" onClick={() => onNavigate('object-detail')}>
                          Ver
                        </Button>

                        <div className="relative">
                          <button
                            onClick={() => setShowMenu(showMenu === obj.id ? null : obj.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical size={16} className="text-gray-600" />
                          </button>

                          {showMenu === obj.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">

                              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                                <Edit size={16} />
                                Editar
                              </button>

                              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                                Alterar status
                              </button>

                              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                                <Archive size={16} />
                                Arquivar
                              </button>

                            </div>
                          )}
                        </div>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </main>
      </div>
    </div>
  );
}
