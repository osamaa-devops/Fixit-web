import { useState } from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';

interface Review {
  id: number;
  reviewer: {
    name: string;
    avatar: string;
    initial: string;
    color: string;
  };
  rating: number;
  date: string;
  comment: string;
  job: string;
}

const REVIEWS: Review[] = [
  { id: 1, reviewer: { name: 'سارة أحمد', avatar: '', initial: 'س', color: 'from-[#667eea] to-[#764ba2]' }, rating: 5, date: '12 فبراير 2026', comment: 'فني محترف جداً ومواعيده دقيقة. قام بإصلاح عطل السباكة بسرعة وبجودة عالية. أنصح بالتعامل معه بشدة.', job: '🔧 تركيب سخان جاز' },
  { id: 2, reviewer: { name: 'أيمن كمال', avatar: '', initial: 'أ', color: 'from-[#f59e0b] to-[#d97706]' }, rating: 5, date: '5 فبراير 2026', comment: 'ممتاز وسريع جداً. السعر كان مناسب جداً للخدمة المقدمة. سأتعامل معه مرة أخرى بالتأكيد.', job: '🚿 إصلاح تسريب مياه' },
  { id: 3, reviewer: { name: 'منى رضا', avatar: '', initial: 'م', color: 'from-[#3b82f6] to-[#1d4ed8]' }, rating: 4, date: '28 يناير 2026', comment: 'العمل كان ممتازاً والفني محترم ونظيف في العمل. تأخر قليلاً عن الموعد المحدد لكن نفهم الظروف.', job: '💧 تأسيس سباكة حمام' },
  { id: 4, reviewer: { name: 'هناء سليم', avatar: '', initial: 'هـ', color: 'from-[#10b981] to-[#059669]' }, rating: 5, date: '20 يناير 2026', comment: 'أفضل فني تعاملت معه على الإطلاق. أحضر جميع الأدوات اللازمة، أنجز العمل في وقت قياسي وبجودة استثنائية.', job: '🔧 تغيير خلاط مياه' },
];

export function HandymanReviews() {
  const [filter, setFilter] = useState<number | 'all'>('all');

  const filtered = REVIEWS.filter(r => filter === 'all' || r.rating === filter);

  const starCounts = [5, 4, 3, 2, 1].map(s => ({
    stars: s,
    count: REVIEWS.filter(r => r.rating === s).length,
    percent: (REVIEWS.filter(r => r.rating === s).length / REVIEWS.length) * 100
  }));

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-8 animate-fade-in-up">
      {/* Rating Summary Hero */}
      <div className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[28px] p-8 md:p-10 shadow-xl mb-8 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10 items-center">
        <div className="text-center">
          <div className="text-[5rem] font-black text-[#4db8a8] leading-none mb-2">4.9</div>
          <div className="flex justify-center gap-1 text-[#f59e0b] text-[1.4rem] mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#f59e0b" />)}
          </div>
          <div className="text-[0.9rem] text-[#555555] font-bold">من أصل 48 تقييم</div>
        </div>
        
        <div className="space-y-3">
          {starCounts.map(item => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="w-8 text-[0.9rem] font-bold text-[#555555]">{item.stars} ★</span>
              <div className="flex-1 h-2.5 bg-black/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-l from-[#4db8a8] to-[#3aa394] rounded-full transition-all duration-1000"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="w-8 text-left text-[0.9rem] font-bold text-[#555555]">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        <button 
          onClick={() => setFilter('all')}
          className={clsx(
            "px-5 py-2 rounded-full font-bold text-[0.85rem] border-2 transition-all",
            filter === 'all' ? "bg-[#4db8a8]/10 border-[#4db8a8] text-[#4db8a8]" : "bg-white border-transparent text-[#555555] hover:border-slate-200"
          )}
        >
          الكل (48)
        </button>
        {[5, 4, 3].map(s => (
          <button 
            key={s}
            onClick={() => setFilter(s)}
            className={clsx(
              "px-5 py-2 rounded-full font-bold text-[0.85rem] border-2 transition-all",
              filter === s ? "bg-[#4db8a8]/10 border-[#4db8a8] text-[#4db8a8]" : "bg-white border-transparent text-[#555555] hover:border-slate-200"
            )}
          >
            {[...Array(s)].map((_, i) => <Star key={i} size={14} className="inline mr-0.5" fill="currentColor" />)} ({starCounts.find(sc => sc.stars === s)?.count || 0})
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.map((review, idx) => (
          <div 
            key={review.id} 
            className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[24px] p-6 md:p-8 shadow-xl animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className={clsx("w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[1.3rem] font-black text-white bg-gradient-to-br", review.reviewer.color)}>
                {review.reviewer.initial}
              </div>
              <div>
                <div className="font-black text-[1rem] mb-0.5">{review.reviewer.name}</div>
                <div className="flex gap-0.5 text-[#f59e0b]">
                   {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" />)}
                   {[...Array(5 - review.rating)].map((_, i) => <Star key={i} size={14} className="text-slate-200" />)}
                </div>
                <div className="text-[0.8rem] text-[#555555] font-bold mt-1">{review.date}</div>
              </div>
            </div>
            <div className="bg-white/40 p-4 rounded-2xl text-[#555555] leading-relaxed font-bold">
              {review.comment}
            </div>
            <span className="inline-block mt-4 bg-[#4db8a8]/10 text-[#3aa394] px-3 py-1 rounded-lg text-[0.8rem] font-black">
              {review.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
