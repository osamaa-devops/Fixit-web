import { useState } from 'react';
import { Clock, MapPin, Search, Filter, Eye } from 'lucide-react';
import { clsx } from 'clsx';

type ReqStatus = 'active' | 'pending' | 'completed' | 'cancelled';
interface Request {
  id: string; customer: string; phone: string; handyman: string;
  specialty: string; district: string; time: string; status: ReqStatus;
}

const REQUESTS: Request[] = [
  { id: 'FIX-2201', customer: 'كريم أحمد', phone: '010xxxxxxxx', handyman: 'محمد علي', specialty: 'سباكة', district: 'مدينة نصر', time: 'منذ 12 د', status: 'active' },
  { id: 'FIX-2200', customer: 'سامي كمال', phone: '011xxxxxxxx', handyman: 'فيصل كمال', specialty: 'كهرباء', district: 'حلوان', time: 'منذ 35 د', status: 'active' },
  { id: 'FIX-2199', customer: 'نورا منصور', phone: '012xxxxxxxx', handyman: 'بانتظار فني', specialty: 'سباكة', district: 'التجمع الخامس', time: 'منذ 50 د', status: 'pending' },
  { id: 'FIX-2198', customer: 'طارق سعيد', phone: '010xxxxxxxx', handyman: 'أحمد خالد', specialty: 'سباكة', district: 'مصر الجديدة', time: 'منذ 1 س', status: 'active' },
  { id: 'FIX-2197', customer: 'هند إبراهيم', phone: '015xxxxxxxx', handyman: 'سعيد محمود', specialty: 'نجارة', district: 'الدقي', time: 'منذ 2 س', status: 'completed' },
  { id: 'FIX-2195', customer: 'رامي عمر', phone: '011xxxxxxxx', handyman: 'خالد سيد', specialty: 'تكييف', district: 'المهندسين', time: 'منذ 3 س', status: 'cancelled' },
];

const STATUS_STYLE: Record<ReqStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-400',
  pending: 'bg-amber-500/10 text-amber-400',
  completed: 'bg-blue-500/10 text-blue-400',
  cancelled: 'bg-red-500/10 text-red-400',
};
const STATUS_LABEL: Record<ReqStatus, string> = {
  active: 'قيد التنفيذ', pending: 'بانتظار فني', completed: 'مكتمل', cancelled: 'ملغي',
};

export function AdminRequests() {
  const [filter, setFilter] = useState<ReqStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = REQUESTS.filter(r => {
    const matchStatus = filter === 'all' || r.status === filter;
    const matchSearch = !search || r.id.includes(search) || r.customer.includes(search) || r.handyman.includes(search);
    return matchStatus && matchSearch;
  });

  const counts = { active: REQUESTS.filter(r=>r.status==='active').length, pending: REQUESTS.filter(r=>r.status==='pending').length };

  return (
    <div className="p-8 text-white font-sans">
      {/* Live Counter Badges */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"/>
          <div><div className="font-black text-[1.4rem] text-emerald-400">{counts.active}</div><div className="text-[0.8rem] text-slate-400 font-bold">قيد التنفيذ الآن</div></div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <Clock size={22} className="text-amber-400"/>
          <div><div className="font-black text-[1.4rem] text-amber-400">{counts.pending}</div><div className="text-[0.8rem] text-slate-400 font-bold">بانتظار فني</div></div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-3">
          <div><div className="font-black text-[1.4rem]">{REQUESTS.length}</div><div className="text-[0.8rem] text-slate-400 font-bold">إجمالي اليوم</div></div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث برقم الطلب، الاسم..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white font-bold outline-none focus:border-blue-400 transition-all text-[0.9rem]"/>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={16} className="text-slate-400 shrink-0"/>
          {(['all', 'active', 'pending', 'completed', 'cancelled'] as const).map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={clsx("px-4 py-2 rounded-xl text-[0.85rem] font-extrabold border transition-all", filter===f ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10")}>
              {f==='all' ? 'الكل' : STATUS_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>{['رقم الطلب','العميل','الفني','التخصص','المنطقة','الوقت','الحالة','إجراء'].map(h=>(
                <th key={h} className="text-right px-5 py-4 text-[0.8rem] text-slate-400 border-b border-white/5 bg-white/[0.02] font-bold">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="px-5 py-4 font-mono font-extrabold text-blue-400 text-[0.85rem]">{r.id}</td>
                  <td className="px-5 py-4"><div className="font-extrabold">{r.customer}</div><div className="text-[0.75rem] text-slate-400 font-bold">{r.phone}</div></td>
                  <td className="px-5 py-4 font-bold text-slate-300">{r.handyman}</td>
                  <td className="px-5 py-4 font-bold text-slate-300">{r.specialty}</td>
                  <td className="px-5 py-4 font-bold text-slate-300 flex items-center gap-1.5"><MapPin size={12}/>{r.district}</td>
                  <td className="px-5 py-4 text-[0.8rem] text-slate-400 font-bold">{r.time}</td>
                  <td className="px-5 py-4"><span className={clsx("px-3 py-1 rounded-full text-[0.8rem] font-extrabold", STATUS_STYLE[r.status])}>{STATUS_LABEL[r.status]}</span></td>
                  <td className="px-5 py-4"><button className="flex items-center gap-1.5 px-3 py-2 bg-white/5 text-slate-400 rounded-xl text-[0.85rem] font-bold hover:bg-white/10 transition-all"><Eye size={14}/> عرض</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
