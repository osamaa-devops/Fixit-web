import { Bell, Briefcase, Star, AlertTriangle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface Notification {
  id: number;
  type: 'new_job' | 'review' | 'system';
  text: string;
  time: string;
  unread: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: 'new_job', text: 'لديك طلب عمل جديد (تغيير خلاط مياه) في منطقة مدينة نصر.', time: 'منذ 5 دقائق', unread: true },
  { id: 2, type: 'review', text: 'تهانينا! حصلت للتو على تقييم 5 نجوم من العميل أحمد محمود.', time: 'منذ ساعتين', unread: true },
  { id: 3, type: 'system', text: 'تذكير: يرجى تحديث النطاق الجغرافي الخاص بك لتلقي الطلبات الأقرب إليك.', time: 'منذ يومين', unread: false },
];

export function HandymanNotifications() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#e2e8f0] p-4 md:p-8 font-sans animate-fade-in-up">
      <div className="max-w-[800px] mx-auto">
      <div className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[40px] shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-white/40 flex justify-between items-center">
          <h1 className="text-[1.8rem] font-black text-[#1a1a1a] flex items-center gap-3">الإشعارات <span className="text-2xl">🔔</span></h1>
          <button className="text-[#4db8a8] font-black text-[0.95rem] hover:text-[#3aa394] hover:underline transition-all">تحديد الكل كمقروء</button>
        </div>

        <div className="flex flex-col">
          {NOTIFICATIONS.map((n, idx) => (
             <div 
              key={n.id} 
              className={clsx(
                "flex items-start gap-5 p-6 md:p-8 cursor-pointer border-b border-black/5 hover:bg-white/80 transition-all group animate-fade-in-up",
                n.unread && "bg-[#4db8a8]/5 border-r-4 border-r-[#4db8a8]"
              )}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className={clsx(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                n.type === 'new_job' ? "bg-blue-100 text-blue-500" : 
                n.type === 'review' ? "bg-emerald-100 text-emerald-500" : 
                "bg-amber-100 text-amber-500"
              )}>
                {n.type === 'new_job' && <Briefcase size={22} />}
                {n.type === 'review' && <Star size={22} />}
                {n.type === 'system' && <AlertTriangle size={22} />}
              </div>
              
              <div className="flex-1">
                <p className={clsx("text-[1.05rem] text-[#1a1a1a] mb-2 leading-relaxed", n.unread ? "font-black" : "font-bold")}>
                  {n.text}
                </p>
                <div className="flex items-center gap-1.5 text-[0.85rem] text-[#555555] font-bold">
                  <Clock size={14} />
                  {n.time}
                </div>
              </div>

              {n.unread && (
                <div className="w-2.5 h-2.5 bg-[#4db8a8] rounded-full mt-3 shrink-0 shadow-[0_0_10px_rgba(77,184,168,0.5)]"></div>
              )}
            </div>
          ))}
          {NOTIFICATIONS.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
              <Bell size={48} className="text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">لا توجد إشعارات حالياً</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
