import React from 'react';

interface BadgeProps {
  status: 'perdido' | 'encontrado' | 'correspondencia' | 'em-processo' | 'devolvido' | 'arquivado';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ status, children, className = '' }: BadgeProps) {
  const statusStyles = {
    'perdido': 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]',
    'encontrado': 'bg-[#DBEAFE] text-[#1E40AF] border border-[#2563EB]',
    'correspondencia': 'bg-[#DBEAFE] text-[#1E40AF] border border-[#2563EB]',
    'em-processo': 'bg-[#FFEDD5] text-[#9A3412] border border-[#F97316]',
    'devolvido': 'bg-[#DCFCE7] text-[#166534] border border-[#16A34A]',
    'arquivado': 'bg-gray-100 text-gray-600 border border-gray-300'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusStyles[status]} ${className}`}>
      {children}
    </span>
  );
}
