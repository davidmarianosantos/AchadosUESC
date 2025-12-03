import React, { useState, useRef } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Search, Send, Paperclip, ExternalLink, Info } from 'lucide-react';

interface MensagensProps {
  onNavigate: (screen: string) => void;
}

export function Mensagens({ onNavigate }: MensagensProps) {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSending, setIsSending] = useState(false); // Estado de loading

  // 📎 Estado do arquivo anexado
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 📌 Lista de conversas
  const conversations = [
    {
      id: 1,
      objectName: 'Carteira de couro preta',
      objectImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100',
      lastMessage: 'Sim, acredito que seja minha! Quando posso...',
      time: '10:30',
      unread: 2
    },
    {
      id: 2,
      objectName: 'Mochila azul marinho',
      objectImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100',
      lastMessage: 'Obrigado pela informação!',
      time: 'Ontem',
      unread: 0
    },
    {
      id: 3,
      objectName: 'Fone de ouvido Bluetooth',
      objectImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
      lastMessage: 'Você pode me enviar mais fotos?',
      time: '28/11',
      unread: 1
    }
  ];

  // 📌 Histórico separado por conversa
  const chatMessages: Record<number, any[]> = {
    1: [
      { id: 1, sender: 'other', senderName: 'Maria Silva', text: 'Olá! Vi que você encontrou uma carteira preta. Acredito que seja a minha!', time: '10:15' },
      { id: 2, sender: 'me', text: 'Olá, Maria! Para confirmar, pode me dizer o que tinha dentro?', time: '10:18' },
      { id: 3, sender: 'other', senderName: 'Maria Silva', text: 'Cartões e um comprovante. Zíper dourado.', time: '10:25' },
      { id: 4, sender: 'me', text: 'Perfeito! Está na segurança da biblioteca.', time: '10:28' }
    ],
    2: [
      { id: 1, sender: 'other', senderName: 'Carlos Pereira', text: 'Obrigado por avisar sobre a mochila!', time: 'Ontem' },
      { id: 2, sender: 'me', text: 'Disponha! Ela está na cantina do Adonias.', time: 'Ontem' }
    ],
    3: [
      { id: 1, sender: 'other', senderName: 'Fernanda Rocha', text: 'Você pode me enviar mais fotos do fone?', time: '28/11' }
    ]
  };

  const filteredConversations = conversations.filter((c) =>
    c.objectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMessages = chatMessages[selectedConversation];

  // 📩 Enviar mensagem com Delay
  const handleSend = () => {
    if ((!newMessage.trim() && !attachedFile) || isSending) return;

    setIsSending(true);

    setTimeout(() => {
      currentMessages.push({
        id: currentMessages.length + 1,
        sender: 'me',
        text: newMessage.trim() || '(Arquivo enviado)',
        file: attachedFile || null,
        time: 'Agora'
      });

      setNewMessage('');
      setAttachedFile(null);
      setIsSending(false);
    }, 1000); // 1 segundo de "envio"
  };

  // 📎 Abrir seletor de arquivos
  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  // 📎 Receber arquivo selecionado
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />

      <div className="max-w-[1440px] mx-auto px-20 py-8">
        <div className="h-[calc(100vh-180px)]">
          <Card className="h-full flex overflow-hidden">

            {/* ---------------- LISTA DE CONVERSAS ---------------- */}
            <div className="w-96 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-gray-900 mb-4">Mensagens</h2>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar conversa por objeto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      selectedConversation === conv.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <img src={conv.objectImage} className="w-12 h-12 rounded-lg object-cover" />

                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-gray-900 truncate pr-2">{conv.objectName}</p>
                        <span className="text-gray-500 text-xs">{conv.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm truncate">{conv.lastMessage}</p>
                    </div>

                    {conv.unread > 0 && (
                      <div className="w-5 h-5 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-xs">
                        {conv.unread}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ---------------- ÁREA DE MENSAGENS ---------------- */}
            <div className="flex-1 flex flex-col">

              {/* Header da conversa */}
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <img
                  src={conversations.find(c => c.id === selectedConversation)?.objectImage}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="text-gray-900">
                    {conversations.find(c => c.id === selectedConversation)?.objectName}
                  </p>
                  <button
                    onClick={() => onNavigate('object-detail')}
                    className="flex items-center gap-1 text-[#2563EB] text-sm hover:underline"
                  >
                    Ver detalhes do objeto <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* Aviso */}
              <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-start gap-2">
                <Info size={18} className="text-[#F59E0B]" />
                <p className="text-sm text-gray-700">
                  Não compartilhe dados pessoais sensíveis. Combine a retirada apenas em áreas seguras do campus.
                </p>
              </div>

              {/* Lista de mensagens */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[70%]">
                      {msg.sender === 'other' && (
                        <p className="text-xs text-gray-600 mb-1 px-1">{msg.senderName}</p>
                      )}

                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.sender === 'me'
                            ? 'bg-[#2563EB] text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                        }`}
                      >
                        {msg.file ? (
                          <p className="underline cursor-pointer">{msg.file.name}</p>
                        ) : (
                          <p>{msg.text}</p>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 mt-1 px-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Campo de envio */}
              <div className="p-4 border-t border-gray-200 flex items-center gap-3">

                {/* 📎 Botão do clipe */}
                <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={handleAttach}>
                  <Paperclip size={20} className="text-gray-600" />
                </button>

                {/* input invisível */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelected}
                  className="hidden"
                />

                {attachedFile && (
                  <span className="text-sm text-gray-600">
                    📎 {attachedFile.name}
                  </span>
                )}

                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none"
                  rows={2}
                  disabled={isSending}
                />

                <Button 
                  variant="primary" 
                  onClick={handleSend} 
                  disabled={(!newMessage.trim() && !attachedFile) || isSending}
                  isLoading={isSending}
                >
                  {!isSending && <Send size={18} />} {!isSending && 'Enviar'}
                </Button>
              </div>

            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}