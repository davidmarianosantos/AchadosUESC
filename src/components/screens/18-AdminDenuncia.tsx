import React, { useState } from 'react';
import { Header } from '../Header';
import { AdminSidebar } from '../AdminSidebar';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { AlertTriangle, Calendar, User, ExternalLink } from 'lucide-react';
import { Toast } from '../ui/Toast';

interface AdminDenunciaProps {
  onNavigate: (screen: string) => void;
}

export function AdminDenuncia({ onNavigate }: AdminDenunciaProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState<'keep' | 'remove' | 'block' | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  const report = {
    id: '0001',
    date: '30/11/2025, 10:45',
    reporter: {
      name: 'Pedro Santos',
      email: 'pedro.santos@uesc.br',
      type: 'Aluno'
    },
    object: {
      id: 12340,
      name: 'Carteira de couro preta',
      category: 'Acessórios',
      type: 'Encontrado',
      location: 'Biblioteca Central',
      date: '30/11/2025',
      status: 'perdido',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
      owner: {
        name: 'João Silva',
        email: 'joao.silva@uesc.br',
        type: 'Aluno'
      }
    },
    reason: 'Suspeito que este objeto já foi devolvido e o usuário não atualizou o status. Vi pessoalmente a pessoa retirando esta carteira na segurança há 3 dias, mas o registro continua ativo no sistema.'
  };
  
  const handleAction = (type: 'keep' | 'remove' | 'block') => {
    setActionType(type);
    setShowConfirmModal(true);
  };
  
  const confirmAction = () => {
    setShowConfirmModal(false);
    setShowToast(true);
    setTimeout(() => {
      onNavigate('admin-dashboard');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn isAdmin userName="Admin" onNavigate={onNavigate} />
      
      <div className="flex">
        <AdminSidebar activeScreen="admin-report-detail" onNavigate={onNavigate} />
        
        <main className="flex-1 p-8">
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Voltar
            </button>
            <h1 className="text-gray-900">Denúncia #{report.id}</h1>
          </div>
          
          {/* Info da denúncia */}
          <Card className="p-6 mb-6 bg-red-50 border-red-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={24} className="text-[#DC2626]" />
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 mb-2">Informações da denúncia</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Denunciante</p>
                    <p className="text-gray-900">{report.reporter.name}</p>
                    <p className="text-gray-600 text-xs">{report.reporter.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Data da denúncia</p>
                    <p className="text-gray-900">{report.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Coluna principal */}
            <div className="col-span-2 space-y-6">
              {/* Objeto denunciado */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-gray-900">Detalhes do objeto denunciado</h2>
                  <button
                    onClick={() => onNavigate('object-detail')}
                    className="flex items-center gap-1 text-[#2563EB] hover:underline text-sm"
                  >
                    Ver objeto completo
                    <ExternalLink size={14} />
                  </button>
                </div>
                
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={report.object.image}
                    alt={report.object.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900 mb-1">{report.object.name}</p>
                        <p className="text-gray-600 text-sm">Protocolo: #{report.object.id}</p>
                      </div>
                      <Badge status={report.object.status as any}>Em aberto</Badge>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Tipo:</span>
                        <Badge status="encontrado">{report.object.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Categoria:</span>
                        <span className="text-gray-900">{report.object.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Local:</span>
                        <span className="text-gray-900">{report.object.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Data de registro:</span>
                        <span className="text-gray-900">{report.object.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Registrado por:</span>
                        <span className="text-gray-900">{report.object.owner.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Motivo da denúncia */}
              <Card className="p-6">
                <h2 className="text-gray-900 mb-4">Motivo da denúncia</h2>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{report.reason}</p>
                </div>
              </Card>
            </div>
            
            {/* Ações do administrador */}
            <div className="col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-gray-900 mb-6">Ações do administrador</h2>
                
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    className="w-full justify-center"
                    onClick={() => handleAction('keep')}
                  >
                    Manter registro
                  </Button>
                  
                  <Button
                    variant="secondary"
                    className="w-full justify-center"
                    onClick={() => onNavigate('edit-object')}
                  >
                    Editar registro
                  </Button>
                  
                  <Button
                    variant="danger"
                    className="w-full justify-center"
                    onClick={() => handleAction('remove')}
                  >
                    Remover registro
                  </Button>
                  
                  <hr className="border-gray-200 my-4" />
                  
                  <Button
                    variant="danger"
                    className="w-full justify-center"
                    onClick={() => handleAction('block')}
                  >
                    Bloquear usuário
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Atenção:</strong> Ações destrutivas não podem ser desfeitas. 
                    Revise cuidadosamente antes de confirmar.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      {/* Modal de confirmação */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar ação"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmAction}>
              Confirmar
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          {actionType === 'keep' && 'Deseja manter este registro sem alterações e arquivar a denúncia?'}
          {actionType === 'remove' && 'Tem certeza que deseja remover este registro? Esta ação não pode ser desfeita.'}
          {actionType === 'block' && 'Tem certeza que deseja bloquear este usuário? Ele não poderá mais acessar o sistema.'}
        </p>
      </Modal>
      
      {showToast && (
        <Toast
          type="success"
          message="Ação realizada com sucesso!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
