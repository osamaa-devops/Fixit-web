import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Phone, Eye, EyeOff, Wrench, ChevronRight } from 'lucide-react';

export function HandymanLogin() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/handyman/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#f5f1f1] to-[#e2e8f0] flex items-center justify-center p-4 font-sans text-[#1a202c] overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="w-full max-w-[440px] bg-white rounded-[24px] p-10 md:p-12 border border-[#e2e8f0] shadow-2xl relative overflow-hidden animate-fade-in-up">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Wrench className="text-orange-500" size={32} />
            <div className="text-[2rem] font-black text-[#1a202c] tracking-tight">
              FixIt<span className="text-orange-500">/</span>Pro
            </div>
          </div>
          <p className="text-[#64748b] font-bold">بوابة الفنيين المحترفين</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-right">
            <label className="block mb-2 font-bold text-[#334155] text-[0.95rem]">رقم الهاتف</label>
            <div className="relative">
              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={20} />
              <input 
                type="tel" 
                placeholder="+20 500 123 4567" 
                required 
                dir="ltr"
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl py-4 px-4 pr-12 text-[#1a202c] font-bold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all placeholder:text-[#cbd5e1]"
              />
            </div>
          </div>

          <div className="text-right">
            <label className="block mb-2 font-bold text-[#334155] text-[0.95rem]">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={20} />
              <input 
                type={showPass ? 'text' : 'password'} 
                placeholder="••••••••" 
                required 
                dir="ltr"
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl py-4 px-4 pr-12 text-[#1a202c] font-bold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all placeholder:text-[#cbd5e1]"
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbd5e1] hover:text-[#64748b] transition-colors"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <a href="#" className="block text-right text-orange-500 font-bold text-[0.9rem] hover:text-orange-600 hover:underline transition-all">
            نسيت بيانات الدخول؟
          </a>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-4 rounded-xl font-black text-[1.1rem] shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
          >
            تسجيل الدخول
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#94a3b8] font-bold text-[0.85rem]">
            لا تملك حسابًا؟{' '}
            <a href="/register" className="text-orange-500 hover:text-orange-600 hover:underline transition-all">
              سجل الآن
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
