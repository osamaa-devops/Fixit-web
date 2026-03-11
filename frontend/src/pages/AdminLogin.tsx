import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ChevronRight } from 'lucide-react';

export function AdminLogin() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans text-[#f8fafc] overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/05 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="w-full max-w-[440px] bg-[#1e293b] rounded-[24px] p-10 md:p-12 border border-[#334155] shadow-2xl relative overflow-hidden animate-fade-in-up">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500" />

        <div className="text-center mb-10">
          <div className="text-[2.5rem] font-black text-white flex items-center justify-center gap-3 tracking-tight mb-2">
            FixIt<span className="text-blue-500">/</span>Admin
          </div>
          <p className="text-[#94a3b8] font-bold">بوابة الإدارة المركزية والنظام</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-right">
            <label className="block mb-2 font-bold text-[#cbd5e1] text-[0.95rem]">البريد الإلكتروني الإداري</label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b]" size={20} />
              <input 
                type="email" 
                placeholder="admin@fixit.com" 
                required 
                className="w-full bg-[#0f232a]/50 border border-[#334155] rounded-xl py-4 px-4 pr-12 text-white font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all placeholder:text-[#64748b] direction-ltr"
              />
            </div>
          </div>

          <div className="text-right">
            <label className="block mb-2 font-bold text-[#cbd5e1] text-[0.95rem]">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b]" size={20} />
              <input 
                type={showPass ? 'text' : 'password'} 
                placeholder="••••••••" 
                required 
                className="w-full bg-[#0f172a]/50 border border-[#334155] rounded-xl py-4 px-4 pr-12 text-white font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all placeholder:text-[#64748b] direction-ltr"
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <a href="#" className="block text-right text-blue-500 font-bold text-[0.9rem] hover:text-blue-400 hover:underline transition-all">
            نسيت بيانات الدخول؟
          </a>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-black text-[1.1rem] shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
          >
            تسجيل الدخول الآمن
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-[0.8rem] text-[#64748b] font-bold">
          <ShieldCheck size={14} />
          اتصال محمي ومُشفر - وصول مقيد
        </div>
      </div>
    </div>
  );
}
