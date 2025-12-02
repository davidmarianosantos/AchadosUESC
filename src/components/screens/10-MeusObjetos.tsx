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

export function MeusObjetos({ onNavigate }: MeusObjetosProps) {
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
      date: '30/11/2024',
      status: 'perdido',
      protocol: '#12345'
    },
    {
      id: 2,
      name: 'Chave de carro Toyota',
      type: 'perdido',
      location: 'Estacionamento',
      date: '29/11/2024',
      status: 'perdido',
      protocol: '#12344'
    },
    {
      id: 3,
      name: 'Caderno de Física',
      type: 'encontrado',
      location: 'CEU',
      date: '28/11/2024',
      status: 'devolvido',
      protocol: '#12343'
    },
    {
      id: 4,
      name: 'Fone de ouvido',
      type: 'perdido',
      location: 'Cantina',
      date: '27/11/2024',
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
      
      <div className="max-w-[1200px] mx-auto px-20 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-gray-900">Meus objetos</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'perdidos', label: 'Perdidos' },
            { id: 'encontrados', label: 'Encontrados' }
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
        
        {filteredObjects.length > 0 ? (
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900">Nome do objeto</th>
                  <th className="px-6 py-4 text-left text-gray-900">Tipo</th>
                  <th className="px-6 py-4 text-left text-gray-900">Local</th>
                  <th className="px-6 py-4 text-left text-gray-900">Data</th>
                  <th className="px-6 py-4 text-left text-gray-900">Status</th>
                  <th className="px-6 py-4 text-right text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredObjects.map((obj) => (
                  <tr key={obj.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">{obj.name}</p>
                        <p className="text-gray-500 text-sm">Protocolo: {obj.protocol}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={obj.type === 'perdido' ? 'perdido' : 'encontrado'}>
                        {obj.type === 'perdido' ? 'Perdido' : 'Encontrado'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {obj.location}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {obj.date}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={obj.status as any}>
                        {obj.status === 'perdido' && 'Em aberto'}
                        {obj.status === 'em-processo' && 'Em processo'}
                        {obj.status === 'devolvido' && 'Devolvido'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onNavigate('object-detail')}
                        >
                          Ver detalhes
                        </Button>
                        {obj.status !== 'devolvido' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onNavigate('edit-object')}
                          >
                            <Edit size={16} />
                          </Button>
                        )}
                        <div className="relative">
                          <button
                            onClick={() => setShowMenu(showMenu === obj.id ? null : obj.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical size={16} className="text-gray-600" />
                          </button>
                          {showMenu === obj.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                              {obj.status !== 'devolvido' && (
                                <button
                                  onClick={() => {
                                    setShowMenu(null);
                                  }}
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
              Use os botões acima para começar.
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
      
      {/* Modal de exclusão */}
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
