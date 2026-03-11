import { Link } from 'react-router-dom';
import { Users, Briefcase, Clock, Star, TrendingUp, CheckCircle, UserPlus, AlertTriangle } from 'lucide-react';

const KPI_CARDS = [
  {
    title: 'العملاء النشطين', value: '1,248', trend: '+12% عن الشهر الماضي', up: true,
    icon: <Users size={28} strokeWidth={2}/>, color: { bg: 'bg-blue-500/10', text: 'text-blue-400' }
  },
  {
    title: 'الفنيين المعتمدين', value: '342', trend: '+5 فنيين جدد هذا الأسبوع', up: true,
    icon: <Briefcase size={28} strokeWidth={2}/>, color: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' }
  },
  {
    title: 'الطلبات الحالية (اليوم)', value: '56', trend: '24 قيد التنفيذ الآن', up: null,
    icon: <Clock size={28} strokeWidth={2}/>, color: { bg: 'bg-amber-500/10', text: 'text-amber-400' }
  },
  {
    title: 'متوسط التقييم العام', value: '4.6', valueSuffix: '/5', trend: 'ممتاز بناءً على 850 طلب', up: true,
    icon: <Star size={28} strokeWidth={2}/>, color: { bg: 'bg-purple-500/10', text: 'text-purple-400' }
  }
];

const RECENT_REQUESTS = [
  { id: 'FIX-2201', customer: 'كريم أحمد', handyman: 'محمد علي (سباكة)', district: 'مدينة نصر', status: 'active' },
  { id: 'FIX-2200', customer: 'سامي كمال', handyman: 'فيصل كمال (كهرباء)', district: 'حلوان', status: 'active' },
  { id: 'FIX-2199', customer: 'نورا منصور', handyman: 'بانتظار فني', district: 'التجمع الخامس', status: 'pending' },
  { id: 'FIX-2198', customer: 'طارق سعيد', handyman: 'أحمد خالد (سباكة)', district: 'مصر الجديدة', status: 'active' },
  { id: 'FIX-2195', customer: 'هند إبراهيم', handyman: 'سعيد محمود (نجارة)', district: 'الدقي', status: 'completed' },
];

const ACTIVITY_FEED = [
  { icon: <UserPlus size={18}/>, color: 'text-blue-400 bg-blue-900/30 border-blue-800', title: 'فني جديد بانتظار الموافقة', desc: 'أحمد علي — سباكة — القاهرة', time: 'منذ 5 دقائق' },
  { icon: <AlertTriangle size={18}/>, color: 'text-red-400 bg-red-900/30 border-red-800', title: 'شكوى جديدة', desc: 'من العميل: سامي كمال ضد الفني: فيصل', time: 'منذ 18 دقيقة' },
  { icon: <CheckCircle size={18}/>, color: 'text-emerald-400 bg-emerald-900/30 border-emerald-800', title: 'تم اعتماد فني جديد', desc: 'يوسف صالح — كهرباء — الجيزة', time: 'منذ 45 دقيقة' },
  { icon: <UserPlus size={18}/>, color: 'text-blue-400 bg-blue-900/30 border-blue-800', title: '3 فنيين جدد بانتظار المراجعة', desc: 'نجارة (2) + تكييف (1)', time: 'منذ ساعة' },
];

export function AdminDashboard() {
  return (
    <div className="p-8 text-white font-sans">
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {KPI_CARDS.map((kpi, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-8 flex items-center gap-6 transition-all hover:-translate-y-2 hover:border-white/10 hover:bg-white/[0.08]">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${kpi.color.bg} ${kpi.color.text}`}>
              {kpi.icon}
            </div>
            <div className="flex-1">
              <h3 className="m-0 mb-1 text-[0.9rem] text-slate-400 font-bold">{kpi.title}</h3>
              <p className="m-0 mb-1 text-[1.75rem] font-black text-white">
                {kpi.value}
                {kpi.valueSuffix && <span className="text-[1rem] text-slate-400">{kpi.valueSuffix}</span>}
              </p>
              <p className={`m-0 text-[0.85rem] flex items-center gap-1.5 font-bold ${kpi.up === true ? 'text-emerald-400' : kpi.up === false ? 'text-red-400' : 'text-slate-400'}`}>
                {kpi.up === true && <TrendingUp size={14}/>}
                {kpi.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        
        {/* Recent Requests Table */}
        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
            <h2 className="m-0 font-extrabold text-[1.1rem]">أحدث الطلبات على المنصة</h2>
            <Link to="/admin/requests" className="text-blue-400 font-bold text-[0.9rem] hover:underline no-underline">عرض الكل</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['رقم الطلب', 'العميل', 'الفني (القسم)', 'المنطقة', 'الحالة'].map(h => (
                    <th key={h} className="text-right px-6 py-4 text-[0.85rem] text-slate-400 border-b border-white/5 bg-white/[0.02] font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_REQUESTS.map(req => (
                  <tr key={req.id} className="hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-b-0">
                    <td className="px-6 py-4 font-mono font-extrabold text-blue-400">{req.id}</td>
                    <td className="px-6 py-4 font-bold">{req.customer}</td>
                    <td className="px-6 py-4 text-slate-300 font-bold">{req.handyman}</td>
                    <td className="px-6 py-4 text-slate-300 font-bold">{req.district}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-[0.8rem] font-extrabold ${
                        req.status === 'active' ? 'bg-emerald-900/50 text-emerald-400' :
                        req.status === 'pending' ? 'bg-amber-900/50 text-amber-400' :
                        'bg-blue-900/50 text-blue-400'
                      }`}>
                        {req.status === 'active' ? 'قيد التنفيذ' : req.status === 'pending' ? 'بانتظار فني' : 'مكتمل'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5">
            <h2 className="m-0 font-extrabold text-[1.1rem]">آخر نشاطات المنصة</h2>
          </div>
          <div className="p-6 flex flex-col gap-6 relative">
            {ACTIVITY_FEED.map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {/* Connecting line */}
                {i < ACTIVITY_FEED.length - 1 && (
                  <div className="absolute right-[19px] top-[40px] bottom-[-24px] w-[2px] bg-white/5"></div>
                )}
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 z-10 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="m-0 mb-1 font-extrabold text-[0.95rem]">{item.title}</h4>
                  <p className="m-0 text-[0.85rem] text-slate-400 font-bold">{item.desc}</p>
                  <p className="m-0 mt-1 text-[0.75rem] text-slate-500 font-bold">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
