import { CheckCircle, Clock, UserPlus, XCircle, Eye, Loader } from 'lucide-react';
import { usePendingHandymen, useApproveHandyman, useRejectHandyman } from '../hooks/useAdmin';

interface Applicant {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  specialization?: string;
  yearsOfExperience?: number;
  submittedAt?: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
}

export function AdminApprovals() {
  const { data: applicants = [], isLoading } = usePendingHandymen();
  const approveHandyman = useApproveHandyman();
  const rejectHandyman = useRejectHandyman();

  const pending = applicants.filter(a => a.verificationStatus === 'pending');
  const reviewed = applicants.filter(a => a.verificationStatus !== 'pending');

  const handleApprove = (handymanId: string) => {
    approveHandyman.mutate({ handymanId });
  };

  const handleReject = (handymanId: string) => {
    rejectHandyman.mutate({ handymanId, reason: 'تم الرفض من قبل الإدارة' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-white">
        <div className="text-center">
          <Loader size={40} className="animate-spin mx-auto mb-4" />
          <p>جاري تحميل طلبات الموافقة...</p>
        </div>
      </div>
    );
  }

  const Row = ({ a }: { a: Applicant }): JSX.Element => (
    <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
      <td className="px-6 py-4 font-mono font-extrabold text-blue-400 text-[0.85rem]">{a.id}</td>
      <td className="px-6 py-4">
        <div className="font-extrabold">{`${a.firstName || ''} ${a.lastName || ''}`.trim() || 'مستخدم'}</div>
        <div className="text-[0.8rem] text-slate-400 font-bold">{a.phone || 'N/A'}</div>
      </td>
      <td className="px-6 py-4 font-bold text-slate-300">{a.specialization || 'N/A'}</td>
      <td className="px-6 py-4 font-bold text-slate-300">{a.yearsOfExperience ? `${a.yearsOfExperience} سنوات` : 'N/A'}</td>
      <td className="px-6 py-4 text-[0.8rem] text-slate-400 font-bold">{a.submittedAt ? new Date(a.submittedAt).toLocaleDateString('ar-EG') : 'N/A'}</td>
      <td className="px-6 py-4">
        {a.verificationStatus === 'pending' ? (
          <div className="flex gap-2">
            <button onClick={() => handleApprove(a.id)} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-extrabold text-[0.85rem] hover:bg-emerald-500 hover:text-white transition-all">
              <CheckCircle size={14}/> قبول
            </button>
            <button onClick={() => handleReject(a.id)} className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-extrabold text-[0.85rem] hover:bg-red-500 hover:text-white transition-all">
              <XCircle size={14}/> رفض
            </button>
            <button className="px-3 py-2 bg-white/5 text-slate-400 border border-white/10 rounded-xl font-extrabold text-[0.85rem] hover:bg-white/10 transition-all" title="عرض الملف">
              <Eye size={14}/>
            </button>
          </div>
        ) : (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.8rem] font-extrabold ${
            a.verificationStatus === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {a.verificationStatus === 'approved' ? <CheckCircle size={12}/> : <XCircle size={12}/>}
            {a.verificationStatus === 'approved' ? 'تمت الموافقة' : 'تم الرفض'}
          </span>
        )}
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-[#0b0f19] p-8 text-white font-sans animate-fade-in-up">
      <div className="max-w-[1600px] mx-auto">
      
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
            <div className="font-black text-[1.4rem] text-emerald-400">{applicants.filter(a=>a.verificationStatus==='approved').length}</div>
            <div className="text-[0.8rem] text-slate-400 font-bold">تمت موافقتهم</div>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4 flex items-center gap-3">
          <XCircle size={22} className="text-red-400"/>
          <div>
            <div className="font-black text-[1.4rem] text-red-400">{applicants.filter(a=>a.verificationStatus==='rejected').length}</div>
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
                  {['رقم التسجيل', 'الاسم', 'التخصص', 'الخبرة', 'تاريخ التقديم', 'الإجراء'].map(h => (
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
                  {['رقم التسجيل', 'الاسم', 'التخصص', 'الخبرة', 'تاريخ التقديم', 'الحالة'].map(h => (
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
    </div>
  );
}
