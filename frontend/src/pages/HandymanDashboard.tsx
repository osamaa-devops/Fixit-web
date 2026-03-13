import { useState } from 'react';
import { Copy, Check, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { useMyProfile, useMyJobs } from '../hooks/useHandyman';

type JobCard = {
  id: string;
  title: string;
  customer: string;
  district: string;
  complexity: string;
  address: string;
  timeLabel: string;
  status: 'new' | 'active' | 'completed' | 'cancelled';
};

interface CopyAddressProps {
  address: string;
}

function CopyAddressBtn({ address }: CopyAddressProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button 
      onClick={handleCopy}
      className="flex items-center gap-1.5 bg-secondary/10 border-none text-secondary px-3 py-1 rounded-lg text-[0.75rem] font-black transition-all hover:bg-secondary hover:text-white"
    >
      {copied ? <Check size={12} strokeWidth={3}/> : <Copy size={12} strokeWidth={3}/>}
      {copied ? 'تم النسخ!' : 'نسخ'}
    </button>
  );
}

export function HandymanDashboard() {
  // Fetch current handyman profile and jobs from API
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: jobs = [], isLoading: jobsLoading } = useMyJobs();

  const byStatus = (status: JobCard['status']) => jobs.filter((j: JobCard) => j.status === status);

  const isLoading = profileLoading || jobsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#e2e8f0] font-sans text-text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border border-secondary/20 border-t-secondary mx-auto mb-4"></div>
          <p className="text-text-secondary">جاري تحميل المهام والملف الشخصي...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#e2e8f0] font-sans text-text-primary flex flex-col overflow-hidden animate-fade-in-up">
      <div className="flex flex-col h-full">
      
      {/* Performance Bar */}
      <div className="bg-white/40 backdrop-blur-[15px] border-b border-black/5 flex justify-center z-10 px-5 py-2 shrink-0">
        <div className="w-full max-w-[1400px] flex flex-col md:flex-row md:items-center justify-between gap-3 px-10">
          <h1 className="text-[1.2rem] font-black m-0">مرحباً {profile?.firstName}, إليك جدول أعمالك اليوم</h1>
          <div className="flex gap-3 flex-wrap">
            {[
              { val: jobs.length.toString(), lbl: 'مهام اليوم' },
              { val: '0 ج.م', lbl: 'الإيرادات' }, // Will be updated from API
              { val: `★ ${profile?.rating?.toFixed(1) || '0.0'}`, lbl: 'التقييم', gold: true }
            ].map((s) => (
              <div key={s.lbl} className="bg-white px-4 py-1.5 rounded-xl border border-black/5 flex items-center gap-2 shadow-[0_4px_10px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:border-secondary">
                <span className={clsx("font-black text-[0.95rem]", s.gold ? "text-amber-400" : "text-secondary")}>{s.val}</span>
                <span className="text-[0.8rem] text-text-secondary font-extrabold">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-5 p-4 flex-1 overflow-x-auto overflow-y-hidden" style={{ minHeight: 0 }}>
        
        {/* Column: New Requests */}
        <div className="flex-1 min-w-[300px] bg-white/45 backdrop-blur-[25px] border border-white/40 rounded-[32px] flex flex-col max-h-full shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-amber-400 transition-all border-t-[5px] border-t-amber-400">
          <div className="p-5 pb-4 flex justify-between items-center border-b border-black/5">
            <h3 className="m-0 text-[1.1rem] font-extrabold text-text-primary">طلبات جديدة</h3>
            <span className="bg-white px-3 py-0.5 rounded-full text-[0.9rem] font-bold text-text-secondary border border-black/5">{byStatus('new').length}</span>
          </div>
          <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4" style={{ minHeight: 0 }}>
            {byStatus('new').map((job: JobCard, i: number) => (
              <div key={job.id} className="bg-white/85 rounded-[20px] p-5 border border-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.05)] cursor-pointer transition-all hover:-translate-y-2 hover:scale-[1.02] hover:border-secondary hover:shadow-[0_20px_40px_rgba(77,184,168,0.15)] hover:bg-white"
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[0.85rem] text-text-secondary font-mono font-bold">#{job.id}</span>
                  <span className="text-[0.8rem] bg-secondary/10 text-secondary px-3 py-1.5 rounded-xl font-extrabold">{job.timeLabel}</span>
                </div>
                <h4 className="m-0 mb-2 text-[1.1rem] font-extrabold leading-[1.4]">{job.title}</h4>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="px-2 py-1 rounded-lg text-[0.75rem] font-black bg-slate-100 text-slate-500">📍 {job.district}</span>
                  <span className="px-2 py-1 rounded-lg text-[0.75rem] font-black bg-secondary/10 text-teal-700">{job.complexity}</span>
                </div>
                <div className="text-[0.9rem] text-text-secondary mb-4 font-bold">العميل: {job.customer}</div>
                <div className="flex items-center justify-between bg-black/5 border border-black/5 px-3 py-2 rounded-xl font-bold text-[0.85rem] text-text-secondary mb-3">
                  <span>{job.address}</span>
                  <CopyAddressBtn address={job.address} />
                </div>
                <button className="w-full py-3 rounded-[14px] text-[0.95rem] font-extrabold bg-secondary text-white transition-all hover:bg-teal-600 hover:-translate-y-0.5 shadow-[0_6px_15px_rgba(77,184,168,0.2)] hover:shadow-[0_10px_20px_rgba(77,184,168,0.3)]">
                  قبول الطلب
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Column: Active Jobs */}
        <div className="flex-1 min-w-[300px] bg-white/45 backdrop-blur-[25px] border border-white/40 rounded-[32px] flex flex-col max-h-full shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-blue-400 transition-all border-t-[5px] border-t-blue-400">
          <div className="p-5 pb-4 flex justify-between items-center border-b border-black/5">
            <h3 className="m-0 text-[1.1rem] font-extrabold text-text-primary">مهام قيد التنفيذ</h3>
            <span className="bg-white px-3 py-0.5 rounded-full text-[0.9rem] font-bold text-text-secondary border border-black/5">{byStatus('active').length}</span>
          </div>
          <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4" style={{ minHeight: 0 }}>
            {byStatus('active').map((job: JobCard) => (
              <div key={job.id} className="bg-white/85 rounded-[20px] p-5 border-r-4 border-r-blue-400 border border-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.05)] cursor-pointer transition-all hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:bg-white">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[0.85rem] text-text-secondary font-mono font-bold">#{job.id}</span>
                  <span className="bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-xl text-[0.8rem] font-extrabold">{job.timeLabel}</span>
                </div>
                <h4 className="m-0 mb-2 text-[1.1rem] font-extrabold leading-[1.4]">{job.title}</h4>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="px-2 py-1 rounded-lg text-[0.75rem] font-black bg-slate-100 text-slate-500">📍 {job.district}</span>
                  <span className="px-2 py-1 rounded-lg text-[0.75rem] font-black bg-secondary/10 text-teal-700">{job.complexity}</span>
                </div>
                <div className="text-[0.9rem] text-text-secondary mb-4 font-bold">العميل: {job.customer}</div>
                <div className="flex items-center justify-between bg-black/5 border border-black/5 px-3 py-2 rounded-xl font-bold text-[0.85rem] text-text-secondary mb-3">
                  <span>{job.address}</span>
                  <CopyAddressBtn address={job.address} />
                </div>
                <button className="w-full py-3 rounded-[14px] text-[0.95rem] font-extrabold bg-white text-secondary border border-secondary transition-all hover:bg-secondary hover:text-white hover:-translate-y-0.5">
                  عرض التفاصيل
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Column: Completed */}
        <div className="flex-1 min-w-[300px] bg-white/45 backdrop-blur-[25px] border border-white/40 rounded-[32px] flex flex-col max-h-full shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-emerald-400 transition-all border-t-[5px] border-t-emerald-400">
          <div className="p-5 pb-4 flex justify-between items-center border-b border-black/5">
            <h3 className="m-0 text-[1.1rem] font-extrabold text-text-primary">مهام منجزة مؤخراً</h3>
            <span className="bg-white px-3 py-0.5 rounded-full text-[0.9rem] font-bold text-text-secondary border border-black/5">{byStatus('completed').length + byStatus('cancelled').length}</span>
          </div>
          <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4" style={{ minHeight: 0 }}>
            {byStatus('completed').map((job: JobCard) => (
              <div key={job.id} className="bg-white/85 rounded-[20px] p-5 opacity-80 border-r-4 border-r-emerald-400 border border-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.05)] cursor-pointer transition-all hover:-translate-y-2 hover:opacity-100 hover:bg-white">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[0.85rem] text-text-secondary font-mono font-bold">#{job.id}</span>
                  <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-xl text-[0.8rem] font-extrabold">{job.timeLabel}</span>
                </div>
                <h4 className="m-0 mb-3 text-[1.1rem] font-extrabold line-through text-text-secondary">{job.title}</h4>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="px-2 py-1 rounded-lg text-[0.75rem] font-black bg-slate-100 text-slate-500">📍 {job.district}</span>
                </div>
                <div className="text-[0.9rem] text-text-secondary mb-3 font-bold">العميل: {job.customer}</div>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-[0.9rem]">
                  <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/>
                  <span className="text-text-secondary text-[0.85rem] mr-1">(مكتمل)</span>
                </div>
              </div>
            ))}
            {byStatus('cancelled').map((job: JobCard) => (
              <div key={job.id} className="bg-white/85 rounded-[20px] p-5 opacity-60 border-r-4 border-r-red-400 border border-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.05)] cursor-pointer transition-all hover:-translate-y-2 hover:opacity-100 hover:bg-white">
                 <div className="flex justify-between items-start mb-3">
                  <span className="text-[0.85rem] text-text-secondary font-mono font-bold">#{job.id}</span>
                  <span className="bg-red-500/10 text-red-500 px-3 py-1.5 rounded-xl text-[0.8rem] font-extrabold">{job.timeLabel}</span>
                </div>
                <h4 className="m-0 mb-3 text-[1.1rem] font-extrabold line-through text-text-secondary">{job.title}</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 rounded-lg text-[0.75rem] font-black bg-slate-100 text-slate-500">📍 {job.district}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
