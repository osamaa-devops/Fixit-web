import { Camera, User, Phone, Mail, MapPin, Lock, ChevronLeft, Shield } from 'lucide-react';

export function CustomerProfile() {
  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-8 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-xl font-black text-[#555555] hover:text-[#FF6B35] hover:border-[#FF6B35] transition-all"
        >
          <ChevronLeft size={20} strokeWidth={3} />
          العودة
        </button>
        <h1 className="text-[2.2rem] font-black m-0 tracking-tight">ملفي الشخصي</h1>
      </div>

      {/* Profile Hero Card */}
      <div className="bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[32px] shadow-2xl overflow-hidden mb-8 group transition-all duration-500 hover:shadow-[#FF6B35]/10">
        <div className="h-[120px] bg-gradient-to-l from-[#4db8a8] to-[#FF6B35] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="px-10 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex items-end gap-6">
            <div className="w-[120px] h-[120px] bg-white border-[5px] border-white rounded-[40px] flex items-center justify-center text-[3rem] font-black text-[#FF6B35] -mt-[60px] shadow-xl relative z-10 transition-transform hover:rotate-3">
              أ
            </div>
            <div className="mb-2">
              <h2 className="text-[1.8rem] font-black m-0">أحمد محمود</h2>
              <p className="text-[#555555] font-black text-[1rem]">عميل بلاتيني منذ أكتوبر 2023</p>
            </div>
          </div>
          <button className="flex items-center gap-2.5 px-6 py-3 bg-white text-[#FF6B35] border border-black/10 rounded-2xl font-black shadow-sm transition-all hover:bg-[#FF6B35] hover:text-white hover:scale-105 active:scale-95">
            <Camera size={20} />
            تغيير الصورة
          </button>
        </div>
      </div>

      {/* Personal Info Form */}
      <div className="bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[32px] shadow-2xl p-10 mb-8 transition-all hover:shadow-[#FF6B35]/05">
        <div className="text-[1.4rem] font-black text-[#1a1a1a] mb-8 flex items-center gap-3.5 pb-5 border-b-2 border-black/5">
          <User className="text-[#FF6B35]" strokeWidth={2.5} />
          المعلومات الشخصية الأساسية
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2.5">
            <label className="text-[0.95rem] font-black text-[#555555] pr-1">الاسم الأول</label>
            <input 
              type="text" 
              defaultValue="أحمد"
              className="px-5 py-4 bg-white/40 border-2 border-white/40 rounded-[18px] text-[1.05rem] font-bold outline-none focus:bg-white focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-[0.95rem] font-black text-[#555555] pr-1">الاسم الأخير</label>
            <input 
              type="text" 
              defaultValue="محمود"
              className="px-5 py-4 bg-white/40 border-2 border-white/40 rounded-[18px] text-[1.05rem] font-bold outline-none focus:bg-white focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-[0.95rem] font-black text-[#555555] pr-1">رقم الهاتف</label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="tel" 
                defaultValue="+20 101 234 5678"
                className="w-full px-5 py-4 pl-12 bg-white/40 border-2 border-white/40 rounded-[18px] text-[1.05rem] font-bold outline-none focus:bg-white focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 transition-all direction-ltr text-right"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-[0.95rem] font-black text-[#555555] pr-1">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="email" 
                defaultValue="ahmed@fixit.com"
                className="w-full px-5 py-4 pl-12 bg-white/40 border-2 border-white/40 rounded-[18px] text-[1.05rem] font-bold outline-none focus:bg-white focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 transition-all direction-ltr text-right"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 md:col-span-2">
            <label className="text-[0.95rem] font-black text-[#555555] pr-1">العنوان الدائم</label>
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                defaultValue="القاهرة، المعادي، شارع الـ 9، بناية 12"
                className="w-full px-5 py-4 pl-12 bg-white/40 border-2 border-white/40 rounded-[18px] text-[1.05rem] font-bold outline-none focus:bg-white focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 transition-all"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-10">
          <button className="px-8 py-4 bg-white border-2 border-white/40 rounded-[18px] font-black text-[#555555] hover:border-slate-300 hover:bg-slate-50 transition-all">
            إلغاء التعديلات
          </button>
          <button className="px-10 py-4 bg-[#FF6B35] text-white rounded-[18px] font-black text-[1.1rem] shadow-lg shadow-[#FF6B35]/20 hover:bg-[#e55a2b] hover:scale-105 transition-all">
            حفظ التغييرات
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[32px] shadow-2xl p-10 mb-8 transition-all hover:shadow-[#FF6B35]/05">
        <div className="text-[1.4rem] font-black text-[#1a1a1a] mb-8 flex items-center gap-3.5 pb-5 border-b-2 border-black/5">
          <Lock className="text-[#FF6B35]" strokeWidth={2.5} />
          الأمان وكلمة المرور
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2.5">
            <label className="text-[0.95rem] font-black text-[#555555] pr-1">كلمة المرور الحالية</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="px-5 py-4 bg-white/40 border-2 border-white/40 rounded-[18px] text-[1.05rem] font-bold outline-none focus:bg-white focus:border-[#FF6B35] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-[0.95rem] font-black text-[#555555] pr-1">كلمة المرور الجديدة</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="px-5 py-4 bg-white/40 border-2 border-white/40 rounded-[18px] text-[1.05rem] font-bold outline-none focus:bg-white focus:border-[#FF6B35] transition-all"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-10">
          <button className="px-10 py-4 bg-[#FF6B35] text-white rounded-[18px] font-black text-[1.1rem] shadow-lg shadow-[#FF6B35]/20 hover:bg-[#e55a2b] hover:scale-105 transition-all">
            تحديث كلمة المرور
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50/30 border border-red-500/15 rounded-[32px] p-10 transition-all hover:bg-red-50/50">
        <div className="text-[1.4rem] font-black text-red-500 mb-6 flex items-center gap-3.5 pb-5 border-b-2 border-red-500/10">
          <Shield strokeWidth={2.5} />
          إدارة الحساب
        </div>
        <p className="text-[#555555] font-black mb-8 -mt-2">تحكم في خصوصية حسابك وإمكانية الوصول إليه. يرجى الحذر عند إجراء تغييرات هنا.</p>
        
        <div className="flex flex-wrap gap-4">
          <button className="px-7 py-3.5 bg-white text-red-500 border-2 border-red-500/30 rounded-2xl font-black transition-all hover:bg-red-500 hover:text-white shadow-sm">
            تسجيل الخروج من كافة الأجهزة
          </button>
          <button className="px-7 py-3.5 bg-white text-red-500 border-2 border-red-500 rounded-2xl font-black transition-all hover:bg-red-500 hover:text-white shadow-sm">
            حذف حسابي
          </button>
        </div>
      </div>
    </div>
  );
}
