import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Briefcase, CheckCircle, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';

type TabId = 'portfolio' | 'reviews' | 'about';

const REVIEWS = [
  { name: 'كريم أحمد', rating: 5, date: 'يناير 2024', text: 'عمل ممتاز ونظيف جداً. أنصح به بشدة.' },
  { name: 'سارة أحمد', rating: 5, date: 'ديسمبر 2023', text: 'محترف ومتفاني. حل المشكلة في وقت قياسي.' },
  { name: 'طارق سعيد', rating: 4, date: 'نوفمبر 2023', text: 'عمل جيد والتزام بالموعد.' },
];

const PHOTOS = [
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop',
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={16} strokeWidth={2} className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}/>
      ))}
    </div>
  );
}

export function HandymanProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabId>('portfolio');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'portfolio', label: '📷 معرض الأعمال' },
    { id: 'reviews', label: '⭐ التقييمات' },
    { id: 'about', label: '📋 عن الفني' },
  ];

  return (
    <div className="w-[95%] max-w-[1200px] mx-auto mt-10 mb-20 font-sans text-text-primary fade-in-up">
      
      {/* Hero Card */}
      <div className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[40px] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.08)] mb-8 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8 pb-8 border-b border-black/5">
          <img
            src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=300&h=300&fit=crop"
            alt="محمد علي سعيد"
            className="w-[130px] h-[130px] rounded-[36px] object-cover shadow-[0_20px_40px_rgba(0,0,0,0.12)] border-4 border-white shrink-0"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-[2rem] font-black text-text-primary m-0">محمد علي سعيد</h1>
              <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[0.85rem] font-extrabold flex items-center gap-1">
                <CheckCircle size={14}/> فني معتمد
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-text-secondary font-bold mb-4">
              <span className="flex items-center gap-2"><Briefcase size={16}/> سباكة وتأسيس صحي</span>
              <span className="flex items-center gap-2"><MapPin size={16}/> القاهرة • مدينة نصر، مصر الجديدة، التجمع</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <StarRating rating={5}/>
                <span className="font-black text-[1.1rem] text-amber-500">4.9</span>
                <span className="text-text-secondary font-bold">(127 تقييم)</span>
              </div>
              <span className="w-[4px] h-[4px] bg-black/20 rounded-full hidden md:block"></span>
              <span className="font-bold text-text-secondary">عضو منذ 2021</span>
              <span className="w-[4px] h-[4px] bg-black/20 rounded-full hidden md:block"></span>
              <span className="font-bold text-text-secondary">215 مهمة مكتملة</span>
            </div>
          </div>
          <a href={`/customer/book/${id || '1'}`} className="text-decoration-none">
            <button className="px-8 py-4 bg-primary text-white rounded-[20px] font-black text-[1.1rem] shadow-[0_8px_20px_rgba(255,107,53,0.25)] hover:scale-105 hover:shadow-[0_12px_28px_rgba(255,107,53,0.35)] transition-all shrink-0">
              📅 احجز الآن
            </button>
          </a>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '4.9★', lbl: 'التقييم العام' },
            { val: '215', lbl: 'مهمة منجزة' },
            { val: '10+', lbl: 'سنوات خبرة' },
            { val: '98%', lbl: 'نسبة الرضا' },
          ].map(s => (
            <div key={s.lbl} className="bg-white/50 rounded-2xl p-4 text-center border border-black/5 hover:bg-white transition-all">
              <div className="font-black text-[1.4rem] text-primary">{s.val}</div>
              <div className="text-[0.85rem] text-text-secondary font-bold mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-white/40 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "px-6 py-3 rounded-xl font-extrabold text-[0.95rem] transition-all",
              activeTab === tab.id
                ? "bg-white text-text-primary shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'portfolio' && (
        <div className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up">
          <h2 className="flex items-center gap-3 text-[1.3rem] font-black mb-6">
            <ImageIcon className="text-primary" size={24}/> معرض الأعمال
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PHOTOS.map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-[20px] overflow-hidden border border-white/40 cursor-pointer transition-all hover:scale-[1.03] hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:border-primary/30">
                <img src={src} alt={`عمل ${i+1}`} className="w-full h-full object-cover"/>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up">
          <h2 className="flex items-center gap-3 text-[1.3rem] font-black mb-6">
            <MessageSquare className="text-primary" size={24}/> تقييمات العملاء
          </h2>
          <div className="flex flex-col gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white/50 rounded-2xl p-6 border border-black/5 hover:bg-white transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-teal-600 text-white rounded-xl flex items-center justify-center font-black">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-extrabold">{r.name}</div>
                    <div className="text-[0.8rem] text-text-secondary font-bold">{r.date}</div>
                  </div>
                  <div className="mr-auto">
                    <StarRating rating={r.rating}/>
                  </div>
                </div>
                <p className="m-0 text-text-secondary font-bold leading-[1.7]">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up">
          <h2 className="flex items-center gap-3 text-[1.3rem] font-black mb-6">
            عن الفني
          </h2>
          <p className="text-text-secondary font-bold leading-[1.8] text-[1.05rem] mb-8">
            فني سباكة وتأسيس صحي بخبرة تتجاوز 10 سنوات في مجال الصيانة المنزلية. متخصص في تركيب وإصلاح أنظمة السباكة، تغيير الخلاطات والتواليت، إصلاح التسريبات، وتأسيس الحمامات والمطابخ.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'التخصص', value: 'سباكة وتأسيس صحي' },
              { label: 'المحافظة', value: 'القاهرة' },
              { label: 'المناطق', value: 'مدينة نصر، مصر الجديدة، التجمع الخامس' },
              { label: 'ساعات العمل', value: 'السبت - الأربعاء، 9 ص - 10 م' },
            ].map(item => (
              <div key={item.label} className="bg-white/50 rounded-2xl p-5 border border-black/5">
                <span className="block text-text-secondary font-extrabold text-[0.85rem] mb-1">{item.label}</span>
                <span className="font-black text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
