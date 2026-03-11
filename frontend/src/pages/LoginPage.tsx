import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Quick mock redirect
    navigate('/customer/home');
  };

  return (
    <div className="w-full max-w-[420px] mx-auto text-white">
      <div className="mb-10 text-right">
        <h2 className="text-[2.5rem] font-black text-white mb-3">تسجيل الدخول 👋</h2>
        <p className="text-white/50 text-[1.1rem]">أدخل بياناتك للمتابعة إلى حسابك</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Input 
            type="tel" 
            placeholder="رقم الهاتف" 
            dir="ltr"
            className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:bg-white/10"
            required 
          />
        </div>

        <div className="animate-fade-in relative" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <Input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="كلمة المرور" 
              dir="ltr"
              className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:bg-white/10 pr-12"
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-[50%] text-white/40 hover:text-white transition-colors"
              style={{ top: '24px' }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Link to="/forgot-password" className="block text-primary font-bold text-sm mt-3 hover:opacity-80 transition-opacity">
            نسيت كلمة المرور؟
          </Link>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-5 rounded-2xl text-[1.1rem] font-black shadow-[0_15px_30px_var(--color-primary-glow)] hover:-translate-y-1 mt-8"
        >
          <span>تسجيل الدخول</span>
          <span className="mr-3">⟶</span>
        </Button>
      </form>

      <div className="mt-10 text-center text-white/40">
        ليس لديك حساب؟ <Link to="/register" className="text-white font-extrabold hover:underline">أنشئ حساباً الآن</Link>
      </div>
    </div>
  );
}
