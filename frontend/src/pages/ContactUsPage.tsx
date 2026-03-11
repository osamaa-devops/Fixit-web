import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Phone, MessageSquare, Mail } from 'lucide-react';

export function ContactUsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fdfbfb_0%,#e2e8f0_100%)] font-sans pt-[100px] pb-16 text-text-primary px-4 transition-all duration-300">
      
      {/* Floating Header Navbar Component Concept -> Can move to a shared layout if needed */}
      <nav className="fixed top-5 left-5 right-5 h-[70px] z-50 flex items-center justify-center bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
        <div className="w-[95%] max-w-[1400px] flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-secondary font-extrabold py-2 px-4 bg-white/50 rounded-xl border border-white/40 transition-all hover:text-primary hover:bg-white"
          >
            <ArrowRight size={20} strokeWidth={3} />
            العودة للسابقة
          </button>
          <Link to="/" className="text-[26px] font-black text-primary tracking-tight">
            FixIt<span className="text-primary-dark -mr-1">.</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-[95%] max-w-[700px] mx-auto">
        
        <div className="text-center mb-10">
          <div className="text-[3rem] mb-4">📞</div>
          <h1 className="text-[2.4rem] font-black mb-3 text-slate-900">تواصل معنا</h1>
          <p className="text-[1.05rem] text-text-secondary font-bold leading-relaxed">
            فريق دعم FixIt متاح لمساعدتك في أي وقت.<br/>اختر وسيلة التواصل المناسبة لك.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          
          <a href="tel:+201234567890" className="flex items-center gap-6 bg-white/70 backdrop-blur-[20px] border border-white/40 rounded-3xl p-7 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:border-blue-500 group animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
              <Phone size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-right">
              <div className="text-[0.85rem] font-extrabold text-text-secondary uppercase tracking-[0.5px] mb-1">اتصال هاتفي</div>
              <div className="text-[1.2rem] font-black text-slate-900" dir="ltr">+20 123 456 7890</div>
              <div className="text-[0.85rem] text-blue-500 font-extrabold mt-1">اضغط للاتصال المباشر</div>
            </div>
            <div className="text-blue-500/60 group-hover:text-blue-500 transition-colors">
              <ArrowRight size={20} strokeWidth={2.5} className="rotate-180" />
            </div>
          </a>

          <a href="https://wa.me/201234567890" target="_blank" rel="noreferrer" className="flex items-center gap-6 bg-white/70 backdrop-blur-[20px] border border-white/40 rounded-3xl p-7 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:border-green-500 group animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
              <MessageSquare size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-right">
              <div className="text-[0.85rem] font-extrabold text-text-secondary uppercase tracking-[0.5px] mb-1">واتساب</div>
              <div className="text-[1.2rem] font-black text-slate-900" dir="ltr">+20 123 456 7890</div>
              <div className="text-[0.85rem] text-green-500 font-extrabold mt-1">اضغط للتواصل عبر واتساب</div>
            </div>
            <div className="text-green-500/60 group-hover:text-green-500 transition-colors">
              <ArrowRight size={20} strokeWidth={2.5} className="rotate-180" />
            </div>
          </a>

          <a href="mailto:support@fixit.com" className="flex items-center gap-6 bg-white/70 backdrop-blur-[20px] border border-white/40 rounded-3xl p-7 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:border-orange-500 group animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
              <Mail size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-right">
              <div className="text-[0.85rem] font-extrabold text-text-secondary uppercase tracking-[0.5px] mb-1">البريد الإلكتروني</div>
              <div className="text-[1.2rem] font-black text-slate-900" dir="ltr">support@fixit.com</div>
              <div className="text-[0.85rem] text-orange-500 font-extrabold mt-1">اضغط لإرسال بريد إلكتروني</div>
            </div>
            <div className="text-orange-500/60 group-hover:text-orange-500 transition-colors">
              <ArrowRight size={20} strokeWidth={2.5} className="rotate-180" />
            </div>
          </a>

        </div>

        <div className="bg-white/70 backdrop-blur-[20px] border border-white/40 rounded-3xl p-7 shadow-[0_20px_40px_rgba(0,0,0,0.08)] text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="text-[2rem] mb-2">🕐</div>
          <div className="font-black text-[1.1rem] mb-1.5 text-slate-900">ساعات الدعم</div>
          <div className="text-text-secondary font-bold text-[0.95rem] leading-[1.6]">
            السبت — الخميس: 9 صباحاً — 11 مساءً<br/>
            الجمعة: 2 ظهراً — 10 مساءً
          </div>
          <div className="mt-4 bg-emerald-500/10 text-emerald-600 rounded-full py-1.5 px-4 font-extrabold text-[0.85rem] inline-block">
            ⚡ متوسط وقت الرد: أقل من 5 دقائق
          </div>
        </div>

      </div>

    </div>
  );
}
