import { useState } from 'react';
import { Clock, MapPin, Search, Filter, Eye, Loader } from 'lucide-react';
import { clsx } from 'clsx';
import { useLiveRequests } from '../hooks/useAdmin';

type ReqStatus = 'pending' | 'accepted' | 'active' | 'completed';
interface Request {
  id: string; customer: string; phone: string; handyman: string;
  specialty: string; location: string; time: string; status: ReqStatus;
}

const STATUS_STYLE: Record<ReqStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-400',
  pending: 'bg-amber-500/10 text-amber-400',
  accepted: 'bg-blue-500/10 text-blue-400',
  completed: 'bg-blue-500/10 text-blue-400',
};
const STATUS_LABEL: Record<ReqStatus, string> = {
  active: 'قيد التنفيذ', pending: 'بانتظار فني', accepted: 'مقبول', completed: 'مكتمل',
};

export function AdminRequests() {
  const { data: liveRequests = [], isLoading } = useLiveRequests();
  const [filter, setFilter] = useState<ReqStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  // Map API data to UI format
  const requests: Request[] = liveRequests.map(r => ({
    id: r.id,
    customer: 'عميل #' + r.customerId.slice(-4), // Will be improved when API provides full customer data
    phone: 'N/A', // Will be available when API provides full customer data
    handyman: r.handymanId ? 'فني #' + r.handymanId.slice(-4) : 'بانتظار فني',
    specialty: r.category,
    location: r.location,
    time: new Date(r.createdAt).toLocaleDateString('ar-EG'),
    status: r.status as ReqStatus,
  }));

  const filtered = requests.filter(r => {
    const matchStatus = filter === 'all' || r.status === filter;
    const matchSearch = !search || r.id.includes(search) || r.customer.includes(search) || r.handyman.includes(search);
    return matchStatus && matchSearch;
  });

  const counts = { active: requests.filter(r=>r.status==='active').length, pending: requests.filter(r=>r.status==='pending').length };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-white">
        <div className="text-center">
          <Loader size={40} className="animate-spin mx-auto mb-4" />
          <p>جاري تحميل الطلبات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] p-8 text-white font-sans animate-fade-in-up">
      <div className="max-w-[1600px] mx-auto">
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
          <div><div className="font-black text-[1.4rem]">{requests.length}</div><div className="text-[0.8rem] text-slate-400 font-bold">إجمالي</div></div>
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
              <tr>{['رقم الطلب','العميل','الفني','التخصص','الموقع','التاريخ','الحالة','إجراء'].map(h=>(
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
                  <td className="px-5 py-4 font-bold text-slate-300 flex items-center gap-1.5"><MapPin size={12}/>{r.location}</td>
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
    </div>
  );
}
