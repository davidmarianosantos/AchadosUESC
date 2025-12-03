import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // função que mantém compatibilidade com a navegação rápida
  const handleNavigate = (screen: string) => {
    const routesMap: Record<string, string> = {
      'landing': '/',
      'login': '/login',
      'signup': '/signup',
      'forgot-password': '/forgot-password',
      'dashboard': '/dashboard',
      'home': '/dashboard',
      'register-found': '/register-found',
      'register-lost': '/register-lost',
      'search': '/search',
      'object-detail': '/object-detail',
      'my-objects': '/my-objects',
      'messages': '/messages',
      'edit-object': '/edit-object',
      'profile': '/profile',
      'help': '/help',
      'onboarding': '/onboarding',
      'admin-dashboard': '/admin-dashboard',
      'admin-objects': '/admin-objects',
      'admin-report-detail': '/admin-report-detail',
      'admin-reports': '/admin-reports',
      'admin-users': '/admin-users',
    };
    const path = routesMap[screen] || '/';
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Landing onNavigate={handleNavigate} />} />
        <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
        <Route path="/signup" element={<Cadastro onNavigate={handleNavigate} />} />
        <Route path="/forgot-password" element={<RecuperarSenha onNavigate={handleNavigate} />} />

        {/* Usuário */}
        <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
        <Route path="/register-found" element={<RegistrarEncontrado onNavigate={handleNavigate} />} />
        <Route path="/register-lost" element={<RegistrarPerdido onNavigate={handleNavigate} />} />
        <Route path="/search" element={<BuscarObjetos onNavigate={handleNavigate} />} />
        <Route path="/object-detail" element={<DetalheObjeto onNavigate={handleNavigate} />} />
        <Route path="/my-objects" element={<MeusObjetos onNavigate={handleNavigate} />} />
        <Route path="/messages" element={<Mensagens onNavigate={handleNavigate} />} />
        <Route path="/edit-object" element={<EditarObjeto onNavigate={handleNavigate} />} />
        <Route path="/profile" element={<Perfil onNavigate={handleNavigate} />} />
        <Route path="/help" element={<Ajuda onNavigate={handleNavigate} />} />
        <Route path="/onboarding" element={<Onboarding onNavigate={handleNavigate} />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard onNavigate={handleNavigate} />} />
        <Route path="/admin-objects" element={<AdminObjetos onNavigate={handleNavigate} />} />
        <Route path="/admin-report-detail" element={<AdminDenuncia onNavigate={handleNavigate} />} />
        <Route path="/admin-reports" element={<AdminRelatorios onNavigate={handleNavigate} />} />
        <Route path="/admin-users" element={<AdminUsuarios onNavigate={handleNavigate} />} />
      </Routes>

      {/* Navegação rápida para desenvolvimento */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <p className="text-xs text-gray-600 mb-3">Navegação rápida:</p>
          <div className="space-y-1">
            <select 
              onChange={(e) => handleNavigate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <optgroup label="Telas Públicas (01-04)">
                <option value="/">01 - Landing</option>
                <option value="/login">02 - Login</option>
                <option value="/signup">03 - Cadastro</option>
                <option value="/forgot-password">04 - Recuperar Senha</option>
              </optgroup>
              <optgroup label="Telas de Usuário (05-15)">
                <option value="/dashboard">05 - Dashboard</option>
                <option value="/register-found">06 - Registrar Encontrado</option>
                <option value="/register-lost">07 - Registrar Perdido</option>
                <option value="/search">08 - Buscar Objetos</option>
                <option value="/object-detail">09 - Detalhe Objeto</option>
                <option value="/my-objects">10 - Meus Objetos</option>
                <option value="/messages">11 - Mensagens</option>
                <option value="/edit-object">12 - Editar Objeto</option>
                <option value="/profile">13 - Perfil</option>
                <option value="/help">14 - Ajuda</option>
                <option value="/onboarding">15 - Onboarding</option>
              </optgroup>
              <optgroup label="Telas de Admin (16-20)">
                <option value="/admin-dashboard">16 - Admin Dashboard</option>
                <option value="/admin-objects">17 - Admin Objetos</option>
                <option value="/admin-report-detail">18 - Admin Denúncia</option>
                <option value="/admin-reports">19 - Admin Relatórios</option>
                <option value="/admin-users">20 - Admin Usuários</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
