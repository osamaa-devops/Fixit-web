import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { HandymanCard } from '../components/shared/HandymanCard';
import { handymanService } from '../services/handyman.service';

export function CustomerHome() {
  // Fetch top-rated handymen from API
  const { data: topHandymen = [], isLoading } = useQuery({
    queryKey: ['topHandymen'],
    queryFn: () => handymanService.searchHandymen({ minRating: 4.5, available: true }),
  });

  return (
    <div className="pt-8 pb-20 fade-in-up">
      
      {/* Hero Banner */}
      <div className="w-[95%] max-w-[1400px] mx-auto min-h-[520px] rounded-[32px] p-10 md:p-20 relative bg-gradient-to-br from-[#1a0800] via-[#c94b1f] to-[#ff8c42] text-white flex items-center justify-between overflow-hidden shadow-[0_40px_80px_rgba(255,107,53,0.25)] z-10 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/80 before:via-black/40 before:to-transparent before:z-0">
        
        <div className="z-10 max-w-[650px] relative">
          <h1 className="text-[2.5rem] md:text-[3rem] font-black mb-4 leading-[1.2]">
            صيانة بيتك<br />بين إيديك في ثواني
          </h1>
          <p className="text-[1.1rem] md:text-[1.25rem] opacity-90 mb-8 leading-[1.6]">
            سواء محتاج سباك، كهربائي، أو نجار.. فيكس إت بتقدم لك نخبة من أفضل الفنيين المعتمدين بضغطة زر.
          </p>

          {/* ✅ Search Box */}
          <div className="flex bg-white p-2 rounded-[20px] shadow-lg max-w-[580px] mt-10 transition-all focus-within:scale-[1.02] focus-within:shadow-xl border border-white/50">
            <input 
              type="text" 
              placeholder="عن إيه بتدور؟ (مثل: تصليح تكييف)" 
              className="flex-1 border-none outline-none bg-transparent px-5 text-[1.1rem] font-bold placeholder:font-medium"
              style={{
                color: '#0f172a',                // ✅ النص داكن
                background: 'transparent',
                caretColor: '#ff6b35',           // ✅ لون الـ cursor
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            />
            <button className="bg-primary text-white border-none py-4 px-8 rounded-xl text-[1.1rem] font-bold cursor-pointer transition-colors hover:bg-primary-dark ml-1">
              بحث الآن
            </button>
          </div>
        </div>

        <div className="text-[160px] z-10 opacity-90 animate-[float_6s_ease-in-out_infinite] hidden lg:block ml-10">
          🛠️
        </div>

        <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 opacity-80 text-[0.9rem] font-bold">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          اكتشف المزيد
        </div>
      </div>

      {/* Main Container */}
      <div className="w-[90%] max-w-[1200px] mx-auto mt-16">
        
        {/* Categories Section */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-[2rem] font-extrabold text-text-primary m-0 mb-2">خدماتنا المميزة</h2>
              <p className="text-[1.1rem] text-text-secondary m-0 font-medium">اختر القسم اللتغطية احتياجاتك</p>
            </div>
            <Link to="/customer/browse" className="text-primary font-bold text-[1.1rem] flex items-center gap-2 hover:opacity-80 transition-opacity">
              عرض الكل
              <ArrowLeftIcon />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <CategoryCard title="سباكة"  icon="🚰" count={124} to="/customer/search?category=plumbing" />
            <CategoryCard title="كهرباء" icon="⚡" count={98}  to="/customer/search?category=elec" />
            <CategoryCard title="نجارة"  icon="🪚" count={85}  to="/customer/search?category=carp" />
            <CategoryCard title="تكييف"  icon="❄️" count={67}  to="/customer/search?category=ac" />
            <CategoryCard title="دهانات" icon="🖌️" count={54}  to="/customer/search?category=painting" />
            <CategoryCard title="نظافة"  icon="🧹" count={112} to="/customer/search?category=cleaning" />
          </div>
        </div>

        {/* Top Handymen Section */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-[2rem] font-extrabold text-text-primary m-0 mb-2">أفضل الفنيين تقييماً</h2>
              <p className="text-[1.1rem] text-text-secondary m-0 font-medium">متوفرين الآن لخدمتك في منطقتك</p>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border border-primary/20 border-t-primary mx-auto mb-4"></div>
              <p className="text-text-secondary">جاري تحميل الفنيين...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topHandymen.slice(0, 3).map(handyman => (
                <HandymanCard key={handyman.id} handyman={handyman} />
              ))}
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="py-[100px] px-8 bg-primary/5 rounded-[64px] mb-[100px] text-center mt-24">
          <h2 className="text-[2rem] font-extrabold text-text-primary m-0 mb-2">كيف تعمل منصة FixIt؟</h2>
          <p className="text-[1.1rem] text-text-secondary m-0 font-medium">خطوات بسيطة للحصول على أفضل خدمة</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-[60px] relative z-10">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary text-white rounded-[20px] flex items-center justify-center text-[1.5rem] font-black mx-auto mb-6 shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">1</div>
              <h3 className="text-[1.4rem] font-extrabold mb-4 text-text-primary">ابحث عن الخدمة</h3>
              <p className="text-text-secondary leading-[1.6] font-medium">اختر القسم المناسب وتصفح قائمة الفنيين المتاحين في منطقتك لتقديم الخدمة.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary text-white rounded-[20px] flex items-center justify-center text-[1.5rem] font-black mx-auto mb-6 shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">2</div>
              <h3 className="text-[1.4rem] font-extrabold mb-4 text-text-primary">اختر الفني المناسب</h3>
              <p className="text-text-secondary leading-[1.6] font-medium">قارن بين الفنيين من حيث التقييمات، الأسعار، والمسافة، ثم احجز موعدك.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary text-white rounded-[20px] flex items-center justify-center text-[1.5rem] font-black mx-auto mb-6 shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">3</div>
              <h3 className="text-[1.4rem] font-extrabold mb-4 text-text-primary">قيم تجربتك</h3>
              <p className="text-text-secondary leading-[1.6] font-medium">بعد انتهاء العمل، شارك تقييمك للفني لضمان استمرار جودة الخدمة لجميع المستخدمين.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Subcomponents ──────────────────────────────────────

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rotate-180">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

function CategoryCard({ title, icon, count, to }: { title: string; icon: string; count: number; to: string }) {
  return (
    <Link to={to} className="bg-white rounded-[24px] p-6 text-center text-text-primary border border-border transition-all duration-400 shadow-sm cursor-pointer relative overflow-hidden group hover:-translate-y-3 hover:border-primary-soft hover:shadow-xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 transition-transform duration-400 origin-right group-hover:scale-x-100"></div>
      <div className="w-[72px] h-[72px] bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-[32px] transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>
      <h2 className="font-extrabold text-[1.2rem] mb-1">{title}</h2>
      <span className="text-text-secondary font-medium text-[0.95rem]">{count} فني متاح</span>
    </Link>
  );
}