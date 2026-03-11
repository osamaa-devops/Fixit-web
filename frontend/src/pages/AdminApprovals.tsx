import { CheckCircle, Clock, UserPlus, XCircle, Eye } from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  specialty: string;
  district: string;
  experience: string;
  phone: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const APPLICANTS: Applicant[] = [
  { id: 'HM-115', name: 'أحمد علي محمد', specialty: 'سباكة وتأسيس', district: 'القاهرة', experience: '8 سنوات', phone: '010xxxxxxxx', appliedAt: 'منذ 5 دقائق', status: 'pending' },
  { id: 'HM-114', name: 'سامر إبراهيم', specialty: 'كهرباء خفيفة', district: 'الجيزة', experience: '5 سنوات', phone: '011xxxxxxxx', appliedAt: 'منذ 20 دقيقة', status: 'pending' },
  { id: 'HM-113', name: 'وليد حسن', specialty: 'نجارة', district: 'القاهرة', experience: '12 سنة', phone: '012xxxxxxxx', appliedAt: 'منذ ساعة', status: 'pending' },
  { id: 'HM-112', name: 'يوسف صالح', specialty: 'كهرباء خفيفة', district: 'الجيزة', experience: '3 سنوات', phone: '015xxxxxxxx', appliedAt: 'منذ 2 ساعة', status: 'approved' },
  { id: 'HM-111', name: 'محمد إبراهيم', specialty: 'تكييف وتبريد', district: 'القاهرة', experience: '7 سنوات', phone: '010xxxxxxxx', appliedAt: 'منذ 3 ساعات', status: 'rejected' },
];

export function AdminApprovals() {
  const pending = APPLICANTS.filter(a => a.status === 'pending');
  const reviewed = APPLICANTS.filter(a => a.status !== 'pending');

  const Row = ({ a }: { a: Applicant }) => (
    <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
      <td className="px-6 py-4 font-mono font-extrabold text-blue-400 text-[0.85rem]">{a.id}</td>
      <td className="px-6 py-4">
        <div className="font-extrabold">{a.name}</div>
        <div className="text-[0.8rem] text-slate-400 font-bold">{a.phone}</div>
      </td>
      <td className="px-6 py-4 font-bold text-slate-300">{a.specialty}</td>
      <td className="px-6 py-4 font-bold text-slate-300">{a.district}</td>
      <td className="px-6 py-4 font-bold text-slate-300">{a.experience}</td>
      <td className="px-6 py-4 text-[0.8rem] text-slate-400 font-bold">{a.appliedAt}</td>
      <td className="px-6 py-4">
        {a.status === 'pending' ? (
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-extrabold text-[0.85rem] hover:bg-emerald-500 hover:text-white transition-all">
              <CheckCircle size={14}/> قبول
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-extrabold text-[0.85rem] hover:bg-red-500 hover:text-white transition-all">
              <XCircle size={14}/> رفض
            </button>
            <button className="px-3 py-2 bg-white/5 text-slate-400 border border-white/10 rounded-xl font-extrabold text-[0.85rem] hover:bg-white/10 transition-all" title="عرض الملف">
              <Eye size={14}/>
            </button>
          </div>
        ) : (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.8rem] font-extrabold ${
            a.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {a.status === 'approved' ? <CheckCircle size={12}/> : <XCircle size={12}/>}
            {a.status === 'approved' ? 'تمت الموافقة' : 'تم الرفض'}
          </span>
        )}
      </td>
    </tr>
  );

  return (
    <div className="p-8 text-white font-sans">
      
      {/* Header Stats */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <Clock size={22} className="text-amber-400"/>
          <div>
            <div className="font-black text-[1.4rem] text-amber-400">{pending.length}</div>
            <div className="text-[0.8rem] text-slate-400 font-bold">بانتظار المراجعة</div>
          </div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <CheckCircle size={22} className="text-emerald-400"/>
          <div>
            <div className="font-black text-[1.4rem] text-emerald-400">{APPLICANTS.filter(a=>a.status==='approved').length}</div>
            <div className="text-[0.8rem] text-slate-400 font-bold">تمت موافقتهم اليوم</div>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <XCircle size={22} className="text-red-400"/>
          <div>
            <div className="font-black text-[1.4rem] text-red-400">{APPLICANTS.filter(a=>a.status==='rejected').length}</div>
            <div className="text-[0.8rem] text-slate-400 font-bold">تم رفضهم</div>
          </div>
        </div>
      </div>

      {/* Pending Applicants */}
      {pending.length > 0 && (
        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
            <UserPlus size={20} className="text-amber-400"/>
            <h2 className="m-0 font-extrabold text-[1.1rem]">فنيون ينتظرون الموافقة</h2>
            <span className="bg-red-500 text-white text-[0.75rem] font-black px-2 py-0.5 rounded-full">{pending.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['رقم التسجيل', 'الاسم', 'التخصص', 'المحافظة', 'الخبرة', 'وقت التقديم', 'الإجراء'].map(h => (
                    <th key={h} className="text-right px-6 py-4 text-[0.8rem] text-slate-400 border-b border-white/5 bg-white/[0.02] font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pending.map(a => <Row key={a.id} a={a}/>)}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviewed */}
      {reviewed.length > 0 && (
        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5">
            <h2 className="m-0 font-extrabold text-[1.1rem] text-slate-300">سبق مراجعتهم</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['رقم التسجيل', 'الاسم', 'التخصص', 'المحافظة', 'الخبرة', 'وقت التقديم', 'الحالة'].map(h => (
                    <th key={h} className="text-right px-6 py-4 text-[0.8rem] text-slate-400 border-b border-white/5 bg-white/[0.02] font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reviewed.map(a => <Row key={a.id} a={a}/>)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
