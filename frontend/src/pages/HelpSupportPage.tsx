import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Phone, MessageSquare, Mail, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export function HelpSupportPage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'كيف يمكنني طلب فني؟',
      a: 'يمكنك طلب فني من خلال الصفحة الرئيسية واختيار القسم المناسب ثم اختيار الفني المفضل لديك والضغط على "طلب الآن".'
    },
    {
      q: 'ما هي طرق الدفع المتاحة؟',
      a: 'حالياً، منصة FixIt تدعم الدفع النقدي المباشر للفني بعد الانتهاء من العمل.'
    },
    {
      q: 'كيف أصبح فنياً معتمداً؟',
      a: 'يمكنك إنشاء حساب فني ورفع صورة بطاقتك الشخصية، وسيقوم فريق الإدارة بمراجعة حسابك وتفعيله خلال 24 ساعة.'
    }
  ];

  const handleFaqClick = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-[100px] pb-16 text-text-primary px-4">
      
      {/* Navbar */}
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
            FixIt<span className="text-secondary -mr-1">.</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto mt-10">
        <h1 className="text-[2.5rem] text-center mb-[60px] font-black">كيف يمكننا مساعدتك اليوم؟ 💬</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 align-start">
          
          {/* FAQ Section */}
          <div className="bg-white p-10 rounded-[24px] border border-border h-fit shadow-sm">
            <h2 className="text-[1.8rem] font-extrabold mb-8">الأسئلة الشائعة</h2>
            
            <div className="flex flex-col gap-2 relative">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-bg-light pb-4 mb-2 last:border-0">
                  <button 
                    onClick={() => handleFaqClick(index)}
                    className="w-full text-right flex items-center justify-between font-extrabold text-[1.2rem] text-text-primary mb-2 cursor-pointer hover:text-primary transition-colors focus:outline-none"
                  >
                    {faq.q}
                    <ChevronDown size={20} className={clsx("transition-transform duration-300", activeFaq === index ? "rotate-180 text-primary" : "")} />
                  </button>
                  
                  <div className={clsx(
                    "grid transition-all duration-300 ease-in-out",
                    activeFaq === index ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden text-text-secondary font-medium leading-relaxed text-[1.05rem]">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-10 rounded-[24px] border border-border h-fit shadow-sm">
            <h2 className="text-[1.8rem] font-extrabold mb-2">لم تجد إجابة؟</h2>
            <p className="mb-8 text-text-secondary font-medium">أرسل لنا استفسارك وسيقوم فريق الدعم بالرد عليك في أقرب وقت.</p>
            
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-text-secondary">الاسم</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="اسمك الكامل" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-text-secondary">البريد الإلكتروني</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-left" placeholder="example@email.com" dir="ltr" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-text-secondary">المشكلة</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-[120px] resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="اكتب تفاصيل استفسارك هنا..."></textarea>
              </div>
              
              <button 
                type="button" 
                className="w-full bg-primary text-white font-extrabold py-3.5 rounded-xl mt-2 hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all"
                onClick={() => alert('تم إرسال رسالتك بنجاح!')}
              >
                إرسال الرسالة
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100/60">
              <p className="text-text-secondary text-[0.9rem] mb-4 font-bold">أو تواصل معنا مباشرة</p>
              <Link 
                to="/contact" 
                className="flex items-center justify-center gap-3 bg-primary-soft text-primary-dark border border-primary/20 rounded-xl p-3 text-decoration-none font-extrabold hover:bg-primary/20 transition-colors"
              >
                <div className="flex gap-1.5 opacity-80">
                  <Phone size={18} />
                  <MessageSquare size={18} />
                  <Mail size={18} />
                </div>
                هاتف | واتساب | إيميل
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
