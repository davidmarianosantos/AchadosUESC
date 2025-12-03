import React from 'react';
import { Search, Package, CheckCircle, MessageCircle, Bell, TrendingUp, Users, Shield, Zap, ArrowRight, Star, Award, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface LandingProps {
  onNavigate: (screen: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-[1440px] mx-auto px-20 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H14M5 21H3M5 21H10M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14M9 8H10M9 12H10M14 8H15M14 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-gray-900">Achados UESC</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={() => onNavigate('login')}>
                Entrar
              </Button>
              <Button variant="primary" onClick={() => onNavigate('signup')}>
                Criar conta
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="max-w-[1440px] mx-auto px-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
              <Star size={16} className="text-[#2563EB]" fill="#2563EB" />
              <span className="text-sm text-[#2563EB]">Plataforma oficial da UESC</span>
            </div>
            
            <h1 className="text-gray-900 mb-6">
              Achados e Perdidos da UESC
            </h1>
            <p className="text-gray-600 text-xl mb-8 leading-relaxed">
              Plataforma oficial para recuperar objetos perdidos e ajudar a devolver itens encontrados no campus da Universidade Estadual de Santa Cruz
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={() => onNavigate('signup')} className="group">
                Começar agora
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => onNavigate('login')}>
                Fazer login
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield size={20} className="text-[#16A34A]" />
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={20} className="text-[#2563EB]" />
                <span className="text-sm">500+ Usuários</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Zap size={20} className="text-[#F59E0B]" />
                <span className="text-sm">Rápido e Fácil</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-200">
              <div className="group hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Package size={24} className="text-[#2563EB]" />
                  <p className="text-gray-900 text-3xl">250+</p>
                </div>
                <p className="text-gray-600">Objetos cadastrados</p>
              </div>
              <div className="group hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle size={24} className="text-[#16A34A]" />
                  <p className="text-gray-900 text-3xl">180+</p>
                </div>
                <p className="text-gray-600">Objetos devolvidos</p>
              </div>
              <div className="group hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users size={24} className="text-[#F59E0B]" />
                  <p className="text-gray-900 text-3xl">500+</p>
                </div>
                <p className="text-gray-600">Usuários ativos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principais funcionalidades */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-200 rounded-full mb-4">
              <Heart size={16} className="text-purple-600" fill="rgb(147 51 234)" />
              <span className="text-sm text-purple-600">Ajude a comunidade</span>
            </div>
            <h2 className="text-gray-900 mb-4">Como podemos ajudar você?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nossa plataforma oferece duas formas de ajudar a comunidade UESC
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-10 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#F59E0B] hover:-translate-y-2 relative overflow-hidden group" hover>
              {/* Gradient decorativo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                  <Search size={32} className="text-[#F59E0B]" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-gray-900">Perdi um objeto</h3>
                  <ArrowRight size={20} className="text-[#F59E0B] group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Registre objetos que você perdeu no campus. Receba alertas automáticos quando objetos similares forem encontrados e cadastrados na plataforma.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-[#16A34A]" />
                    </div>
                    <span>Alertas de correspondência automáticos</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-[#16A34A]" />
                    </div>
                    <span>Busca avançada com filtros</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-[#16A34A]" />
                    </div>
                    <span>Contato seguro via mensagens internas</span>
                  </li>
                </ul>
                <Button 
                  variant="secondary" 
                  className="w-full border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-orange-50 group"
                  onClick={() => onNavigate('signup')}
                >
                  Registrar objeto perdido
                  <Search size={18} className="group-hover:rotate-12 transition-transform" />
                </Button>
              </div>
            </Card>
            
            <Card className="p-10 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#16A34A] hover:-translate-y-2 relative overflow-hidden group" hover>
              {/* Gradient decorativo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-shadow">
                  <Package size={32} className="text-[#16A34A]" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-gray-900">Encontrei um objeto</h3>
                  <ArrowRight size={20} className="text-[#16A34A] group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Cadastre objetos que você encontrou para ajudar outras pessoas a recuperarem seus pertences. Faça parte de uma comunidade solidária.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-[#16A34A]" />
                    </div>
                    <span>Cadastro rápido e simples</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-[#16A34A]" />
                    </div>
                    <span>Sistema sugere possíveis donos</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-[#16A34A]" />
                    </div>
                    <span>Ajude a devolver ao dono</span>
                  </li>
                </ul>
                <Button 
                  variant="secondary" 
                  className="w-full border-2 border-[#16A34A] text-[#16A34A] hover:bg-green-50 group"
                  onClick={() => onNavigate('signup')}
                >
                  Registrar objeto encontrado
                  <Package size={18} className="group-hover:rotate-12 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Pattern decorativo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-blue-500 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border-4 border-green-500 rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-4 border-purple-500 rounded-full"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-20 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4">
              <Zap size={16} className="text-[#2563EB]" />
              <span className="text-sm text-[#2563EB]">Simples e rápido</span>
            </div>
            <h2 className="text-gray-900 mb-4">Como funciona</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Processo simples e rápido em apenas alguns passos
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-8 relative">
            {/* Linha conectora */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 hidden lg:block"></div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-blue-500/30 relative z-10">
                1
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users size={24} className="text-[#2563EB]" />
                </div>
                <h3 className="text-gray-900 mb-3">Crie sua conta</h3>
                <p className="text-gray-600 text-sm">
                  Cadastre-se gratuitamente com seu e-mail institucional
                </p>
              </div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-blue-500/30 relative z-10">
                2
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Package size={24} className="text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-3">Registre o objeto</h3>
                <p className="text-gray-600 text-sm">
                  Adicione foto e descrição do objeto perdido ou encontrado
                </p>
              </div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-blue-500/30 relative z-10">
                3
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bell size={24} className="text-[#16A34A]" />
                </div>
                <h3 className="text-gray-900 mb-3">Receba correspondências</h3>
                <p className="text-gray-600 text-sm">
                  Sistema sugere automaticamente possíveis correspondências
                </p>
              </div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-blue-500/30 relative z-10">
                4
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageCircle size={24} className="text-[#F59E0B]" />
                </div>
                <h3 className="text-gray-900 mb-3">Entre em contato</h3>
                <p className="text-gray-600 text-sm">
                  Use mensagens internas seguras para combinar a devolução
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full mb-4">
              <Award size={16} className="text-[#16A34A]" />
              <span className="text-sm text-[#16A34A]">Recursos incríveis</span>
            </div>
            <h2 className="text-gray-900 mb-4">Recursos da plataforma</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tecnologia a favor da comunidade universitária
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-transparent hover:border-blue-200">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <Bell size={28} className="text-[#2563EB]" />
              </div>
              <h3 className="text-gray-900 mb-3">Alertas inteligentes</h3>
              <p className="text-gray-600">
                Receba notificações quando objetos similares aos seus forem cadastrados
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-transparent hover:border-purple-200">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                <MessageCircle size={28} className="text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Mensagens seguras</h3>
              <p className="text-gray-600">
                Converse com outros usuários sem expor dados pessoais sensíveis
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-transparent hover:border-green-200">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
                <TrendingUp size={28} className="text-[#16A34A]" />
              </div>
              <h3 className="text-gray-900 mb-3">Sistema de correspondência</h3>
              <p className="text-gray-600">
                Algoritmo sugere automaticamente possíveis donos de objetos encontrados
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-[1440px] mx-auto px-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Star size={16} className="text-yellow-300" fill="#FCD34D" />
            <span className="text-sm text-white">Faça parte da comunidade</span>
          </div>
          
          <h2 className="text-white mb-6">Pronto para começar?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Junte-se à comunidade UESC e ajude a tornar nosso campus um lugar ainda melhor
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-[#2563EB] hover:bg-gray-100 shadow-xl group"
              onClick={() => onNavigate('signup')}
            >
              Criar conta gratuitamente
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <button 
              onClick={() => onNavigate('login')}
              className="px-6 py-3.5 text-white border-2 border-white/30 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
            >
              Já tenho conta
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-4 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H14M5 21H3M5 21H10M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14M9 8H10M9 12H10M14 8H15M14 12H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-white">Achados UESC</span>
              </div>
              <p className="text-sm leading-relaxed">
                Sistema oficial de achados e perdidos da Universidade Estadual de Santa Cruz
              </p>
            </div>
            
            <div>
              <h3 className="text-white mb-4">Plataforma</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('signup')} className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Como funciona</button></li>
                <li><button onClick={() => onNavigate('signup')} className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Registrar objeto</button></li>
                <li><button onClick={() => onNavigate('signup')} className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Buscar objetos</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Ajuda</button></li>
                <li><button className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Perguntas frequentes</button></li>
                <li><button className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Contato</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Termos de uso</button></li>
                <li><button className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Política de privacidade</button></li>
                <li><button className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14} /> Sobre</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-sm text-center">
            <p>© 2025 Universidade Estadual de Santa Cruz. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}