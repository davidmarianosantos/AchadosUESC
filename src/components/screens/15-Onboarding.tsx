import React, { useState } from 'react';
import { Header } from '../Header';
import { Search, Package, List, MessageCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface OnboardingProps {
  onNavigate: (screen: string) => void;
}

export function Onboarding({ onNavigate }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Bem-vindo ao Achados UESC!',
      description: 'Vamos fazer um tour rápido para você conhecer as principais funcionalidades da plataforma.',
      icon: null,
      highlight: null
    },
    {
      title: 'Perdi um objeto',
      description: 'Use esta opção para registrar objetos que você perdeu no campus. Você receberá alertas quando objetos similares forem encontrados.',
      icon: <Search size={48} className="text-[#F59E0B]" />,
      highlight: 'lost'
    },
    {
      title: 'Encontrei um objeto',
      description: 'Use esta opção para cadastrar objetos que você encontrou. Isso ajuda outras pessoas a recuperarem seus pertences.',
      icon: <Package size={48} className="text-[#16A34A]" />,
      highlight: 'found'
    },
    {
      title: 'Buscar objetos',
      description: 'Aqui você pode pesquisar por objetos perdidos e encontrados usando filtros como categoria, local, data e status.',
      icon: <Search size={48} className="text-[#2563EB]" />,
      highlight: 'search'
    },
    {
      title: 'Meus objetos',
      description: 'Acompanhe todos os objetos que você registrou (perdidos ou encontrados) e gerencie seus registros.',
      icon: <List size={48} className="text-[#2563EB]" />,
      highlight: 'my-objects'
    },
    {
      title: 'Mensagens',
      description: 'Converse de forma segura com outros usuários sobre objetos. O sistema protege seus dados pessoais.',
      icon: <MessageCircle size={48} className="text-[#2563EB]" />,
      highlight: 'messages'
    },
    {
      title: 'Tudo pronto!',
      description: 'Agora você já conhece as principais funcionalidades. Comece a usar a plataforma e ajude a comunidade UESC!',
      icon: null,
      highlight: null
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNavigate('dashboard');
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    onNavigate('dashboard');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />
      
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-12">
          {/* Botão fechar */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
          
          {/* Conteúdo */}
          <div className="text-center">
            {steps[currentStep].icon && (
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {steps[currentStep].icon}
              </div>
            )}
            
            <h2 className="text-gray-900 mb-4">{steps[currentStep].title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              {steps[currentStep].description}
            </p>
            
            {/* Indicador de progresso */}
            <div className="flex justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-[#2563EB]'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {/* Botões */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleSkip}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pular tour
              </button>
              
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button variant="secondary" onClick={handlePrev}>
                    Anterior
                  </Button>
                )}
                <Button variant="primary" onClick={handleNext}>
                  {currentStep === steps.length - 1 ? 'Começar a usar' : 'Próximo'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
