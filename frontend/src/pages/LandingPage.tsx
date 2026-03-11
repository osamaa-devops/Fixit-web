import { Link } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { AuthGateModal } from '../components/shared/AuthGateModal';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Search } from 'lucide-react';

export function LandingPage() {
  const { openModal } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg-light pt-[80px] font-sans">
      
      {/* Navbar (Guest View) */}
      <nav className={clsx(
        "fixed top-0 left-0 right-0 h-[80px] z-50 flex items-center justify-center transition-all duration-300",
        isScrolled ? "bg-white/85 backdrop-blur-[20px] shadow-md" : ""
      )}>
        <div className="w-[90%] max-w-[1400px] flex items-center justify-between">
          <Link to="/" className="text-[28px] font-black text-primary flex items-center gap-3">
            FixIt<span className="text-[#4db8a8] -mr-2">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-primary font-bold text-[1.05rem] relative after:content-[''] after:absolute after:-bottom-1.5 after:right-0 after:w-full after:h-[2px] after:bg-primary">
              الرئيسية
            </Link>
            <button 
              onClick={() => openModal('تصفح الفنيين', 'سجل دخولك لتتمكن من البحث عن الفنيين والتواصل معهم.', '👨‍🔧')}
              className="text-text-secondary font-bold text-[1.05rem] hover:text-primary transition-colors hover:after:w-full relative after:content-[''] after:absolute after:-bottom-1.5 after:right-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all"
            >
              تصفح الفنيين
            </button>
            <button 
              onClick={() => openModal('المساعدة والدعم', 'سجل دخولك أولاً للوصول إلى مركز المساعدة والتواصل مع فريق الدعم.', '❓')}
              className="text-text-secondary font-bold text-[1.05rem] hover:text-primary transition-colors hover:after:w-full relative after:content-[''] after:absolute after:-bottom-1.5 after:right-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all"
            >
              المساعدة والدعم
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-text-secondary font-bold text-[1.05rem] hover:text-primary transition-colors hidden sm:block">
              تسجيل الدخول
            </Link>
            <Link to="/register?role=customer" className="bg-primary text-white py-3 px-7 rounded-[14px] font-extrabold inline-flex items-center gap-2 border-none shadow-[0_6px_15px_rgba(255,107,53,0.3)] hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary-dark hover:shadow-[0_10px_25px_rgba(255,107,53,0.45)] transition-all animate-pulse-glow">
              انضم إلينا
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="w-[95%] max-w-[1400px] mx-auto mt-10 min-h-[560px] rounded-[40px] p-10 md:p-20 relative bg-gradient-to-br from-[#1a0800] via-[#c94b1f] to-[#ff8c42] text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-[0_40px_80px_rgba(255,107,53,0.25)] animate-fade-in-up">
        {/* Background decorations */}
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/10 -top-[200px] -left-[200px] z-[1]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-white/5 -bottom-[100px] right-[200px] z-[1]"></div>

        {/* Hero Content */}
        <div className="z-[2] max-w-[650px] relative">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 py-2 px-4.5 rounded-full mb-6 text-[0.9rem] font-bold">
            ✨ منصة رقم 1 في مصر لخدمات الصيانة
          </div>
          <h1 className="text-[2.5rem] md:text-[3.2rem] font-black mb-4 leading-[1.2]">
            احصل على أفضل<br/>
            <span className="text-[#ffd0b8]">محترفي الصيانة</span><br/>
            المنزلية فوراً
          </h1>
          <p className="text-[1.15rem] opacity-90 mb-8 leading-[1.7]">
            أكثر من <strong className="font-black">5,000 فني معتمد</strong> جاهزون لخدمتك في جميع أنحاء جمهورية مصر العربية
          </p>

          {/* Search */}
          <form 
            className="flex bg-white p-2 rounded-[20px] shadow-lg max-w-[580px] mt-7 border border-white/50 focus-within:scale-[1.02] focus-within:shadow-xl focus-within:border-primary transition-all"
            onSubmit={(e) => {
              e.preventDefault();
              openModal('ابحث عن فني', 'سجل دخولك لتتمكن من البحث عن أفضل الفنيين في منطقتك.', '🔍');
            }}
          >
            <input 
              type="text" 
              placeholder="ما هي الخدمة التي تحتاجها؟ (مثال: سباكة، كهرباء...)" 
              className="flex-1 border-none px-5 text-[1.1rem] bg-transparent outline-none text-slate-800"
            />
            <button type="submit" className="bg-primary text-white border-none py-4 px-8 rounded-xl text-[1.1rem] font-bold cursor-pointer hover:bg-primary-dark transition-colors flex items-center gap-2">
              <Search size={20} /> بحث
            </button>
          </form>

          {/* CTAs */}
          <div className="flex gap-4 mt-9 flex-wrap">
            <Link to="/register?role=customer" className="py-4 px-9 bg-white text-primary rounded-2xl font-black text-[1.05rem] shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.3)] transition-all">
              🚀 ابدأ الآن مجاناً
            </Link>
            <button 
              onClick={() => openModal('تصفح الفنيين', 'سجل دخولك لتتمكن من استكشاف قائمة الفنيين وتقييماتهم.', '👨‍🔧')}
              className="py-4 px-9 bg-white/15 text-white border-2 border-white/45 rounded-2xl font-extrabold text-[1.05rem] backdrop-blur-[10px] hover:bg-white/25 hover:-translate-y-1 transition-all"
            >
              🔍 تصفح الفنيين
            </button>
            <Link to="/register?role=handyman" className="mt-4 md:mt-0 flex items-center gap-3 py-4 px-9 bg-white/10 backdrop-blur-[10px] border-2 border-white/35 rounded-2xl text-white font-bold hover:bg-white/20 hover:-translate-y-0.5 hover:border-white/40 transition-all">
              👷 هل أنت حرفي محترف؟ <span className="text-primary underline underline-offset-4">انضم الآن</span>
            </Link>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="z-[2] hidden lg:flex flex-col gap-4 shrink-0 mt-10 md:mt-0">
          {[
            { icon: '⭐', value: '4.9/5', label: 'تقييم العملاء', delay: '0s' },
            { icon: '👤', value: '+50,000', label: 'خدمة مكتملة', delay: '1.2s' },
            { icon: '🔧', value: '+1,200', label: 'فني معتمد', delay: '2.4s' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-[12px] border border-white/25 rounded-[50px] py-3 px-5 flex items-center gap-3 text-white font-bold animate-float" style={{ animationDelay: stat.delay }}>
              <div className="w-[36px] h-[36px] bg-white/20 rounded-full flex items-center justify-center text-[1.1rem]">
                {stat.icon}
              </div>
              <div>
                <div className="text-[1.2rem] font-black">{stat.value}</div>
                <div className="opacity-75 text-[0.8rem]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Stats Bar */}
      <div className="bg-white py-10 border-b border-border mb-20">
        <div className="w-[90%] max-w-[1200px] mx-auto flex flex-wrap justify-between gap-8 text-center px-4">
          {[
            { value: '+1.2k', label: 'فني محترف' },
            { value: '+50k', label: 'طلب مكتمل' },
            { value: '4.8/5', label: 'متوسط التقييم' },
            { value: '24/7', label: 'دعم فني' },
          ].map((stat, i) => (
            <div key={i}>
              <h4 className="text-[2rem] md:text-[2.5rem] font-black text-primary mb-2">{stat.value}</h4>
              <p className="text-[1.1rem] text-text-secondary font-bold m-0">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-[90%] max-w-[1200px] mx-auto mb-16 px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-[2rem] font-extrabold text-text-primary mb-2">الخدمات المتاحة</h2>
            <p className="text-[1.1rem] text-text-secondary m-0">اختر القسم المناسب لمشكلتك</p>
          </div>
          <button onClick={() => openModal('تصفح جميع الخدمات', 'سجل حسابك لتتمكن من تصفح جميع الخدمات المتاحة واختيار الفني المناسب لك.', '📂')} className="text-primary font-bold text-[1.1rem] flex items-center gap-2 hover:opacity-80 transition-opacity">
            المزيد <span className="text-xl">←</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { icon: '🚰', name: 'سباكة', count: '1,204', modalTitle: 'تصفح فنيي السباكة', modalSub: 'سجل حسابك لتتمكن من حجز فني سباكة محترف.' },
            { icon: '⚡', name: 'كهرباء', count: '850', modalTitle: 'خدمات الكهرباء', modalSub: 'سجل حسابك لتتمكن من حجز كهربائي معتمد.' },
            { icon: '🪚', name: 'نجارة', count: '430', modalTitle: 'خدمات النجارة', modalSub: 'سجل حسابك لتتمكن من تصفح فنيي النجارة وحجز موعد.' },
            { icon: '🖨️', name: 'نقاشة ودهان', count: '620', modalTitle: 'خدمات الدهانوالنقاشة', modalSub: 'سجل حسابك للوصول إلى أفضل فنيي الدهان والنقاشة.' },
            { icon: '❄️', name: 'تكييفات', count: '512', modalTitle: 'خدمات التكييفات', modalSub: 'سجل حسابك واحجز فني صيانة تكييف محترف في منطقتك.' },
          ].map((cat, i) => (
            <div key={i} onClick={() => openModal(cat.modalTitle, cat.modalSub, cat.icon)} className="bg-white rounded-[24px] p-8 text-center border border-border transition-all shadow-sm cursor-pointer relative overflow-hidden group hover:-translate-y-3 hover:border-primary-soft hover:shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 origin-right transition-transform group-hover:scale-x-100"></div>
              <div className="w-[72px] h-[72px] bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-[32px] transition-colors group-hover:bg-primary group-hover:text-white">
                {cat.icon}
              </div>
              <div className="font-extrabold text-[1.2rem] mb-1">{cat.name}</div>
              <div className="text-text-secondary text-[0.95rem]">{cat.count} فني متاح</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="py-[100px] bg-primary/5 rounded-[64px] mb-[100px] w-[95%] max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-[60px]">
          <h2 className="text-[2rem] font-extrabold text-text-primary mb-2">كيف يعمل فيكس ات؟</h2>
          <p className="text-[1.1rem] text-text-secondary">ثلاث خطوات بسيطة لمنزل مثالي</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1000px] mx-auto relative relative-z-[2]">
          {[
            { num: '1', title: 'ابحث عن فني', desc: 'اختر الخدمة التي تحتاجها وتصفح أفضل الفنيين المتاحين بالقرب منك.' },
            { num: '2', title: 'اطلب الخدمة', desc: 'حدد الموعد المناسب لك وأرسل طلبك بضغطة واحدة.' },
            { num: '3', title: 'تمت المهمة', desc: 'سيصلك الفني في الموعد ويقوم بإنجاز المهمة بأعلى جودة.' },
          ].map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-[64px] h-[64px] bg-primary text-white rounded-[20px] flex items-center justify-center text-[1.5rem] font-black mx-auto mb-6 shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all group-hover:scale-110 group-hover:rotate-6">
                {step.num}
              </div>
              <h3 className="text-[1.4rem] font-extrabold mb-4">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-[100px] bg-primary/5 rounded-[64px] mb-[100px] w-[95%] max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-[50px]">
          <h2 className="text-[2rem] font-extrabold text-text-primary mb-2">ماذا يقول عملاؤنا؟</h2>
          <p className="text-[1.1rem] text-text-secondary">انضم لأكثر من 50,000 عميل يثقون في فيكس ات</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {[
            { img: '44', name: 'منى محمود', loc: 'عميلة من المعادي', review: '"الفني وصل في موعده تماماً وكان محترف جداً في التعامل. صلح الغسالة في وقت قياسي وبسعر ممتاز. شكراً فيكس ات على هذه الخدمة الرائعة!"' },
            { img: '11', name: 'ياسر علي', loc: 'عميل من مدينة نصر', review: '"التطبيق سهل الاستخدام جداً ولقيت فني سباكة شاطر قمت وحجزت معاه وخلص الشغل في نفس اليوم. تجربة ممتازة وفرت عليا وقت كتير."' },
            { img: '32', name: 'نهى إبراهيم', loc: 'عميلة من التجمع', review: '"أهم حاجة عندي هي الأمان، وفيكس ات بيديني الراحة دي لأن كل الفنيين متعودين ومعتمدين. برشحه لكل حد بيدور على جودة وأمان لبيته."' },
          ].map((tm, i) => (
            <div key={i} className="bg-white p-10 rounded-[32px] border border-border relative transition-all duration-400 flex flex-col gap-6 shadow-sm hover:-translate-y-2 hover:border-primary-soft hover:shadow-[0_20px_40px_rgba(255,107,53,0.08)]">
              <div className="absolute top-5 right-7 text-[5rem] text-primary opacity-10 font-serif leading-none">“</div>
              <div className="flex items-center gap-4">
                <img src={`https://i.pravatar.cc/100?img=${tm.img}`} alt={tm.name} className="w-[64px] h-[64px] rounded-[20px] object-cover border-[3px] border-white shadow-md" />
                <div>
                  <h4 className="text-[1.1rem] font-extrabold text-text-primary m-0">{tm.name}</h4>
                  <span className="text-[0.85rem] text-text-secondary font-bold">{tm.loc}</span>
                </div>
              </div>
              <div className="text-[1.1rem] text-text-primary leading-relaxed font-medium z-[1]">
                {tm.review}
              </div>
              <div className="inline-flex items-center gap-1.5 text-[0.8rem] text-green-500 font-bold mt-auto pt-4 border-t border-slate-100">
                <span>✓</span> تم التحقق من الخدمة
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App Download Section */}
      <div className="w-[90%] max-w-[1200px] mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#2e4482] rounded-[48px] p-10 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 mb-[120px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden relative">
        <div className="flex-1 z-[2]">
          <h2 className="text-[2.5rem] md:text-[3rem] font-black mb-6">حمّل تطبيقنا الآن</h2>
          <p className="text-[1.25rem] opacity-80 mb-10 leading-[1.6]">
            استمتع بتجربة أفضل وأسرع لحجز خدمات الصيانة من هاتفك مباشرة. متوفر الآن على أندرويد وآيفون.
          </p>
          <div className="flex gap-5 flex-wrap">
            <button onClick={() => openModal('تحميل التطبيق', 'سجل حسابك أولاً لتتمكن من الحصول على رابط تحميل التطبيق المخصص لهاتفك.', '📱')} className="bg-white text-[#0f172a] py-4 px-8 rounded-2xl font-extrabold flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-lg">
              App Store 📱
            </button>
            <button onClick={() => openModal('تحميل التطبيق', 'سجل حسابك أولاً لتتمكن من الحصول على رابط تحميل التطبيق المخصص لهاتفك.', '📱')} className="bg-white text-[#0f172a] py-4 px-8 rounded-2xl font-extrabold flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-lg">
              Google Play ▶️
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 pt-[100px] pb-10 border-t border-border mt-auto">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[60px] mb-[60px]">
            <div className="lg:col-span-1.5">
              <h2 className="text-[2rem] font-black text-primary mb-5">FixIt<span className="text-[#4db8a8] -mr-1">.</span></h2>
              <p className="text-text-secondary leading-[1.6] mb-8">
                المنصة الرائدة لخدمات الصيانة المنزلية في مصر. نجمع لك أمهر الفنيين وأفضل الأسعار لضمان جودة منزلك وراحتك.
              </p>
              <div className="flex gap-4">
                {['FB', 'IG', 'TW'].map(social => (
                  <a key={social} href="#" className="w-[44px] h-[44px] rounded-full bg-white border border-border flex items-center justify-center text-text-secondary transition-all hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-[1.1rem] font-extrabold mb-6">روابط سريعة</h3>
              <ul className="list-none p-0 m-0 space-y-3">
                <li><Link to="/" className="text-text-secondary hover:text-primary transition-colors">الرئيسية</Link></li>
                <li><button onClick={() => openModal()} className="text-text-secondary hover:text-primary transition-colors">تصفح الفنيين</button></li>
                <li><button onClick={() => openModal('متابعة طلباتك', 'تحتاج لتسجيل الدخول لمتابعة حالة طلبات الصيانة الخاصة بك.', '📝')} className="text-text-secondary hover:text-primary transition-colors">متابعة طلباتك</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[1.1rem] font-extrabold mb-6">أقسام شهيرة</h3>
              <ul className="list-none p-0 m-0 space-y-3">
                {['سباكة', 'كهرباء', 'تكييفات', 'نجارة'].map(cat => (
                  <li key={cat}><button onClick={() => openModal()} className="text-text-secondary hover:text-primary transition-colors">{cat}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[1.1rem] font-extrabold mb-6">تواصل معنا</h3>
              <ul className="list-none p-0 m-0 space-y-3 text-text-secondary">
                <li>مركز المساعدة</li>
                <li>الشكاوى والمقترحات</li>
                <li className="font-bold flex items-center gap-2 mt-4" dir="ltr">📞 19999</li>
                <li className="text-primary font-bold">support@fixit.com.eg</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-10 border-t border-border mb-0 text-text-secondary text-[0.9rem]">
            &copy; 2026 فيكس ات للخدمات المنزلية - جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>

      <AuthGateModal />
    </div>
  );
}
