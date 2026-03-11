import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export function CustomerBrowse() {
  return (
    <div className="w-[95%] max-w-[1200px] mx-auto mt-12 mb-[100px] fade-in-up font-sans text-text-primary">
      
      <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <h1 className="text-[2.8rem] font-black m-0 mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-text-primary to-primary">
          ابحث عن الخدمة المناسبة
        </h1>
        <p className="text-[1.2rem] text-text-secondary font-extrabold max-w-[600px] mx-auto">
          اختر من بين تشكيلة واسعة من الخدمات المنزلية الموثوقة والمهنية
        </p>
      </div>

      <div className="w-full max-w-[600px] mx-auto mb-12 relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <input 
          type="text" 
          className="w-full py-5 pl-16 pr-8 bg-white border-2 border-white/40 rounded-3xl text-[1.1rem] font-bold shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all focus:outline-none focus:border-primary focus:shadow-[0_0_25px_rgba(255,107,53,0.15)]" 
          placeholder="ابحث عن كهرباء، سباكة، نجارة..." 
        />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
          <Search size={24} strokeWidth={3} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BrowseCategoryCard 
          title="سباكة" 
          desc="إصلاح التسريبات، تركيب الأحواض، وصيانة المواسير" 
          icon="🚰" 
          count={124} 
          delay="300ms"
          to="/customer/search?category=plumbing" 
        />
        <BrowseCategoryCard 
          title="كهرباء" 
          desc="تركيب الإضاءة، صيانة اللوحات، وفحص التوصيلات" 
          icon="⚡" 
          count={98} 
          delay="400ms"
          to="/customer/search?category=elec" 
        />
        <BrowseCategoryCard 
          title="نجارة" 
          desc="تركيب الأثاث، إصلاح الأبواب، وتجديد الأخشاب" 
          icon="🪚" 
          count={85} 
          delay="500ms"
          to="/customer/search?category=carp" 
        />
        <BrowseCategoryCard 
          title="تكييف" 
          desc="شحن فريون، فك وتركيب الوحدات، وتنظيف الفلاتر" 
          icon="❄️" 
          count={67} 
          delay="600ms"
          to="/customer/search?category=ac" 
        />
        <BrowseCategoryCard 
          title="دهانات" 
          desc="دهان الحوائط، تجديد الغرف، وعزل الأسطح" 
          icon="🖌️" 
          count={54} 
          delay="700ms"
          to="/customer/search?category=painting" 
        />
        <BrowseCategoryCard 
          title="نظافة" 
          desc="تنظيف المنازل، غسيل السجاد، وتعقيم الأثاث" 
          icon="🧹" 
          count={112} 
          delay="800ms"
          to="/customer/search?category=cleaning" 
        />
      </div>
    </div>
  );
}

function BrowseCategoryCard({ title, desc, icon, count, to, delay }: { title: string, desc: string, icon: string, count: number, to: string, delay: string }) {
  return (
    <Link 
      to={to} 
      className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[32px] p-10 text-center text-text-primary transition-all duration-400 flex flex-col items-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:-translate-y-2.5 hover:scale-[1.02] hover:border-primary hover:shadow-[0_30px_60px_rgba(255,107,53,0.12)] animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,107,53,0.05)_0%,transparent_70%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100 z-0 pointer-events-none"></div>
      
      <div className="w-[120px] h-[120px] text-[80px] leading-none transition-transform duration-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] z-10 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
        {icon}
      </div>
      
      <div className="z-10">
        <h2 className="text-[1.6rem] font-black m-0 mb-2">{title}</h2>
        <p className="text-[1rem] text-text-secondary font-bold leading-[1.4] m-0 mb-3">{desc}</p>
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[0.9rem] font-black inline-block mt-3">
          {count} فني متاح
        </span>
      </div>
    </Link>
  );
}
