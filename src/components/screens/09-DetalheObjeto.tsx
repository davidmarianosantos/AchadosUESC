import React, { useState } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Toast } from '../ui/Toast';
import { MapPin, Clock, AlertTriangle, MessageCircle } from 'lucide-react';
import { Input } from '../ui/Input';

interface DetalheObjetoProps {
  onNavigate: (screen: string) => void;
}

export function DetalheObjeto({ onNavigate }: DetalheObjetoProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportTouched, setReportTouched] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const object = {
    name: 'Carteira de couro preta',
    category: 'Acessórios',
    protocol: '#12345',
    date: '30/11/2025',
    time: '14:30',
    location: 'Biblioteca Central',
    locationDetail: 'Próximo ao balcão de empréstimos, segundo andar',
    type: 'encontrado',
    status: 'perdido',
    currentLocation: 'Entregue na segurança',
    description:
      'Carteira de couro sintético na cor preta. Possui compartimento para moedas com zíper dourado. Tem um pequeno arranhão no canto inferior direito. Não possui documentos dentro, apenas alguns cartões de transporte.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
      'https://images.unsplash.com/photo-1614260937560-c749cc17da94?w=800'
    ],
    timeline: [
      { event: 'Registrado como objeto encontrado', date: '30/11/2025, 14:35' },
      { event: 'Correspondência sugerida para 2 usuários', date: '30/11/2025, 14:36' },
      { event: 'Usuário Maria Silva iniciou contato', date: '30/11/2025, 15:20' }
    ]
  };

  // IMAGEM PRINCIPAL CONTROLADA
  const [selectedImage, setSelectedImage] = useState(object.images[0]);

  const handleSendReport = () => {
    setReportTouched(true);
    if (!reportReason.trim()) return;

    console.log("Denúncia enviada:", reportReason);

    setShowReportModal(false);
    setReportReason('');
    setReportTouched(false);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const reportError = reportTouched && reportReason.trim().length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />

      {showToast && (
        <Toast
          type="success"
          message="Denúncia enviada com sucesso. Nossa equipe irá revisar o registro."
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="max-w-[1200px] mx-auto px-20 py-12">
        <div className="grid grid-cols-3 gap-8">

          {/* COLUNA ESQUERDA */}
          <div className="col-span-2">

            {/* IMAGEM PRINCIPAL */}
            <Card className="overflow-hidden mb-6">
              <div className="aspect-video bg-gray-200">
                <img
                  src={selectedImage}
                  alt={object.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* MINIATURAS */}
              {object.images.length > 1 && (
                <div className="p-4 flex gap-3">
                  {object.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 
                      ${selectedImage === img ? 'border-blue-600' : 'border-transparent'} 
                      hover:border-blue-400`}
                    >
                      <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge status={object.status as any} className="mb-3">
                    {object.type === 'encontrado' ? 'Objeto encontrado' : 'Objeto perdido'}
                  </Badge>
                  <h1 className="text-gray-900 mb-2">{object.name}</h1>
                  <p className="text-gray-600">Categoria: {object.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Protocolo</p>
                  <p className="text-gray-900">{object.protocol}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-1">Data de registro</p>
                  <p className="text-gray-900">{object.date} às {object.time}</p>
                </div>

                <div className="col-span-2">
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-gray-600 text-sm">
                        Local {object.type === 'encontrado' ? 'encontrado' : 'provável da perda'}
                      </p>
                      <p className="text-gray-900">{object.location}</p>

                      {object.locationDetail && (
                        <p className="text-gray-600 text-sm mt-1">
                          {object.locationDetail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {object.type === 'encontrado' && (
                  <div className="col-span-2">
                    <p className="text-gray-600 text-sm mb-1">Objeto está em</p>
                    <p className="text-gray-900">{object.currentLocation}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">{object.description}</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Histórico de status</h3>

              <div className="space-y-4">
                {object.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock size={16} className="text-blue-600" />
                      </div>
                      {idx < object.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>

                    <div className="flex-1 pb-6">
                      <p className="text-gray-900">{item.event}</p>
                      <p className="text-gray-500 text-sm mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* COLUNA DIREITA */}
          <div className="col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-gray-900 mb-4">Informações de contato</h3>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  O contato será realizado por mensagens internas. Seus dados pessoais serão preservados.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => onNavigate('messages')}
                >
                  <MessageCircle size={18} />
                  Acho que este objeto é meu
                </Button>
              </div>

              <hr className="border-gray-200 my-6" />

              <button
                onClick={() => {
                  setReportTouched(false);
                  setReportReason('');
                  setShowReportModal(true);
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm"
              >
                <AlertTriangle size={16} />
                Denunciar este registro
              </button>
            </Card>
          </div>
        </div>
      </div>

      {/* MODAL DE DENÚNCIA */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Denunciar registro"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowReportModal(false)}>
              Cancelar
            </Button>

            <Button
              variant="danger"
              disabled={!reportReason.trim()}
              onClick={handleSendReport}
            >
              Enviar denúncia
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Por favor, descreva o motivo da denúncia. Nossa equipe irá revisar este registro.
          </p>

          <Input
            label="Motivo da denúncia"
            multiline
            rows={4}
            placeholder="Descreva o problema..."
            value={reportReason}
            onChange={(e) => {
              setReportReason(e.target.value);
              setReportTouched(true);
            }}
            error={reportError ? "Por favor, preencha o motivo da denúncia." : undefined}
          />
        </div>
      </Modal>

    </div>
  );
}
