import { Link } from 'react-router-dom';

export function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex relative overflow-hidden font-sans" dir="rtl">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-15 animate-[spin_20s_infinite_linear]"
             style={{
               background: 'radial-gradient(circle at 30% 30%, #4db8a8 0%, transparent 40%), radial-gradient(circle at 70% 70%, #1e293b 0%, transparent 40%)'
             }}>
        </div>
      </div>

      <div className="relative z-10 w-full flex min-h-screen">
        {/* Left Brand Panel (hidden on mobile) */}
        <div className="hidden lg:flex flex-[1.2] flex-col justify-center p-20 relative overflow-hidden bg-gradient-to-b from-slate-900/50 to-slate-900/95 border-l border-white/5">
          <div className="relative z-10 max-w-[500px] animate-fade-in-right text-right">
            <div className="text-[2.5rem] font-black mb-10">
              FixIt<span className="text-[#4db8a8]">.</span> Pro
            </div>
            
            <h1 className="text-[3.5rem] leading-[1.1] font-black mb-6 text-transparent bg-clip-text bg-[linear-gradient(90deg,#fff_0%,#fff_40%,#4db8a8_50%,#fff_60%,#fff_100%)] bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
              خطوتك الأخيرة<br/>نحو الاحتراف
            </h1>

            <div className="flex flex-col gap-6 mt-10">
              {[
                { icon: '🛡️', text: 'مراجعة شاملة للبيانات لضمان الجودة' },
                { icon: '⏰', text: 'الرد خلال ٢٤ ساعة عمل كحد أقصى' },
                { icon: '🏅', text: 'شارة "فني معتمد" فور التفعيل' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-[1.1rem] font-bold">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-[1.4rem]">
                    {feature.icon}
                  </div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 bg-white/5 backdrop-blur-[40px] flex flex-col justify-center p-10 md:p-20 text-center relative">
          
          <div className="mb-12">
            <div className="text-[6rem] mb-8 inline-block relative animate-[float_3s_infinite_ease-in-out]">
              🚀
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-[#4db8a8]/20 -z-10 animate-[ping_2s_infinite_ease-out]"></div>
            </div>
            <h2 className="text-[2.5rem] font-black text-white mb-4">طلبك قيد المراجعة</h2>
            <p className="text-white/60 text-[1.2rem] leading-relaxed max-w-[400px] mx-auto">
              لقد استلمنا طلب انضمامك بنجاح. فريقنا يقوم الآن بمراجعة مستنداتك لضمان أفضل تجربة لعملائنا.
            </p>
          </div>

          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 mb-10 text-right">
            <h3 className="text-[#4db8a8] font-black text-[1.1rem] mb-3">ماذا سيحدث الآن؟</h3>
            <p className="text-white/50 text-[0.95rem] leading-relaxed m-0">
              سيقوم فريق الفحص بالتأكد من صحة البيانات وصورة البطاقة. بمجرد الموافقة، ستصلك رسالة نصية (SMS) لتفعيل
              حسابك والبدء في استقبال الطلبات.
            </p>
          </div>

          <Link 
            to="/" 
            className="w-full p-5 rounded-2xl border border-white/10 bg-white/5 text-white font-extrabold text-[1.1rem] flex items-center justify-center gap-3 transition-all hover:bg-white/10 hover:-translate-y-1"
          >
            <span>العودة للرئيسية</span>
            <span>⟶</span>
          </Link>

          <div className="mt-16 text-white/50 font-bold flex items-center justify-center gap-3">
            هل لديك استفسار؟ تواصل مع الدعم الفني: 
            <span className="text-[#4db8a8] text-[1.2rem] font-black tracking-wider drop-shadow-[0_0_10px_rgba(77,184,168,0.2)]">19999</span>
          </div>

        </div>
      </div>
    </div>
  );
}
