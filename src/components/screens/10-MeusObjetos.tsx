import React, { useState } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { MoreVertical, Edit, Trash2, CheckCircle, Search, Eye } from 'lucide-react';

interface MeusObjetosProps {
  onNavigate: (screen: string) => void;
}

export function MeusObjetos({ onNavigate }: MeusObjetosProps) {
  const [activeTab, setActiveTab] = useState<'todos' | 'perdidos' | 'encontrados'>('todos');
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedObject, setSelectedObject] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // Estado de loading

  const objects = [
    {
      id: 1,
      name: 'Carteira de couro preta',
      type: 'encontrado',
      location: 'Biblioteca Central',
      date: '30/11/2025',
      status: 'perdido',
      protocol: '#12345'
    },
    {
      id: 2,
      name: 'Chave de carro Toyota',
      type: 'perdido',
      location: 'Estacionamento',
      date: '29/11/2025',
      status: 'perdido',
      protocol: '#12344'
    },
    {
      id: 3,
      name: 'Caderno de Física',
      type: 'encontrado',
      location: 'CEU',
      date: '28/11/2025',
      status: 'devolvido',
      protocol: '#12343'
    },
    {
      id: 4,
      name: 'Fone de ouvido',
      type: 'perdido',
      location: 'Cantina',
      date: '27/11/2025',
      status: 'em-processo',
      protocol: '#12342'
    }
  ];

  const filteredObjects = objects.filter(obj => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'perdidos') return obj.type === 'perdido';
    if (activeTab === 'encontrados') return obj.type === 'encontrado';
    return true;
  });

  const handleDelete = () => {
    setIsDeleting(true); // Inicia loading
    
    // Simula deleção do banco de dados (1.5s)
    setTimeout(() => {
      console.log("Objeto deletado:", selectedObject);
      setIsDeleting(false); // Para loading
      setShowDeleteModal(false);
      setSelectedObject(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />

      <div className="max-w-[1300px] mx-auto px-10 py-10">

        <h1 className="text-gray-900 mb-6">Meus objetos</h1>

        <div className="flex gap-2 mb-6">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'perdidos', label: 'Perdidos' },
            { id: 'encontrados', label: 'Encontrados' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredObjects.length > 0 ? (
          <Card className="overflow-visible">

            <table className="w-full table-fixed">

              <colgroup>
                <col className="w-[24%]" /> {/* Objeto */}
                <col className="w-[10%]" /> {/* Tipo */}
                <col className="w-[18%]" /> {/* Local */}
                <col className="w-[12%]" /> {/* Data */}
                <col className="w-[14%]" /> {/* Status */}
                <col className="w-[22%]" /> {/* Ações Centralizadas */}
              </colgroup>

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Objeto</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Tipo</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Local</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Data</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Status</th>
                  <th className="px-6 py-3 text-center text-gray-900 font-semibold">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredObjects.map((obj) => (
                  <tr key={obj.id} className="hover:bg-gray-50">

                    <td className="px-6 py-4 align-middle">
                      <div className="flex flex-col leading-tight">
                        <span className="text-gray-900 font-medium truncate" title={obj.name}>{obj.name}</span>
                        <span className="text-gray-500 text-sm whitespace-nowrap">
                          {obj.protocol}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 align-middle">
                      <Badge status={obj.type as any} className="whitespace-nowrap">
                        {obj.type === 'perdido' ? 'Perdido' : 'Encontrado'}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-gray-700 truncate align-middle" title={obj.location}>
                        {obj.location}
                    </td>

                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap align-middle">{obj.date}</td>

                    <td className="px-6 py-4 align-middle">
                      <Badge status={obj.status as any} className="whitespace-nowrap">
                        {obj.status === 'perdido' && 'Em aberto'}
                        {obj.status === 'em-processo' && 'Em processo'}
                        {obj.status === 'devolvido' && 'Devolvido'}
                      </Badge>
                    </td>

                    {/* AÇÕES CENTRALIZADAS */}
                    <td className="px-6 py-4 align-middle">
                      <div className="flex items-center justify-center gap-2 w-full">

                        <Button
                          size="sm"
                          variant="secondary"
                          className="whitespace-nowrap flex items-center gap-1"
                          onClick={() => onNavigate('object-detail')}
                        >
                          <Eye size={16} />
                          <span className="hidden xl:inline">Detalhes</span>
                          <span className="xl:hidden">Ver</span>
                        </Button>

                        {obj.status !== 'devolvido' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="!p-2 text-gray-600 hover:text-blue-600"
                            onClick={() => onNavigate('edit-object')}
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Button>
                        )}

                        <div className="relative">
                          <button
                            onClick={() => setShowMenu(showMenu === obj.id ? null : obj.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {showMenu === obj.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 text-left">
                              {obj.status !== 'devolvido' && (
                                <button
                                  onClick={() => setShowMenu(null)}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                                >
                                  <CheckCircle size={16} />
                                  Marcar como devolvido
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  setSelectedObject(obj.id);
                                  setShowDeleteModal(true);
                                  setShowMenu(null);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-[#DC2626]"
                              >
                                <Trash2 size={16} />
                                Excluir registro
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
        ) : (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">Nenhum objeto encontrado</h3>
            <p className="text-gray-600 mb-6">
              Você ainda não registrou nenhum objeto {activeTab !== 'todos' && `como ${activeTab}`}.
            </p>

            <div className="flex gap-3 justify-center">
              <Button variant="primary" onClick={() => onNavigate('register-lost')}>
                Registrar objeto perdido
              </Button>

              <Button variant="secondary" onClick={() => onNavigate('register-found')}>
                Registrar objeto encontrado
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        title="Excluir registro"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
              Excluir
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.
        </p>
      </Modal>
    </div>
  );
}