import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Image as ImageIcon, MapPin, Calendar, Star, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

// We simulate job data. In production, this would be fetched by the job ID.
type JobState = 'new' | 'active' | 'completed' | 'cancelled';

interface MockJob {
  id: string;
  title: string;
  customer: string;
  customerInitial: string;
  customerRating: number;
  district: string;
  description: string;
  appointment: string;
  address?: string; // Only revealed after acceptance
  state: JobState;
  photos: string[];
}

const MOCK_JOB_DATA: MockJob = {
  id: 'FIX-2201',
  title: 'تغيير خلاط مياه وتصليح تسريب',
  customer: 'كريم أحمد',
  customerInitial: 'ك',
  customerRating: 4.9,
  district: 'مدينة نصر',
  description: 'يوجد تسريب مياه مستمر من ماسورة الحوض في الحمام الرئيسي ونحتاج لتغيير الخلاط بالكامل لأن المحبس الرئيسي تالف أيضاً، يرجى إحضار الأدوات اللازمة للفك والتركيب.',
  appointment: 'غداً، فترة الصباح',
  state: 'new',
  photos: [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400'
  ]
};

export function HandymanJobs() {
  const navigate = useNavigate();
  const [job, setJob] = useState<MockJob>(MOCK_JOB_DATA);

  const acceptJob = () => {
    setJob(prev => ({
      ...prev,
      state: 'active',
      address: 'عمارة 15، شقة 4، الطابق الثاني -- مكرم عبيد'
    }));
  };

  const finishJob = () => {
    setJob(prev => ({ ...prev, state: 'completed' }));
  };

  const rejectJob = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في رفض الطلب؟')) {
      setJob(prev => ({ ...prev, state: 'cancelled' }));
    }
  };

  const stateColor = {
    new: { bg: 'bg-amber-400/10', text: 'text-amber-500', label: 'بانتظار قرارك' },
    active: { bg: 'bg-blue-500/10', text: 'text-blue-500', label: 'قيد التنفيذ' },
    completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', label: 'مكتمل' },
    cancelled: { bg: 'bg-red-500/10', text: 'text-red-500', label: 'ملغي / مرفوض' }
  }[job.state];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#e2e8f0] font-sans text-text-primary animate-fade-in-up">
      <div className="w-[95%] max-w-[1400px] mx-auto mt-10 mb-32">
      
      {/* Back button */}
      <button onClick={() => navigate('/handyman/dashboard')} className="flex items-center gap-2 text-text-secondary font-extrabold mb-6 px-4 py-2 bg-white/50 rounded-xl border border-black/5 hover:bg-white hover:text-secondary transition-all">
        <ArrowRight size={18} strokeWidth={3}/>
        العودة للمهام
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        
        {/* Left Sidebar Cards */}
        <div className="flex flex-col gap-6">

          {/* Customer Info */}
          <div className="bg-white/70 backdrop-blur-[20px] border border-white/40 rounded-[28px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up">
            <h3 className="text-[0.9rem] font-extrabold text-text-secondary uppercase tracking-wider mb-5 flex items-center gap-2">
              <span>👤</span> معلومات العميل
            </h3>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-teal-600 text-white rounded-[24px] flex items-center justify-center text-3xl font-black shadow-[0_10px_20px_rgba(77,184,168,0.2)]">
                {job.customerInitial}
              </div>
              <h4 className="text-[1.25rem] font-black m-0">{job.customer}</h4>
              <span className="bg-secondary/10 text-teal-700 px-3 py-1 rounded-lg text-[0.8rem] font-extrabold">عميل ذهبي</span>

              {/* Address / Lock */}
              {job.state === 'new' ? (
                <div className="w-full p-4 bg-black/5 border border-dashed border-black/10 rounded-2xl mt-2">
                  <p className="text-[0.85rem] font-extrabold text-text-secondary">🔒 التواصل متاح بعد قبول الطلب</p>
                </div>
              ) : (
                <div className="w-full p-4 bg-secondary/5 border border-secondary/20 rounded-2xl mt-2 text-right">
                  <p className="text-[0.85rem] font-extrabold text-text-secondary mb-2">العنوان التفصيلي:</p>
                  <p className="text-[0.95rem] font-black text-secondary">{job.address}</p>
                </div>
              )}
              <p className="text-[0.8rem] text-text-secondary font-bold mt-0">عضو منذ يناير 2024</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white/70 backdrop-blur-[20px] border border-white/40 rounded-[28px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up">
            <h3 className="text-[0.9rem] font-extrabold text-text-secondary uppercase tracking-wider mb-5 flex items-center gap-2">
              <MapPin size={16} strokeWidth={3}/> موقع العمل (تقريبي)
            </h3>
            <div className="font-extrabold text-text-primary mb-1">المنطقة: {job.district}</div>
            <div className="text-[0.9rem] text-text-secondary italic mb-4">بالقرب من شارع مكرم عبيد</div>
            {/* Blurred Map Placeholder */}
            <div className="relative w-full h-[120px] rounded-2xl overflow-hidden border border-black/5">
              <div className="absolute inset-0 bg-slate-200" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #cbd5e1, #cbd5e1 10px, #e2e8f0 10px, #e2e8f0 20px)', filter: job.state === 'new' ? 'blur(4px)' : 'none' }}></div>
              {job.state === 'new' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 py-2 rounded-full font-extrabold text-[0.8rem] shadow-md flex items-center gap-2">🔒 الخريطة مؤمنة</span>
                </div>
              )}
            </div>
            <p className="text-[0.75rem] text-text-secondary text-center mt-3 font-bold">
              {job.state === 'new' ? 'العنوان التفصيلي واللوكيشن سيظهر فور قبولك للمهمة' : 'تم كشف اللوكيشن الكامل بعد القبول'}
            </p>
          </div>

        </div>

        {/* Main Job Content */}
        <div className="bg-white/70 backdrop-blur-[20px] border border-white/40 rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up">
          
          {/* Meta Ribbon */}
          <div className="flex flex-wrap gap-5 mb-5 text-[0.95rem] text-text-secondary font-bold">
            <span className="flex items-center gap-2 text-secondary font-black">#{job.id}</span>
            <span className="flex items-center gap-2"><Calendar size={16} strokeWidth={2.5}/> منذ ساعتين</span>
            <span className="flex items-center gap-2"><Star size={16} strokeWidth={2.5} className="text-amber-400" fill="#fbbf24"/> {job.customerRating} تقييم العميل</span>
          </div>

          <h1 className="text-[2.2rem] font-black text-text-primary mb-8 leading-[1.2] tracking-tight">{job.title}</h1>

          {/* Problem Description */}
          <div className="flex items-center gap-2.5 font-black text-[1.2rem] mb-4">
            <FileText size={20} strokeWidth={3} className="text-secondary"/>
            وصف المشكلة
          </div>
          <div className="text-[1.1rem] text-text-secondary leading-[1.8] bg-white/40 p-6 rounded-[20px] border border-black/5 mb-10">
            {job.description}
          </div>

          {/* Photos */}
          <div className="flex items-center gap-2.5 font-black text-[1.2rem] mb-4">
            <ImageIcon size={20} strokeWidth={3} className="text-secondary"/>
            الصور المرفقة
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {job.photos.map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-[20px] overflow-hidden border border-white/40 cursor-pointer transition-all hover:scale-[1.03] hover:border-secondary hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)]">
                <img src={src} alt={`صورة ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Fixed Action Bar */}
      {job.state !== 'cancelled' && (
        <div className="fixed bottom-[30px] left-0 right-0 flex justify-center z-[1001] pointer-events-none">
          <div className={clsx("w-[90%] max-w-[900px] backdrop-blur-[25px] border border-white/40 rounded-[24px] px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-auto transition-all",
            job.state === 'completed' ? 'bg-emerald-500/90' : 'bg-white/85'
          )}>
            <div className="flex items-center gap-3">
              <span className={clsx("px-4 py-2 rounded-xl font-extrabold text-[0.9rem]", stateColor.bg, stateColor.text)}>
                {stateColor.label}
              </span>
              <span className="font-bold text-text-primary hidden sm:block">الموعد: {job.appointment}</span>
            </div>
            
            <div className="flex gap-3">
              {job.state === 'new' && (
                <>
                  <button onClick={rejectJob} className="flex items-center gap-2 px-6 py-3.5 rounded-[14px] font-extrabold bg-red-500/5 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all">
                    <XCircle size={18}/> رفض الطلب
                  </button>
                  <button onClick={acceptJob} className="flex items-center gap-2 px-6 py-3.5 rounded-[14px] font-extrabold bg-secondary text-white shadow-[0_8px_16px_rgba(77,184,168,0.2)] hover:bg-teal-600 hover:-translate-y-0.5 transition-all">
                    <CheckCircle size={18}/> قبول الطلب والمتابعة
                  </button>
                </>
              )}
              {job.state === 'active' && (
                <button onClick={finishJob} className="flex items-center gap-2 px-6 py-3.5 rounded-[14px] font-extrabold bg-emerald-500 text-white shadow-[0_8px_16px_rgba(16,185,129,0.2)] hover:bg-emerald-600 hover:-translate-y-0.5 transition-all">
                  <CheckCircle size={18}/> إتمام العمل
                </button>
              )}
              {job.state === 'completed' && (
                <div className="flex items-center gap-2 text-white font-black">
                  <CheckCircle size={22}/>
                  تم الإنجاز بنجاح! بانتظار تقييم العميل.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
