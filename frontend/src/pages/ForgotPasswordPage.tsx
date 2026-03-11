
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, call API then go to OTP
    navigate('/login');
  };

  return (
    <div className="w-full max-w-[420px] mx-auto text-white">
      <div className="mb-10 text-right animate-fade-in">
        <h2 className="text-[2.5rem] font-black text-white mb-3">نسيت كلمة المرور؟ 🔒</h2>
        <p className="text-white/50 text-[1.1rem]">لا تقلق، أدخل رقم هاتفك وسنرسل لك رمزاً لإعادة تعيين كلمة المرور.</p>
      </div>

      <form onSubmit={handleReset} className="space-y-6">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Input 
            type="tel" 
            placeholder="رقم الهاتف" 
            dir="ltr"
            className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:bg-white/10"
            required 
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-5 rounded-2xl text-[1.1rem] font-black shadow-[0_15px_30px_var(--color-primary-glow)] hover:-translate-y-1 mt-8"
        >
          <span>إرسال الرمز</span>
          <span className="mr-3">⟶</span>
        </Button>

        <Link 
          to="/login"
          className="block text-center mt-6 text-white/40 hover:text-white font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <span>⟵</span> العودة لتسجيل الدخول
        </Link>
      </form>
    </div>
  );
}
