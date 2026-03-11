import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export function AuthGateModal() {
  const { isOpen, title, subtitle, icon, closeModal } = useUIStore();

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div 
      className={clsx(
        "fixed inset-0 bg-[#0f0f0f]/65 backdrop-blur-md z-[9999] flex items-center justify-center transition-opacity duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      onClick={closeModal}
    >
      <div 
        className={clsx(
          "bg-white rounded-[36px] pt-[52px] px-[44px] pb-[44px] max-w-[460px] w-[90%] relative shadow-[0_48px_96px_rgba(0,0,0,0.22)] text-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isOpen ? "translate-y-0 scale-100" : "translate-y-[50px] scale-[0.92]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[5px] rounded-t-[36px] bg-gradient-to-r from-primary-dark via-primary to-[#f7941d]"></div>
        
        <button 
          onClick={closeModal}
          className="absolute top-[18px] left-[18px] w-[38px] h-[38px] rounded-full border-none bg-slate-100 cursor-pointer flex items-center justify-center text-slate-500 transition-all duration-300 hover:bg-red-100 hover:text-red-500 hover:rotate-90 hover:scale-110"
          title="إغلاق"
        >
          <X size={18} strokeWidth={3} />
        </button>
        
        <div className="w-[84px] h-[84px] rounded-full flex items-center justify-center text-[2.4rem] mx-auto mb-[22px] bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/10">
          {icon}
        </div>
        
        <h3 className="text-[1.55rem] font-black text-slate-900 mb-2.5">
          {title}
        </h3>
        
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          {subtitle}
        </p>
        
        <div className="flex flex-col gap-3">
          <Link 
            to="/register" 
            className="block p-4 bg-gradient-to-br from-[#c94b1f] to-primary text-white rounded-2xl font-black text-[1.05rem] tracking-wide shadow-[0_6px_20px_rgba(255,107,53,0.35)] hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgba(255,107,53,0.5)] transition-all duration-300"
            onClick={closeModal}
          >
            🚀 إنشاء حساب جديد — مجاناً
          </Link>
          
          <div className="flex items-center gap-3 text-slate-400 text-[0.88rem] before:flex-1 before:h-[1px] before:bg-slate-200 after:flex-1 after:h-[1px] after:bg-slate-200">
            أو
          </div>
          
          <Link 
            to="/login" 
            className="block p-[15px] bg-white text-slate-700 border-[1.5px] border-slate-200 rounded-2xl font-bold text-base transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/5"
            onClick={closeModal}
          >
            🔑 تسجيل الدخول بحساب موجود
          </Link>
        </div>
        
        <p className="mt-5 text-[0.85rem] text-slate-400">
          بالتسجيل توافق على <Link to="/legal" className="text-primary hover:underline" onClick={closeModal}>شروط الخدمة</Link> و<Link to="/legal" className="text-primary hover:underline" onClick={closeModal}>سياسة الخصوصية</Link>
        </p>
      </div>
    </div>
  );
}
