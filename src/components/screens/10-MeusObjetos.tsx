import React, { useState } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { MoreVertical, Edit, Trash2, CheckCircle, Search } from 'lucide-react';

interface MeusObjetosProps {
  onNavigate: (screen: string) => void;
}

export function MeusObjetos({ onNavigate }: MeuesObjetosProps) {
  const [activeTab, setActiveTab] = useState<'todos' | 'perdidos' | 'encontrados'>('todos');
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedObject, setSelectedObject] = useState<number | null>(null);

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
    setShowDeleteModal(false);
    setSelectedObject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />

      {/* AUMENTEI A LARGURA TOTAL */}
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
          <Card className="overflow-hidden">

            {/* TABLE FIXA E LARGA */}
            <table className="w-full table-fixed">

              <colgroup>
                <col className="w-[28%]" />
                <col className="w-[12%]" />
                <col className="w-[20%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[12%]" />
              </colgroup>

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900">Objeto</th>
                  <th className="px-6 py-3 text-left text-gray-900">Tipo</th>
                  <th className="px-6 py-3 text-left text-gray-900">Local</th>
                  <th className="px-6 py-3 text-left text-gray-900">Data</th>
                  <th className="px-6 py-3 text-left text-gray-900">Status</th>
                  <th className="px-6 py-3 text-right text-gray-900">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredObjects.map((obj) => (
                  <tr key={obj.id} className="hover:bg-gray-50">

                    {/* OBJETO */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col leading-tight">
                        <span className="text-gray-900 whitespace-nowrap">{obj.name}</span>
                        <span className="text-gray-500 text-sm whitespace-nowrap">
                          {obj.protocol}
                        </span>
                      </div>
                    </td>

                    {/* TIPO */}
                    <td className="px-6 py-4">
                      <Badge status={obj.type} className="px-3 py-1 text-sm whitespace-nowrap">
                        {obj.type === 'perdido' ? 'Perdido' : 'Encontrado'}
                      </Badge>
                    </td>

                    {/* LOCAL */}
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{obj.location}</td>

                    {/* DATA */}
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{obj.date}</td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <Badge status={obj.status} className="px-3 py-1 text-sm whitespace-nowrap">
                        {obj.status === 'perdido' && 'Em aberto'}
                        {obj.status === 'em-processo' && 'Em processo'}
                        {obj.status === 'devolvido' && 'Devolvido'}
                      </Badge>
                    </td>

                    {/* AÇÕES */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">

                        <Button
                          size="sm"
                          variant="secondary"
                          className="whitespace-nowrap"
                          onClick={() => onNavigate('object-detail')}
                        >
                          Ver detalhes
                        </Button>

                        {obj.status !== 'devolvido' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="!p-2"
                            onClick={() => onNavigate('edit-object')}
                          >
                            <Edit size={18} />
                          </Button>
                        )}

                        {/* MENU */}
                        <div className="relative">
                          <button
                            onClick={() => setShowMenu(showMenu === obj.id ? null : obj.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>

                          {showMenu === obj.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">

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

      {/* MODAL */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Excluir registro"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
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
