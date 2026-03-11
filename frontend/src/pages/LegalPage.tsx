import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function LegalPage() {
  const navigate = useNavigate();

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

      <div className="w-[95%] max-w-[900px] mx-auto">
        <div className="bg-white rounded-[32px] p-10 md:p-[60px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100">
          
          <div className="text-center mb-12">
            <h1 className="text-[2.2rem] md:text-[2.5rem] font-black mb-3 text-slate-900">الشروط والأحكام</h1>
            <p className="text-slate-500 text-[1.1rem] font-medium">يرجى قراءة هذه الشروط بعناية قبل استخدام منصة FixIt</p>
          </div>

          <div className="flex flex-col gap-10">
            
            <section className="relative">
              <h2 className="text-[1.5rem] font-extrabold text-primary mb-4 flex items-center gap-3 before:content-[''] before:block before:w-2 before:h-6 before:bg-primary before:rounded-sm">
                ١. شروط الاستخدام
              </h2>
              <p className="text-slate-700 text-[1.05rem] leading-relaxed font-medium">
                باستخدامك لمنصة FixIt، فإنك تلتزم بكافة السياسات والقواعد المعمول بها. نحن نوفر منصة للربط بين
                العملاء والفنيين المحترفين لضمان تجربة صيانة سهلة وآمنة.
              </p>
            </section>

            <section className="relative">
              <h2 className="text-[1.5rem] font-extrabold text-primary mb-4 flex items-center gap-3 before:content-[''] before:block before:w-2 before:h-6 before:bg-primary before:rounded-sm">
                ٢. خصوصية البيانات
              </h2>
              <p className="text-slate-700 text-[1.05rem] leading-relaxed font-medium">
                نحن نحترم خصوصيتك تماماً. البيانات التي تقدمها (مثل الاسم، رقم الهاتف، الموقع) تُستخدم فقط لغرض تقديم
                الخدمة وتحسين تجربتك على المنصة.
              </p>
            </section>

            <section className="relative">
              <h2 className="text-[1.5rem] font-extrabold text-primary mb-4 flex items-center gap-3 before:content-[''] before:block before:w-2 before:h-6 before:bg-primary before:rounded-sm">
                ٣. مسؤولية المستخدمين
              </h2>
              <p className="text-slate-700 text-[1.05rem] leading-relaxed font-medium">
                يتحمل العميل مسؤولية توفير بيانات دقيقة عن المشكلة، بينما يتحمل الفني مسؤولية تقديم العمل بأعلى جودة
                ممكنة والالتزام بالمواعيد المحددة.
              </p>
            </section>

          </div>

          <button 
            onClick={() => navigate(-1)}
            className="block w-full text-center mt-12 text-primary font-extrabold text-[1.1rem] hover:text-primary-dark transition-colors"
          >
            العودة للصفحة السابقة
          </button>

        </div>
      </div>

    </div>
  );
}
