import React from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  const styles = {
    success: 'bg-[#DCFCE7] border-[#16A34A] text-[#166534]',
    error: 'bg-[#FEE2E2] border-[#DC2626] text-[#991B1B]',
    info: 'bg-[#DBEAFE] border-[#2563EB] text-[#1E40AF]'
  };
  
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    info: <Info size={20} />
  };
  
  return (
    <div className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 shadow-lg ${styles[type]} min-w-[320px] max-w-[480px] z-50 animate-in slide-in-from-bottom-2`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="flex-shrink-0 hover:opacity-70">
          <X size={18} />
        </button>
      )}
    </div>
  );
}
