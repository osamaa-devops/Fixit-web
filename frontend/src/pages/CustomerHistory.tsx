import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, MapPin, Star } from 'lucide-react';
import { clsx } from 'clsx';

type ReqStatus = 'active' | 'completed' | 'cancelled' | 'pending';

interface HistoryItem {
  id: string;
  title: string;
  handyman: string;
  handymanRating: number;
  date: string;
  district: string;
  status: ReqStatus;
  canReview: boolean;
}

const HISTORY: HistoryItem[] = [
  { id: 'FIX-2201', title: 'تغيير خلاط مياه وتصليح تسريب', handyman: 'محمد علي سعيد', handymanRating: 4.9, date: 'اليوم، 3:30 م', district: 'مدينة نصر', status: 'active', canReview: false },
  { id: 'FIX-2150', title: 'تركيب سخان غاز', handyman: 'خالد سيد', handymanRating: 4.7, date: 'أمس، 11:00 ص', district: 'الدقي', status: 'completed', canReview: true },
  { id: 'FIX-2142', title: 'صيانة طلمبة مياه', handyman: 'سعيد محمود', handymanRating: 4.5, date: '2 يناير 2024', district: 'شبرا', status: 'cancelled', canReview: false },
  { id: 'FIX-2130', title: 'تأسيس سباكة حمام جديد', handyman: 'عمرو حسن', handymanRating: 4.8, date: '25 ديسمبر 2023', district: 'مصر الجديدة', status: 'completed', canReview: false },
  { id: 'FIX-2119', title: 'تصليح حنفية المطبخ', handyman: 'يوسف كمال', handymanRating: 4.6, date: '10 ديسمبر 2023', district: 'المهندسين', status: 'completed', canReview: false },
];

const STATUS_MAP: Record<ReqStatus, { label: string; cls: string; icon: React.ReactNode }> = {
  active: { label: 'جارٍ الآن', cls: 'bg-blue-500/10 text-blue-500', icon: <Clock size={13}/> },
  pending: { label: 'بانتظار فني', cls: 'bg-amber-500/10 text-amber-500', icon: <Clock size={13}/> },
  completed: { label: 'مكتمل', cls: 'bg-emerald-500/10 text-emerald-600', icon: <CheckCircle size={13}/> },
  cancelled: { label: 'ملغي', cls: 'bg-red-500/10 text-red-500', icon: <XCircle size={13}/> },
};

export function CustomerHistory() {
  const [filter, setFilter] = useState<ReqStatus | 'all'>('all');

  const filtered = filter === 'all' ? HISTORY : HISTORY.filter(r => r.status === filter);

  return (
    <div className="w-[95%] max-w-[900px] mx-auto mt-10 mb-20 font-sans text-text-primary fade-in-up">
      
      <h1 className="text-[2rem] font-black mb-2">سجل طلباتي</h1>
      <p className="text-text-secondary font-bold mb-8">جميع طلبات الخدمة التي قدمتها عبر المنصة</p>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(['all', 'active', 'pending', 'completed', 'cancelled'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={clsx(
            "px-5 py-2 rounded-xl font-extrabold text-[0.9rem] border transition-all",
            filter === f ? "bg-primary/10 text-primary border-primary/30" : "bg-white/60 text-text-secondary border-white/40 hover:bg-white hover:text-text-primary"
          )}>
            {f === 'all' ? 'الكل' : STATUS_MAP[f].label}
          </button>
        ))}
      </div>

      {/* Request Cards */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <div className="bg-white/60 rounded-[28px] p-12 text-center border border-white/40">
            <div className="text-4xl mb-4">📋</div>
            <p className="font-extrabold text-text-secondary">لا توجد طلبات في هذه الفئة</p>
          </div>
        )}
        {filtered.map((req, i) => {
          const s = STATUS_MAP[req.status];
          return (
            <div key={req.id} className="bg-white/70 backdrop-blur-[20px] rounded-[28px] p-6 md:p-8 border border-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center gap-4 md:gap-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono text-[0.85rem] text-secondary font-extrabold">#{req.id}</span>
                  <span className={clsx("flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.8rem] font-extrabold", s.cls)}>
                    {s.icon} {s.label}
                  </span>
                </div>
                <h3 className="m-0 mb-2 text-[1.1rem] font-black">{req.title}</h3>
                <div className="flex flex-wrap gap-4 text-[0.85rem] text-text-secondary font-bold">
                  <span className="flex items-center gap-1.5"><MapPin size={13}/>{req.district}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13}/>{req.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-[0.9rem] text-text-secondary font-bold">
                  <span>الفني: <span className="text-text-primary font-extrabold">{req.handyman}</span></span>
                  <span className="flex items-center gap-1 text-amber-400 font-black">
                    <Star size={13} fill="currentColor"/> {req.handymanRating}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap md:flex-nowrap shrink-0">
                {req.status === 'active' && (
                  <Link to={`/customer/track/${req.id}`} className="no-underline">
                    <button className="px-6 py-3 bg-secondary text-white rounded-xl font-extrabold text-[0.9rem] hover:bg-teal-600 transition-all">تتبع الطلب</button>
                  </Link>
                )}
                {req.canReview && (
                  <button className="px-6 py-3 bg-amber-400/10 text-amber-600 border border-amber-400/30 rounded-xl font-extrabold text-[0.9rem] hover:bg-amber-400 hover:text-white transition-all">
                    ⭐ تقييم الفني
                  </button>
                )}
                {(req.status === 'completed' || req.status === 'cancelled') && (
                  <button className="px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl font-extrabold text-[0.9rem] hover:bg-primary hover:text-white transition-all">
                    إعادة الحجز
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
