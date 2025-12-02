import React, { useState } from 'react';
import { Bell, User, LogOut, Settings, HelpCircle } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  userName?: string;
  onNavigate?: (screen: string) => void;
}

export function Header({ isLoggedIn = false, isAdmin = false, userName = '', onNavigate }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-20 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button onClick={() => onNavigate?.('home')} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H14M5 21H3M5 21H10M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14M9 8H10M9 12H10M14 8H15M14 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-gray-900">Achados UESC</span>
            </button>
            
            {isLoggedIn && (
              <nav className="flex items-center gap-6">
                <button 
                  onClick={() => onNavigate?.('register-lost')}
                  className="text-gray-700 hover:text-[#2563EB] transition-colors"
                >
                  Perdi um objeto
                </button>
                <button 
                  onClick={() => onNavigate?.('register-found')}
                  className="text-gray-700 hover:text-[#2563EB] transition-colors"
                >
                  Encontrei um objeto
                </button>
                <button 
                  onClick={() => onNavigate?.('search')}
                  className="text-gray-700 hover:text-[#2563EB] transition-colors"
                >
                  Buscar objetos
                </button>
                <button 
                  onClick={() => onNavigate?.('my-objects')}
                  className="text-gray-700 hover:text-[#2563EB] transition-colors"
                >
                  Meus objetos
                </button>
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button className="relative p-2 text-gray-700 hover:text-[#2563EB] rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full"></span>
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    {isAdmin && (
                      <span className="text-sm text-gray-600">Administrador</span>
                    )}
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <button 
                        onClick={() => {
                          onNavigate?.('profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                      >
                        <User size={16} />
                        Perfil
                      </button>
                      <button 
                        onClick={() => {
                          onNavigate?.('profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                      >
                        <Settings size={16} />
                        Configurações
                      </button>
                      <button 
                        onClick={() => {
                          onNavigate?.('help');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                      >
                        <HelpCircle size={16} />
                        Ajuda
                      </button>
                      <hr className="my-2 border-gray-200" />
                      <button 
                        onClick={() => {
                          onNavigate?.('landing');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-[#DC2626]"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate?.('signup')}
                  className="px-5 py-2.5 text-gray-700 hover:text-[#2563EB] transition-colors"
                >
                  Criar conta
                </button>
                <button 
                  onClick={() => onNavigate?.('login')}
                  className="px-5 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
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
