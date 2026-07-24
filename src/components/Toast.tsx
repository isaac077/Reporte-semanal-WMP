import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`p-4 rounded-xl border shadow-xl flex items-start space-x-3 bg-white ${
          isSuccess
            ? 'border-emerald-300 ring-1 ring-emerald-500/20'
            : isError
            ? 'border-rose-300 ring-1 ring-rose-500/20'
            : 'border-sky-300 ring-1 ring-sky-500/20'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-600" />}
        </div>

        <div className="flex-1 text-xs">
          <strong
            className={`block font-bold text-sm ${
              isSuccess
                ? 'text-emerald-900'
                : isError
                ? 'text-rose-900'
                : 'text-sky-900'
            }`}
          >
            {toast.title}
          </strong>
          <p className="text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
        </div>

        <button
          onClick={onDismiss}
          type="button"
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
