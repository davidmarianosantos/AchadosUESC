import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export function Input({ 
  label, 
  error, 
  className = '', 
  type = 'text',
  multiline = false,
  rows = 3,
  ...props 
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  
  const baseStyles = 'w-full px-4 py-2.5 border rounded-lg transition-all duration-200 bg-white';
  const normalStyles = 'border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 outline-none';
  const errorStyles = 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626] focus:ring-opacity-20';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {multiline ? (
          <textarea
            className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className} resize-none`}
            rows={rows}
            {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
          />
        ) : (
          <input
            type={inputType}
            className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className} ${isPassword ? 'pr-12' : ''}`}
            {...props as React.InputHTMLAttributes<HTMLInputElement>}
          />
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[#DC2626] text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
