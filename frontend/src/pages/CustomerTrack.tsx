import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, MapPin, Clock, AlertTriangle, ShieldCheck, FileText, User } from 'lucide-react';
import { clsx } from 'clsx';

// Simulated request states
type RequestState = 'pending' | 'accepted' | 'on_the_way' | 'completed' | 'cancelled';

export function CustomerTrack() {
  const { id } = useParams();
  
  // In a real app, this state would come from an API based on the ID.
  // For demonstration, we'll simulate the "on_the_way" state as seen in the mockup.
  const [requestState, setRequestState] = useState<RequestState>('on_the_way');

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  // Helpers for UI rendering based on state
  const getStatusBadge = () => {
    switch(requestState) {
      case 'pending': return <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">⏳ بانتظار الموافقة</span>;
      case 'accepted': return <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">👍 تم القبول</span>;
      case 'on_the_way': return <span className="bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">🚗 الفني في الطريق</span>;
      case 'completed': return <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">✅ مكتمل</span>;
      case 'cancelled': return <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">❌ ملغي</span>;
    }
  };

  const getTimelineSteps = () => {
    const steps = [
      { id: 'pending', title: 'تم إرسال الطلب', desc: 'اليوم، 10:30 صباحاً' },
      { id: 'accepted', title: 'الموافقة من قبل الفني', desc: 'اليوم، 10:45 صباحاً' },
      { id: 'on_the_way', title: 'الفني في طريقه إليك', desc: 'الوصول المتوقع: 3:00 م' },
      { id: 'completed', title: 'إتمام العمل والدفع', desc: 'بانتظار الوصول...' }
    ];

    const currentStateIndex = steps.findIndex(s => s.id === requestState);
    // If completed, index is 3. If pending, index is 0. If cancelled, we handle differently.
    
    return steps.map((step, idx) => {
      // Determine step status
      let sStatus: 'completed' | 'active' | 'upcoming' = 'upcoming';
      
      if (requestState === 'cancelled') {
        sStatus = idx === 0 ? 'completed' : 'upcoming';
      } else if (idx < currentStateIndex) {
         sStatus = 'completed';
      } else if (idx === currentStateIndex) {
         sStatus = 'active';
      }

      return (
        <div key={step.id} className="relative mb-8 pb-2 last:mb-0 last:pb-0 z-10">
          {/* Vertical Line */}
          {idx < steps.length - 1 && (
            <div className="absolute right-[8px] top-[24px] bottom-[-32px] w-[3px] bg-black/5 rounded-full z-0"></div>
          )}
          
          <div className="flex items-start gap-5 relative z-10">
            {/* Dot Indicator */}
            <div className={clsx(
              "w-5 h-5 rounded-full border-[4px] border-white shrink-0 mt-1 transition-all",
              sStatus === 'completed' ? "bg-primary shadow-[0_0_15px_rgba(255,107,53,0.4)]" :
              sStatus === 'active' ? "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-125 border-blue-100" :
              "bg-gray-300"
            )}></div>
            
            <div>
              <h4 className={clsx("m-0 mb-1 text-[1.1rem] font-black", sStatus === 'active' ? 'text-blue-500' : 'text-text-primary')}>{step.title}</h4>
              <p className="m-0 text-[0.9rem] font-bold text-text-secondary">{step.desc}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const isContactLocked = requestState === 'pending' || requestState === 'cancelled';

  return (
    <div className="w-[95%] max-w-[1300px] mx-auto mt-10 mb-20 flex flex-col lg:flex-row gap-10 font-sans text-text-primary fade-in-up">
      
      {/* Sidebar: Status Timeline */}
      <aside className="w-full lg:w-[380px] shrink-0 bg-white/70 backdrop-blur-[25px] rounded-[32px] p-8 border border-white/40 sticky top-[110px] h-fit shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        
        <div className="flex justify-between items-center pb-6 mb-8 border-b-2 border-dashed border-black/5">
           <div>
              <span className="block text-text-secondary text-[0.9rem] font-bold mb-1">رقم الطلب</span>
              <span className="font-black text-primary text-[1.1rem]">#FIX-{id || '9824'}</span>
           </div>
           {getStatusBadge()}
        </div>

        <div className="relative pr-2">
          {getTimelineSteps()}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-8">
        
        {/* Handyman Info Card */}
        <section className="bg-white/70 backdrop-blur-[25px] rounded-[32px] p-8 md:p-10 border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:bg-white animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="flex items-center gap-3 text-[1.4rem] font-black text-text-primary m-0 mb-8 pb-4 border-b border-black/5">
             <User className="text-primary" size={28} strokeWidth={2.5}/>
             بيانات الفني المكلف
          </h2>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&h=200&fit=crop" alt="محمد علي" className="w-[100px] h-[100px] rounded-[28px] object-cover border-4 border-white shadow-[0_10px_20px_rgba(0,0,0,0.05)]" />
            
            <div className="flex-1">
              <h3 className="m-0 mb-2 text-[1.5rem] font-black text-text-primary">محمد علي سعيد</h3>
              <p className="m-0 mb-2 font-extrabold text-primary text-[1.1rem]">فني سباكة معتمد • ★ 4.9</p>
              
              {!isContactLocked && (
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-lg text-[0.85rem] font-black mt-1">
                  ✓ التواصل متاح
                </span>
              )}
            </div>

            {/* Contact Action - Blurred/Locked if pending/cancelled */}
            <div className="mt-4 md:mt-0">
               {isContactLocked ? (
                  <div className="inline-flex items-center gap-3 bg-gray-100 text-text-secondary px-6 py-3.5 rounded-xl font-black border border-black/5 cursor-not-allowed select-none opacity-80" aria-label="رقم الهاتف محجوب حتى الموافقة">
                     <Phone size={20} strokeWidth={2.5} />
                     <span className="blur-sm select-none tracking-[0.3em]">01012345678</span>
                  </div>
               ) : (
                  <a href="tel:+201012345678" className="inline-flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-[18px] font-black transition-all shadow-[0_8px_16px_rgba(77,184,168,0.2)] hover:scale-105 hover:shadow-[0_12px_24px_rgba(77,184,168,0.3)] text-decoration-none focus:outline-none focus:ring-4 focus:ring-secondary/30">
                     <Phone size={22} strokeWidth={2.5} />
                     اتصال
                  </a>
               )}
            </div>
          </div>
        </section>

        {/* Problem Details Card */}
        <section className="bg-white/70 backdrop-blur-[25px] rounded-[32px] p-8 md:p-10 border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:bg-white animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <h2 className="flex items-center gap-3 text-[1.4rem] font-black text-text-primary m-0 mb-6 pb-4 border-b border-black/5">
             <FileText className="text-primary" size={28} strokeWidth={2.5}/>
             تفاصيل وملاحظات الطلب
          </h2>
          
          <p className="font-bold text-text-secondary leading-[1.8] text-[1.05rem] m-0 mb-8 pb-8 border-b border-black/5">
            يوجد تسريب مياه مستمر من ماسورة الحوض في الحمام الرئيسي ونحتاج لتغيير الخلاط بالكامل لأن المحبس
            الرئيسي تالف أيضاً. تم إرفاق صور المشكلة للفني.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 border border-black/5 p-6 rounded-[24px] transition-all hover:bg-white">
              <span className="block text-text-secondary font-extrabold text-[0.9rem] mb-2 flex items-center gap-2">
                <Clock size={16} strokeWidth={3}/> الموعد المحدد
              </span>
              <span className="block font-black text-text-primary text-[1.1rem]">اليوم، فترة العصر (3:00 م - 6:00 م)</span>
            </div>
            
            <div className="bg-white/50 border border-black/5 p-6 rounded-[24px] transition-all hover:bg-white">
              <span className="block text-text-secondary font-extrabold text-[0.9rem] mb-2 flex items-center gap-2">
                <MapPin size={16} strokeWidth={3}/> العنوان
              </span>
              <span className="block font-black text-text-primary text-[1.1rem]">المعادي، شارع الـ 9، بناية 12، الدور 4</span>
            </div>
          </div>
        </section>

        {/* Payment & Security Card */}
        <section className="bg-white/70 backdrop-blur-[25px] rounded-[32px] p-8 md:p-10 border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:bg-white animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h2 className="flex items-center gap-3 text-[1.4rem] font-black text-red-500 m-0 mb-6 pb-4 border-b border-black/5">
             <ShieldCheck size={28} strokeWidth={2.5}/>
             أمانك يهمنا
          </h2>

          <div className="bg-red-500/5 border border-red-500/20 rounded-[24px] p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
             <div className="w-[50px] h-[50px] shrink-0 bg-white text-red-500 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(239,68,68,0.1)]">
                <AlertTriangle size={24} strokeWidth={2.5} />
             </div>
             <div>
                <h4 className="m-0 mb-2 text-red-500 font-black text-[1.15rem]">نظام الدفع النقدي فقط (Cash Only)</h4>
                <p className="m-0 font-bold text-text-secondary text-[0.95rem] leading-[1.6]">
                  تذكر أن FixIt تعتمد الدفع النقدي المباشر للفني بعد الإنتهاء. لا تقم بتحويل أي مبالغ إلكترونية
                  أو دفع عربون مقدم لضمان حقك وأمانك.
                </p>
             </div>
          </div>
        </section>

        {/* Action Area */}
        {requestState !== 'completed' && requestState !== 'cancelled' && (
          <div className="flex justify-end animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <button 
              className="px-8 py-4 bg-transparent text-red-500 border-2 border-red-500 rounded-[20px] font-black transition-all hover:bg-red-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-500/20 shadow-[0_4px_10px_rgba(239,68,68,0.05)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.2)]"
              onClick={() => {
                if (window.confirm('هل أنت متأكد من رغبتك في إلغاء الطلب؟')) {
                  setRequestState('cancelled');
                }
              }}
            >
              إلغاء الطلب
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
