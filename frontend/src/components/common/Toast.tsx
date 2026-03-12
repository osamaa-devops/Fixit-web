import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useToastStore } from '../../hooks/useToast';

const TOAST_CONFIG = {
  success: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: CheckCircle,
    color: 'text-emerald-600',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: AlertCircle,
    color: 'text-red-600',
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: AlertCircle,
    color: 'text-amber-600',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: Info,
    color: 'text-blue-600',
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-[400px] pointer-events-none">
      {toasts.map((toast) => {
        const config = TOAST_CONFIG[toast.type];
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            className={clsx(
              'flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-[20px] animate-fade-in-up pointer-events-auto',
              config.bg,
              config.border
            )}
          >
            <Icon className={clsx('shrink-0 mt-0.5', config.color)} size={20} />
            <p className={clsx('flex-1 font-bold text-sm', config.color)}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className={clsx('shrink-0 transition-colors hover:opacity-70', config.color)}
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
