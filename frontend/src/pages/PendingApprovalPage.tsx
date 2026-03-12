import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '🛡️', text: 'مراجعة شاملة للبيانات لضمان الجودة' },
  { icon: '⏰', text: 'الرد خلال ٢٤ ساعة عمل كحد أقصى' },
  { icon: '🏅', text: 'شارة "فني معتمد" فور التفعيل' },
];

const STEPS = [
  { num: '01', text: 'مراجعة البيانات الشخصية وصورة الهوية' },
  { num: '02', text: 'التحقق من المؤهلات والخبرات المهنية' },
  { num: '03', text: 'إرسال رسالة SMS بتأكيد تفعيل الحساب' },
];

export function PendingApprovalPage() {
  return (
    <div
      className="min-h-screen bg-slate-900 text-white flex relative overflow-hidden"
      dir="rtl"
    >
      {/* ── Background Glow ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-10 animate-[spin_25s_linear_infinite]"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, #4db8a8 0%, transparent 40%), radial-gradient(circle at 70% 70%, #1e293b 0%, transparent 40%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full flex min-h-screen">

        {/* ════════════════════════════════
            Left — Brand Panel (lg+)
        ════════════════════════════════ */}
        <div className="hidden lg:flex flex-[1.2] flex-col justify-center p-20 border-l border-white/5 bg-gradient-to-b from-slate-900/50 to-slate-900/95 relative overflow-hidden">
          <div className="max-w-[480px] text-right space-y-10 animate-fade-in">

            {/* Logo */}
            <div className="text-[2.2rem] font-black tracking-tight">
              FixIt<span className="text-[#4db8a8]">.</span>
              <span className="text-white/40 text-[1.4rem] font-bold mr-1">Pro</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-[3.2rem] leading-[1.15] font-black text-white mb-4">
                خطوتك الأخيرة<br />
                <span className="text-[#4db8a8]">نحو الاحتراف</span>
              </h1>
              <p className="text-white/40 text-[1.05rem] leading-relaxed">
                انضم لآلاف الفنيين المعتمدين وابدأ في استقبال الطلبات فور الموافقة.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#4db8a8]/10 border border-[#4db8a8]/20 flex items-center justify-center text-[1.4rem] shrink-0">
                    {f.icon}
                  </div>
                  <span className="font-bold text-white/80">{f.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ════════════════════════════════
            Right — Content Panel
        ════════════════════════════════ */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-16 bg-white/5 backdrop-blur-[40px] text-right">
          <div className="max-w-md mx-auto w-full space-y-8">

            {/* Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="text-[5rem] animate-[float_3s_ease-in-out_infinite]">🚀</div>
                <div className="absolute inset-0 rounded-full bg-[#4db8a8]/20 animate-ping" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-3">
              <h2 className="text-[2.2rem] font-black text-white">طلبك قيد المراجعة</h2>
              <p className="text-white/50 text-[1rem] leading-relaxed">
                استلمنا طلب انضمامك بنجاح. فريقنا يراجع مستنداتك
                لضمان أفضل تجربة لعملائنا.
              </p>
            </div>

            {/* Steps */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-5">
              <h3 className="text-[#4db8a8] font-black text-[1rem] mb-2">
                ماذا سيحدث الآن؟
              </h3>
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#4db8a8]/10 border border-[#4db8a8]/20 flex items-center justify-center shrink-0">
                    <span className="text-[#4db8a8] text-xs font-black">{s.num}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed pt-1">{s.text}</p>
                </div>
              ))}
            </div>

            {/* Estimated Time */}
            <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-[#4db8a8]/10 border border-[#4db8a8]/20">
              <span className="text-white/60 text-sm font-bold">الوقت المتوقع للمراجعة</span>
              <span className="text-[#4db8a8] font-black">٢٤ ساعة عمل</span>
            </div>

            {/* CTA */}
            <Link
              to="/"
              className="w-full p-4 rounded-2xl border border-white/10 bg-white/5 text-white font-extrabold text-[1rem] flex items-center justify-center gap-3 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              <span>العودة للرئيسية</span>
              <span>⟶</span>
            </Link>

            {/* Support */}
            <div className="text-center space-y-1 pt-2">
              <p className="text-white/40 text-sm">هل لديك استفسار؟ تواصل مع الدعم الفني</p>
              <p className="text-[#4db8a8] text-[1.5rem] font-black tracking-widest drop-shadow-[0_0_12px_rgba(77,184,168,0.3)]">
                19999
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}