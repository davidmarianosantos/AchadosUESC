import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CheckCircle } from 'lucide-react';

interface CadastroProps {
  onNavigate: (screen: string) => void;
}

export function Cadastro({ onNavigate }: CadastroProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Nome completo é obrigatório';
    if (!formData.email) newErrors.email = 'E-mail institucional é obrigatório';
    if (!formData.userType) newErrors.userType = 'Selecione o tipo de vínculo';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    if (!acceptedTerms) newErrors.terms = 'Você deve aceitar os termos de uso';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 1000);
  };
  
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
        <Card className="p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-[#16A34A]" />
          </div>
          <h2 className="text-gray-900 mb-3">Conta criada com sucesso!</h2>
          <p className="text-gray-600 mb-6">
            Sua conta foi criada. Agora você pode fazer login e começar a usar o sistema.
          </p>
          <Button onClick={() => onNavigate('login')} variant="primary" className="w-full">
            Ir para login
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-gray-900 mb-2">Criar conta</h1>
          <p className="text-gray-600">Preencha seus dados para se cadastrar</p>
        </div>
        
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <Input
                  label="Nome completo"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  error={errors.name}
                />
              </div>
              
              <div className="col-span-2">
              <Input
                label="E-mail institucional"
                type="email"
                placeholder="exemplo@uesc.br"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={errors.email}
              />
              </div>
              
              <div className="col-span-2">
                <label className="block text-gray-700 mb-2">
                  Tipo de vínculo
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 bg-white outline-none ${
                    errors.userType 
                      ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626] focus:ring-opacity-20' 
                      : 'border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20'
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="aluno">Aluno</option>
                  <option value="professor">Professor</option>
                  <option value="servidor">Servidor técnico-administrativo</option>
                  <option value="visitante">Visitante autorizado</option>
                </select>
                {errors.userType && <p className="text-[#DC2626] text-sm mt-1">{errors.userType}</p>}
              </div>
              
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={errors.password}
              />
              
              <Input
                label="Confirmar senha"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                error={errors.confirmPassword}
              />
            </div>
            
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB] mt-1"
                />
                <span className="text-gray-700 text-sm">
                  Li e concordo com os{' '}
                  <button type="button" className="text-[#2563EB] hover:underline">
                    Termos de Uso
                  </button>
                  {' '}e{' '}
                  <button type="button" className="text-[#2563EB] hover:underline">
                    Política de Privacidade
                  </button>
                </span>
              </label>
              {errors.terms && <p className="text-[#DC2626] text-sm mt-1">{errors.terms}</p>}
            </div>
            
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Cadastrar
            </Button>
          </form>
        </Card>
        
        <p className="text-center mt-6 text-gray-600">
          Já tem conta?{' '}
          <button 
            onClick={() => onNavigate('login')}
            className="text-[#2563EB] hover:underline"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
}
