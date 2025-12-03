import React, { useState, useEffect } from 'react';

// Telas públicas
import { Landing } from './components/screens/01-Landing';
import { Login } from './components/screens/02-Login';
import { Cadastro } from './components/screens/03-Cadastro';
import { RecuperarSenha } from './components/screens/04-RecuperarSenha';

// Telas de usuário
import { Dashboard } from './components/screens/05-Dashboard';
import { RegistrarEncontrado } from './components/screens/06-RegistrarEncontrado';
import { RegistrarPerdido } from './components/screens/07-RegistrarPerdido';
import { BuscarObjetos } from './components/screens/08-BuscarObjetos';
import { DetalheObjeto } from './components/screens/09-DetalheObjeto';
import { MeusObjetos } from './components/screens/10-MeusObjetos';
import { Mensagens } from './components/screens/11-Mensagens';
import { EditarObjeto } from './components/screens/12-EditarObjeto';
import { Perfil } from './components/screens/13-Perfil';
import { Ajuda } from './components/screens/14-Ajuda';
import { Onboarding } from './components/screens/15-Onboarding';

// Telas de admin
import { AdminDashboard } from './components/screens/16-AdminDashboard';
import { AdminObjetos } from './components/screens/17-AdminObjetos';
import { AdminDenuncia } from './components/screens/18-AdminDenuncia';
import { AdminRelatorios } from './components/screens/19-AdminRelatorios';
import { AdminUsuarios } from './components/screens/20-AdminUsuarios';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');

  // 1. Função inteligente de navegação
  // Ela atualiza o React E avisa o navegador (cria histórico)
  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    // Adiciona uma entrada no histórico do navegador
    // Isso cria URLs como: http://localhost:5173/?screen=dashboard
    window.history.pushState({ screen }, '', `?screen=${screen}`);
    window.scrollTo(0, 0); // Rola para o topo ao trocar de tela
  };

  // 2. Escuta o botão "Voltar" do navegador
  useEffect(() => {
    // Se o usuário recarregar a página, lê a URL para saber onde estava
    const params = new URLSearchParams(window.location.search);
    const initialScreen = params.get('screen');
    if (initialScreen) {
      setCurrentScreen(initialScreen);
    }

    // Função que roda quando o usuário clica em "Voltar" ou "Avançar"
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.screen) {
        setCurrentScreen(event.state.screen);
      } else {
        // Se acabou o histórico do app, volta para a landing
        setCurrentScreen('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const screens: Record<string, React.ReactNode> = {
    // Públicas (01-04)
    'landing': <Landing onNavigate={handleNavigate} />,
    'login': <Login onNavigate={handleNavigate} />,
    'signup': <Cadastro onNavigate={handleNavigate} />,
    'forgot-password': <RecuperarSenha onNavigate={handleNavigate} />,
    
    // Usuário (05-15)
    'dashboard': <Dashboard onNavigate={handleNavigate} />,
    'home': <Dashboard onNavigate={handleNavigate} />,
    'register-found': <RegistrarEncontrado onNavigate={handleNavigate} />,
    'register-lost': <RegistrarPerdido onNavigate={handleNavigate} />,
    'search': <BuscarObjetos onNavigate={handleNavigate} />,
    'object-detail': <DetalheObjeto onNavigate={handleNavigate} />,
    'my-objects': <MeusObjetos onNavigate={handleNavigate} />,
    'messages': <Mensagens onNavigate={handleNavigate} />,
    'edit-object': <EditarObjeto onNavigate={handleNavigate} />,
    'profile': <Perfil onNavigate={handleNavigate} />,
    'help': <Ajuda onNavigate={handleNavigate} />,
    'onboarding': <Onboarding onNavigate={handleNavigate} />,
    
    // Admin (16-20)
    'admin-dashboard': <AdminDashboard onNavigate={handleNavigate} />,
    'admin-objects': <AdminObjetos onNavigate={handleNavigate} />,
    'admin-report-detail': <AdminDenuncia onNavigate={handleNavigate} />,
    'admin-reports': <AdminRelatorios onNavigate={handleNavigate} />,
    'admin-users': <AdminUsuarios onNavigate={handleNavigate} />,
    'admin-reports-list': <AdminDashboard onNavigate={handleNavigate} />,
    'admin-settings': <AdminDashboard onNavigate={handleNavigate} />
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {screens[currentScreen] || screens.landing}
      
      {/* Navegação rápida para desenvolvimento */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <p className="text-xs text-gray-600 mb-3">Navegação rápida:</p>
          <div className="space-y-1">
            <select 
              value={currentScreen}
              // Importante: Usar handleNavigate aqui também para criar histórico
              onChange={(e) => handleNavigate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <optgroup label="Telas Públicas (01-04)">
                <option value="landing">01 - Landing</option>
                <option value="login">02 - Login</option>
                <option value="signup">03 - Cadastro</option>
                <option value="forgot-password">04 - Recuperar Senha</option>
              </optgroup>
              <optgroup label="Telas de Usuário (05-15)">
                <option value="dashboard">05 - Dashboard</option>
                <option value="register-found">06 - Registrar Encontrado</option>
                <option value="register-lost">07 - Registrar Perdido</option>
                <option value="search">08 - Buscar Objetos</option>
                <option value="object-detail">09 - Detalhe Objeto</option>
                <option value="my-objects">10 - Meus Objetos</option>
                <option value="messages">11 - Mensagens</option>
                <option value="edit-object">12 - Editar Objeto</option>
                <option value="profile">13 - Perfil</option>
                <option value="help">14 - Ajuda</option>
                <option value="onboarding">15 - Onboarding</option>
              </optgroup>
              <optgroup label="Telas de Admin (16-20)">
                <option value="admin-dashboard">16 - Admin Dashboard</option>
                <option value="admin-objects">17 - Admin Objetos</option>
                <option value="admin-report-detail">18 - Admin Denúncia</option>
                <option value="admin-reports">19 - Admin Relatórios</option>
                <option value="admin-users">20 - Admin Usuários</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}