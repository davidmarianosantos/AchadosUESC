import React, { useState } from 'react';
import { Header } from '../Header';
import { AdminSidebar } from '../AdminSidebar';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Search, MoreVertical, UserX, UserCheck, Eye } from 'lucide-react';

interface AdminUsuariosProps {
  onNavigate: (screen: string) => void;
}

export function AdminUsuarios({ onNavigate }: AdminUsuariosProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const users = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@uesc.br',
      type: 'Aluno',
      objectsLost: 3,
      objectsFound: 5,
      status: 'ativa'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@uesc.br',
      type: 'Professor',
      objectsLost: 1,
      objectsFound: 2,
      status: 'ativa'
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@uesc.br',
      type: 'Aluno',
      objectsLost: 2,
      objectsFound: 0,
      status: 'ativa'
    },
    {
      id: 4,
      name: 'Ana Costa',
      email: 'ana.costa@uesc.br',
      type: 'Servidor técnico-administrativo',
      objectsLost: 0,
      objectsFound: 8,
      status: 'ativa'
    },
    {
      id: 5,
      name: 'Carlos Ferreira',
      email: 'carlos.ferreira@uesc.br',
      type: 'Aluno',
      objectsLost: 4,
      objectsFound: 1,
      status: 'bloqueada'
    },
    {
      id: 6,
      name: 'Juliana Lima',
      email: 'juliana.lima@uesc.br',
      type: 'Aluno',
      objectsLost: 1,
      objectsFound: 3,
      status: 'ativa'
    }
  ];
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleBlockToggle = (user: any) => {
    setSelectedUser(user);
    setShowBlockModal(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn isAdmin userName="Admin" onNavigate={onNavigate} />
      
      <div className="flex">
        <AdminSidebar activeScreen="admin-users" onNavigate={onNavigate} />
        
        <main className="flex-1 p-8">
          <h1 className="text-gray-900 mb-8">Gestão de Usuários</h1>
          
          {/* Busca */}
          <Card className="p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 outline-none"
              />
            </div>
          </Card>
          
          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card className="p-5">
              <p className="text-gray-600 text-sm mb-1">Total de usuários</p>
              <p className="text-gray-900 text-3xl">{users.length}</p>
            </Card>
            <Card className="p-5">
              <p className="text-gray-600 text-sm mb-1">Contas ativas</p>
              <p className="text-gray-900 text-3xl">{users.filter(u => u.status === 'ativa').length}</p>
            </Card>
            <Card className="p-5">
              <p className="text-gray-600 text-sm mb-1">Contas bloqueadas</p>
              <p className="text-gray-900 text-3xl">{users.filter(u => u.status === 'bloqueada').length}</p>
            </Card>
            <Card className="p-5">
              <p className="text-gray-600 text-sm mb-1">Novos este mês</p>
              <p className="text-gray-900 text-3xl">8</p>
            </Card>
          </div>
          
          {/* Tabela */}
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900">Nome</th>
                  <th className="px-6 py-4 text-left text-gray-900">E-mail</th>
                  <th className="px-6 py-4 text-left text-gray-900">Tipo de vínculo</th>
                  <th className="px-6 py-4 text-center text-gray-900">Perdidos</th>
                  <th className="px-6 py-4 text-center text-gray-900">Encontrados</th>
                  <th className="px-6 py-4 text-left text-gray-900">Status</th>
                  <th className="px-6 py-4 text-right text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {user.type}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-900">
                      {user.objectsLost}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-900">
                      {user.objectsFound}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={user.status === 'ativa' ? 'devolvido' : 'arquivado'}>
                        {user.status === 'ativa' ? 'Ativa' : 'Bloqueada'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="secondary">
                          <Eye size={16} />
                          Ver detalhes
                        </Button>
                        <div className="relative">
                          <button
                            onClick={() => setShowMenu(showMenu === user.id ? null : user.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical size={16} className="text-gray-600" />
                          </button>
                          {showMenu === user.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                              <button
                                onClick={() => {
                                  handleBlockToggle(user);
                                  setShowMenu(null);
                                }}
                                className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
                                  user.status === 'ativa' ? 'text-[#DC2626]' : 'text-[#16A34A]'
                                }`}
                              >
                                {user.status === 'ativa' ? (
                                  <>
                                    <UserX size={16} />
                                    Bloquear usuário
                                  </>
                                ) : (
                                  <>
                                    <UserCheck size={16} />
                                    Desbloquear usuário
                                  </>
                                )}
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
      
      {/* Modal de bloqueio/desbloqueio */}
      <Modal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        title={selectedUser?.status === 'ativa' ? 'Bloquear usuário' : 'Desbloquear usuário'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowBlockModal(false)}>
              Cancelar
            </Button>
            <Button
              variant={selectedUser?.status === 'ativa' ? 'danger' : 'primary'}
              onClick={() => setShowBlockModal(false)}
            >
              Confirmar
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          {selectedUser?.status === 'ativa' ? (
            <>
              Tem certeza que deseja bloquear <strong>{selectedUser?.name}</strong>? 
              O usuário não poderá mais acessar o sistema.
            </>
          ) : (
            <>
              Tem certeza que deseja desbloquear <strong>{selectedUser?.name}</strong>? 
              O usuário voltará a ter acesso ao sistema.
            </>
          )}
        </p>
      </Modal>
    </div>
  );
}
