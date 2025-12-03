import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, HelpCircle, X, Check, MessageCircle } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  userName?: string;
  onNavigate?: (screen: string) => void;
}

export function Header({ isLoggedIn = false, isAdmin = false, userName = '', onNavigate }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Ref para fechar ao clicar fora
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Mock de notificações
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Correspondência encontrada!', text: 'Um objeto similar à sua "Carteira" foi encontrado na Biblioteca.', time: 'Há 5 min', unread: true, type: 'match' },
    { id: 2, title: 'Nova mensagem', text: 'Maria Silva enviou uma pergunta sobre o caderno.', time: 'Há 1 hora', unread: true, type: 'message' },
    { id: 3, title: 'Objeto aprovado', text: 'Seu registro #12345 foi publicado com sucesso.', time: 'Há 3 horas', unread: false, type: 'system' }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Fecha os menus ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo e Navegação Principal */}
          <div className="flex items-center gap-4 md:gap-12">
            <button onClick={() => onNavigate?.('home')} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center text-white group-hover:bg-[#1D4ED8] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H14M5 21H3M5 21H10M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14M9 8H10M9 12H10M14 8H15M14 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-gray-900 font-medium hidden md:block">Achados UESC</span>
            </button>
            
            {isLoggedIn && (
              <nav className="hidden lg:flex items-center gap-6">
                <button onClick={() => onNavigate?.('register-lost')} className="text-gray-600 hover:text-[#2563EB] text-sm font-medium transition-colors">Perdi algo</button>
                <button onClick={() => onNavigate?.('register-found')} className="text-gray-600 hover:text-[#2563EB] text-sm font-medium transition-colors">Encontrei algo</button>
                <button onClick={() => onNavigate?.('search')} className="text-gray-600 hover:text-[#2563EB] text-sm font-medium transition-colors">Buscar</button>
                <button onClick={() => onNavigate?.('my-objects')} className="text-gray-600 hover:text-[#2563EB] text-sm font-medium transition-colors">Meus objetos</button>
              </nav>
            )}
          </div>
          
          {/* Área do Usuário */}
          <div className="flex items-center gap-2 md:gap-3">
            {isLoggedIn ? (
              <>
                {/* --- BOTÃO DE MENSAGENS (NOVO) --- */}
                <button 
                  onClick={() => onNavigate?.('messages')}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 hover:text-[#2563EB] rounded-lg transition-colors"
                  title="Mensagens"
                >
                  <MessageCircle size={20} />
                  {/* Bolinha de notificação fake para dar vida ao protótipo */}
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#DC2626] border-2 border-white rounded-full"></span>
                </button>

                {/* --- NOTIFICAÇÕES --- */}
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowUserMenu(false);
                    }}
                    className={`relative p-2 rounded-lg transition-colors ${showNotifications ? 'bg-blue-50 text-[#2563EB]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#2563EB]'}`}
                    title="Notificações"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#DC2626] border-2 border-white rounded-full"></span>
                    )}
                  </button>

                  {/* Dropdown de Notificações */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-semibold text-gray-900">Notificações</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAsRead} className="text-xs text-[#2563EB] hover:underline flex items-center gap-1">
                            <Check size={12} /> Marcar lidas
                          </button>
                        )}
                      </div>
                      
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id} 
                              className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50/30' : ''}`}
                              onClick={() => {
                                if(notif.type === 'message') onNavigate?.('messages');
                                else if(notif.type === 'match') onNavigate?.('object-detail');
                                setShowNotifications(false);
                              }}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className={`text-sm font-medium ${notif.unread ? 'text-[#2563EB]' : 'text-gray-900'}`}>
                                  {notif.title}
                                </span>
                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2">{notif.text}</p>
                              {notif.unread && (
                                <div className="mt-2 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full"></span>
                                  <span className="text-xs text-[#2563EB] font-medium">Não lida</span>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500">
                            <Bell size={24} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Nenhuma notificação nova</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-2 border-t border-gray-100 bg-gray-50/50 text-center">
                        <button className="text-xs text-gray-600 hover:text-[#2563EB] font-medium transition-colors">
                          Ver histórico completo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* --- MENU DO USUÁRIO --- */}
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                      setShowNotifications(false);
                    }}
                    className={`flex items-center gap-2 p-1.5 pl-2 pr-2 rounded-lg transition-colors border ${showUserMenu ? 'bg-gray-100 border-gray-300' : 'border-transparent hover:bg-gray-100'}`}
                  >
                    <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white shadow-sm">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    {isAdmin ? (
                      <div className="hidden md:flex flex-col items-start leading-none">
                        <span className="text-xs font-semibold text-gray-700">Admin</span>
                        <span className="text-[10px] text-gray-500">Gestor</span>
                      </div>
                    ) : (
                      <div className="hidden md:block">
                        <span className="text-sm font-medium text-gray-700">{userName.split(' ')[0]}</span>
                      </div>
                    )}
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100 md:hidden">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500 truncate">usuario@uesc.br</p>
                      </div>

                      {/* Adicionei Mensagens aqui também para acesso mobile fácil */}
                      <button 
                        onClick={() => { onNavigate?.('messages'); setShowUserMenu(false); }}
                        className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 text-sm md:hidden"
                      >
                        <MessageCircle size={16} />
                        Mensagens
                      </button>

                      <button 
                        onClick={() => { onNavigate?.('profile'); setShowUserMenu(false); }}
                        className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 text-sm"
                      >
                        <User size={16} />
                        Perfil e Configurações
                      </button>

                      <button 
                        onClick={() => { onNavigate?.('help'); setShowUserMenu(false); }}
                        className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 text-sm"
                      >
                        <HelpCircle size={16} />
                        Ajuda e Suporte
                      </button>
                      
                      <div className="my-1 border-t border-gray-100"></div>
                      
                      <button 
                        onClick={() => { onNavigate?.('landing'); setShowUserMenu(false); }}
                        className="w-full px-4 py-2.5 text-left hover:bg-red-50 flex items-center gap-3 text-[#DC2626] text-sm font-medium"
                      >
                        <LogOut size={16} />
                        Sair da conta
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate?.('signup')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2563EB] transition-colors"
                >
                  Criar conta
                </button>
                <button 
                  onClick={() => onNavigate?.('login')}
                  className="px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-sm shadow-blue-200"
                >
                  Entrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}