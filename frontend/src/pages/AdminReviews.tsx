import { useState } from 'react';
import { Star, Flag, CheckCircle, Eye, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

type ReviewStatus = 'pending' | 'resolved' | 'dismissed';
interface Review {
  id: string; customer: string; handyman: string; rating: number;
  comment: string; date: string; flagged: boolean; status: ReviewStatus;
}

const REVIEWS: Review[] = [
  { id: 'REV-449', customer: 'كريم أحمد', handyman: 'محمد علي', rating: 1, comment: 'الفني لم يصل في الموعد وترك العمل غير مكتمل!', date: 'اليوم 2:00 م', flagged: true, status: 'pending' },
  { id: 'REV-448', customer: 'سارة أحمد', handyman: 'فيصل كمال', rating: 2, comment: 'جودة العمل سيئة، أضطررت لاستدعاء فني آخر.', date: 'اليوم 12:30 م', flagged: true, status: 'pending' },
  { id: 'REV-447', customer: 'طارق سعيد', handyman: 'خالد سيد', rating: 5, comment: 'ممتاز جداً، سريع ونظيف.', date: 'أمس 5:00 م', flagged: false, status: 'resolved' },
  { id: 'REV-446', customer: 'نورا منصور', handyman: 'سعيد محمود', rating: 4, comment: 'عمل جيد وأسعار معقولة.', date: 'أمس 3:00 م', flagged: false, status: 'resolved' },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => <Star key={i} size={13} className={i<=n ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}/>)}
    </div>
  );
}

export function AdminReviews() {
  const [filter, setFilter] = useState<'all' | 'flagged' | 'pending'>('all');

  const flagged = REVIEWS.filter(r => r.flagged && r.status === 'pending');
  const filtered = REVIEWS.filter(r => {
    if (filter === 'flagged') return r.flagged;
    if (filter === 'pending') return r.status === 'pending';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0f19] p-8 text-white font-sans animate-fade-in-up">
      <div className="max-w-[1600px] mx-auto">
      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <Flag size={22} className="text-red-400"/>
          <div><div className="font-black text-[1.4rem] text-red-400">{flagged.length}</div><div className="text-[0.8rem] text-slate-400 font-bold">شكاوى تنتظر مراجعة</div></div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <AlertTriangle size={22} className="text-amber-400"/>
          <div><div className="font-black text-[1.4rem] text-amber-400">{REVIEWS.filter(r=>r.rating<=2).length}</div><div className="text-[0.8rem] text-slate-400 font-bold">تقييمات منخفضة</div></div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <CheckCircle size={22} className="text-emerald-400"/>
          <div><div className="font-black text-[1.4rem] text-emerald-400">{REVIEWS.filter(r=>r.status==='resolved').length}</div><div className="text-[0.8rem] text-slate-400 font-bold">تمت معالجتها</div></div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'flagged', 'pending'] as const).map(f => (
          <button key={f} onClick={()=>setFilter(f)} className={clsx("px-5 py-2.5 rounded-xl text-[0.85rem] font-extrabold border transition-all", filter===f ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10")}>
            {f==='all' ? 'الكل' : f==='flagged' ? '🚩 مُبلَّغ عنها' : '⏳ معلقة'}
          </button>
        ))}
      </div>

      {/* Review Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map(rev => (
          <div key={rev.id} className={clsx("bg-white/5 border rounded-2xl p-6 transition-all", rev.flagged && rev.status==='pending' ? "border-red-500/30" : "border-white/5")}>
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono text-[0.8rem] text-blue-400 font-extrabold">{rev.id}</span>
                  <Stars n={rev.rating}/>
                  {rev.flagged && <span className="flex items-center gap-1 bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full text-[0.75rem] font-extrabold"><Flag size={10}/> مُبلَّغ عنه</span>}
                  <span className={clsx("px-2 py-0.5 rounded-full text-[0.75rem] font-extrabold", rev.status==='pending' ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400")}>
                    {rev.status==='pending' ? 'معلق' : 'تمت المعالجة'}
                  </span>
                </div>
                <p className="m-0 mb-3 font-bold leading-[1.7] text-slate-200">"{rev.comment}"</p>
                <div className="flex flex-wrap gap-4 text-[0.82rem] text-slate-400 font-bold">
                  <span>العميل: <span className="text-white">{rev.customer}</span></span>
                  <span>الفني: <span className="text-white">{rev.handyman}</span></span>
                  <span>{rev.date}</span>
                </div>
              </div>
              {rev.status === 'pending' && (
                <div className="flex gap-2 shrink-0 flex-wrap">
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-white/5 text-slate-300 border border-white/10 rounded-xl text-[0.85rem] font-extrabold hover:bg-white/10 transition-all"><Eye size={14}/> عرض التفاصيل</button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[0.85rem] font-extrabold hover:bg-emerald-500 hover:text-white transition-all"><CheckCircle size={14}/> تمت المعالجة</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
