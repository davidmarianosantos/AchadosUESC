import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Mail, ArrowLeft } from 'lucide-react';

interface RecuperarSenhaProps {
  onNavigate: (screen: string) => void;
}

export function RecuperarSenha({ onNavigate }: RecuperarSenhaProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('E-mail é obrigatório');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 1000);
  };
  
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
        <Card className="p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={32} className="text-[#2563EB]" />
          </div>
          <h2 className="text-gray-900 mb-3">E-mail enviado!</h2>
          <p className="text-gray-600 mb-6">
            Enviamos instruções para recuperação de senha para o e-mail cadastrado. 
            Verifique sua caixa de entrada e spam.
          </p>
          <Button onClick={() => onNavigate('login')} variant="primary" className="w-full">
            Voltar ao login
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-gray-900 mb-2">Recuperar senha</h1>
          <p className="text-gray-600">
            Informe seu e-mail institucional para receber instruções de recuperação
          </p>
        </div>
        
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="E-mail institucional"
              type="text"
              placeholder="exemplo@uesc.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Enviar link de recuperação
            </Button>
            
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-[#2563EB] transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar ao login
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
