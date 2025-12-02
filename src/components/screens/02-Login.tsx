import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface LoginProps {
  onNavigate: (screen: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de login
    setTimeout(() => {
      if (email && password) {
        onNavigate('dashboard');
      } else {
        setError('E-mail e senha são obrigatórios');
        setIsLoading(false);
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2563EB] rounded-lg mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H14M5 21H3M5 21H10M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14M9 8H10M9 12H10M14 8H15M14 12H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-gray-900 mb-2">Entrar no Achados UESC</h1>
          <p className="text-gray-600">Acesse sua conta para continuar</p>
        </div>
        
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="E-mail institucional"
              type="text"
              placeholder="exemplo@uesc.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? 'Campo obrigatório' : ''}
            />
            
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? 'Campo obrigatório' : ''}
            />
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]"
                />
                <span className="text-gray-700 text-sm">Lembrar de mim neste computador</span>
              </label>
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-[#DC2626] text-sm">{error}</p>
              </div>
            )}
            
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Entrar
            </Button>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-[#2563EB] hover:underline text-sm"
              >
                Esqueci minha senha
              </button>
            </div>
          </form>
        </Card>
        
        <p className="text-center mt-6 text-gray-600">
          Ainda não tem conta?{' '}
          <button 
            onClick={() => onNavigate('signup')}
            className="text-[#2563EB] hover:underline"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
}
