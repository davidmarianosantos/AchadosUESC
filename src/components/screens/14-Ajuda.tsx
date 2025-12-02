import React, { useState } from 'react';
import { Header } from '../Header';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ChevronDown, ChevronUp, Search, PlayCircle } from 'lucide-react';

interface AjudaProps {
  onNavigate: (screen: string) => void;
}

export function Ajuda({ onNavigate }: AjudaProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  
  const faqs = [
    {
      question: 'Como registrar um objeto encontrado?',
      answer: 'Para registrar um objeto que você encontrou, clique no botão "Encontrei um objeto" no menu principal ou na tela inicial. Preencha o formulário com as informações do objeto, incluindo uma foto (obrigatória), categoria, local onde foi encontrado, data e uma descrição detalhada. Após publicar, o objeto ficará visível para outros usuários que possam ter perdido algo similar.'
    },
    {
      question: 'Como registrar um objeto perdido?',
      answer: 'Para registrar um objeto que você perdeu, clique em "Perdi um objeto" no menu principal. Preencha as informações sobre o objeto, incluindo categoria, nome, local provável onde perdeu, data aproximada e uma descrição detalhada. Você pode ativar alertas automáticos para ser notificado quando objetos similares forem cadastrados como encontrados.'
    },
    {
      question: 'Como funciona a correspondência automática de objetos?',
      answer: 'Nosso sistema analisa automaticamente os objetos cadastrados e sugere possíveis correspondências baseadas em categoria, local, data e descrição. Quando você registra um objeto perdido com alertas ativos, receberá notificações quando objetos semelhantes forem encontrados. As correspondências aparecem destacadas na sua página inicial e na área de busca.'
    },
    {
      question: 'É seguro compartilhar fotos de documentos?',
      answer: 'Recomendamos NÃO compartilhar fotos que mostrem informações sensíveis como CPF, RG ou endereço completo. Se você encontrou um documento, fotografe apenas de forma que seja possível identificar o tipo de documento (exemplo: "carteirinha de estudante") sem expor dados pessoais. Descreva as características visuais na descrição. Para devolver documentos, utilize sempre os canais oficiais da universidade.'
    },
    {
      question: 'Como entro em contato com quem encontrou meu objeto?',
      answer: 'Ao visualizar um objeto que você acredita ser seu, clique em "Ver detalhes" e depois em "Acho que este objeto é meu" ou "Enviar mensagem". Você será direcionado para um sistema de mensagens internas onde pode conversar de forma segura sem expor seus dados pessoais. O contato é sempre intermediado pela plataforma.'
    },
    {
      question: 'Onde devo retirar um objeto encontrado?',
      answer: 'O local de retirada é combinado através das mensagens internas. Geralmente, objetos são entregues na segurança do prédio, secretaria ou outro local seguro da universidade. NUNCA combine encontros em locais isolados. Sempre leve um documento com foto para retirar o objeto.'
    },
    {
      question: 'Posso editar um registro já publicado?',
      answer: 'Sim, você pode editar registros de objetos que ainda não foram marcados como "Devolvidos". Acesse "Meus objetos" no menu, encontre o objeto que deseja editar e clique no botão de edição. Você pode atualizar a descrição, local, data e outras informações.'
    },
    {
      question: 'Como marco um objeto como devolvido?',
      answer: 'Quando um objeto for devolvido ao dono, acesse "Meus objetos", clique no menu de três pontos ao lado do objeto e selecione "Marcar como devolvido". Isso ajuda a manter o sistema organizado e atualizado.'
    },
    {
      question: 'O que fazer se eu suspeitar de informações falsas?',
      answer: 'Se você identificar um registro suspeito ou com informações falsas, clique em "Denunciar este registro" na página de detalhes do objeto. Nossa equipe de administração irá revisar e tomar as medidas necessárias.'
    },
    {
      question: 'Quanto tempo os objetos ficam no sistema?',
      answer: 'Objetos ficam ativos no sistema até serem marcados como devolvidos ou arquivados pela administração. Recomendamos atualizar o status dos seus objetos para manter a base de dados organizada. Objetos muito antigos podem ser arquivados automaticamente após 6 meses.'
    }
  ];
  
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName="João Silva" onNavigate={onNavigate} />
      
      <div className="max-w-[900px] mx-auto px-20 py-12">
        <h1 className="text-gray-900 mb-2">Ajuda e Perguntas Frequentes</h1>
        <p className="text-gray-600 mb-8">
          Encontre respostas para as dúvidas mais comuns sobre o sistema
        </p>
        
        {/* Busca */}
        <Card className="p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar uma dúvida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 outline-none"
            />
          </div>
        </Card>
        
        {/* Tour guiado */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-white border-[#2563EB]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
              <PlayCircle size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">Tour guiado pela plataforma</h3>
              <p className="text-gray-600 mb-4">
                Conheça todos os recursos do sistema através de um tour interativo passo a passo
              </p>
              <button 
                onClick={() => onNavigate('onboarding')}
                className="px-5 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
              >
                Iniciar tour
              </button>
            </div>
          </div>
        </Card>
        
        {/* FAQ */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-gray-900 pr-4">{faq.question}</h3>
                {expandedFaq === index ? (
                  <ChevronUp size={20} className="text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-gray-600 flex-shrink-0" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
        
        {filteredFaqs.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-600">
              Nenhuma pergunta encontrada com o termo "{searchTerm}"
            </p>
          </Card>
        )}
        
        {/* Contato */}
        <Card className="p-6 mt-8">
          <h3 className="text-gray-900 mb-2">Ainda precisa de ajuda?</h3>
          <p className="text-gray-600 mb-4">
            Se você não encontrou a resposta para sua dúvida, entre em contato com nossa equipe de suporte.
          </p>
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">E-mail</p>
              <p className="text-gray-900">suporte.achados@uesc.br</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Telefone</p>
              <p className="text-gray-900">(73) 3680-5000</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
