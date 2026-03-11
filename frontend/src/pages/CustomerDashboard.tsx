import { Link } from 'react-router-dom';
import { HelpCircle, LogOut, Clock, CheckCircle, Search, History, User } from 'lucide-react';
import { clsx } from 'clsx';

// Extracted from web-customer-dashboard.html
export function CustomerDashboard() {
  return (
    <div className="w-[95%] max-w-[1400px] mx-auto mt-10 mb-20 flex flex-col lg:flex-row gap-8 font-sans text-text-primary fade-in-up">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-[300px] bg-white/70 backdrop-blur-[25px] rounded-[32px] p-8 border border-white/40 sticky top-[110px] h-fit shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="text-center mb-8 pb-6 border-b border-border">
          <div className="w-[90px] h-[90px] bg-gradient-to-br from-primary to-[#FF8E64] rounded-[30px] mx-auto mb-4 flex items-center justify-center text-white text-[2.2rem] font-black shadow-[0_10px_20px_rgba(255,107,53,0.2)]">
            أ
          </div>
          <h3 className="font-black text-[1.3rem] m-0 mb-1 text-text-primary">أحمد محمود</h3>
          <p className="text-[0.95rem] text-text-secondary mb-2" dir="ltr">+20 101 234 5678</p>
          <div className="text-[0.85rem] text-text-secondary font-bold">عضو منذ أكتوبر 2023</div>
        </div>

        <ul className="flex flex-col gap-2 m-0 p-0 list-none">
          <li>
            <Link to="/customer/dashboard" className="flex items-center gap-3.5 p-4 rounded-2xl text-primary bg-white border border-white/40 font-extrabold transition-all shadow-sm">
              <CheckCircle size={20} strokeWidth={2.5} />
              طلباتي النشطة
            </Link>
          </li>
          <li>
            <Link to="/customer/browse" className="flex items-center gap-3.5 p-4 rounded-2xl text-text-secondary font-extrabold border border-transparent transition-all hover:bg-white/60 hover:text-primary hover:border-white/40 hover:-translate-x-1">
              <Search size={20} strokeWidth={2.5} />
              تصفح الفنيين
            </Link>
          </li>
          <li>
            <Link to="/customer/history" className="flex items-center gap-3.5 p-4 rounded-2xl text-text-secondary font-extrabold border border-transparent transition-all hover:bg-white/60 hover:text-primary hover:border-white/40 hover:-translate-x-1">
              <History size={20} strokeWidth={2.5} />
              سجل الطلبات
            </Link>
          </li>
          <li>
            <Link to="/customer/profile" className="flex items-center gap-3.5 p-4 rounded-2xl text-text-secondary font-extrabold border border-transparent transition-all hover:bg-white/60 hover:text-primary hover:border-white/40 hover:-translate-x-1">
              <User size={20} strokeWidth={2.5} />
              الملف الشخصي
            </Link>
          </li>
          <li>
            <Link to="/help" className="flex items-center gap-3.5 p-4 rounded-2xl text-text-secondary font-extrabold border border-transparent transition-all hover:bg-white/60 hover:text-primary hover:border-white/40 hover:-translate-x-1">
              <HelpCircle size={20} strokeWidth={2.5} />
              الدعم والمساعدة
            </Link>
          </li>
          <li className="mt-5">
            <button className="w-full flex items-center gap-3.5 p-4 rounded-2xl text-red-500 font-extrabold border border-transparent transition-all hover:bg-red-50 hover:-translate-x-1 outline-none text-right cursor-pointer">
              <LogOut size={20} strokeWidth={2.5} />
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h1 className="text-[2.4rem] font-black m-0 tracking-tight text-text-primary">إدارة طلباتي</h1>
        </div>

        {/* Summary Pills */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          
          <Link to="/customer/track/active" className="flex-1 bg-white/70 backdrop-blur-[20px] border border-white/40 p-6 rounded-[24px] flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:bg-white text-decoration-none group">
            <div className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-[24px] bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
              ⏳
            </div>
            <div>
              <h3 className="m-0 text-[1.5rem] font-black leading-none text-text-primary">02</h3>
              <p className="m-0 mt-1 text-[0.9rem] font-bold text-text-secondary">طلبات نشطة</p>
            </div>
          </Link>
          
          <Link to="/customer/history" className="flex-1 bg-white/70 backdrop-blur-[20px] border border-white/40 p-6 rounded-[24px] flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:bg-white text-decoration-none group">
            <div className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-[24px] bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
              ✅
            </div>
            <div>
              <h3 className="m-0 text-[1.5rem] font-black leading-none text-text-primary">24</h3>
              <p className="m-0 mt-1 text-[0.9rem] font-bold text-text-secondary">طلبات مكتملة</p>
            </div>
          </Link>

          <div className="flex-1 bg-white/70 backdrop-blur-[20px] border border-white/40 p-6 rounded-[24px] flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:bg-white group cursor-default">
            <div className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-[24px] bg-orange-500/10 text-primary group-hover:scale-110 transition-transform">
              ⭐
            </div>
            <div>
              <h3 className="m-0 text-[1.5rem] font-black leading-none text-text-primary">4.9</h3>
              <p className="m-0 mt-1 text-[0.9rem] font-bold text-text-secondary">تقييمك كعميل</p>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="flex flex-col gap-5">
          <h2 className="font-black mb-2 text-[1.5rem] text-text-primary animate-fade-in-up" style={{ animationDelay: '400ms' }}>الطلبات الحالية</h2>

          <RequestItem 
            title="صيانة تكييف مركزي"
            icon="🔧"
            handymanName="محمد علي"
            time="اليوم، 3:00 م"
            status="active"
            statusLabel="الفني في الطريق"
            to="/customer/track/1"
            delay="500ms"
          />

          <RequestItem 
            title="تأسيس كهرباء شقة بالكامل"
            icon="🏠"
            handymanName="أحمد حسن"
            time="غداً، 10:00 ص"
            status="pending"
            statusLabel="بانتظار الموافقة"
            to="/customer/track/2"
            delay="600ms"
          />

          <h2 className="font-black mb-2 mt-6 text-[1.5rem] text-text-primary animate-fade-in-up" style={{ animationDelay: '700ms' }}>سجل الطلبات السابقة</h2>

          <RequestItem 
            title="إصلاح تسريب مياه"
            icon="🚿"
            handymanName="سامح نبيل"
            time="12 فبراير 2026"
            status="completed"
            statusLabel="تم التنفيذ"
            to="/customer/track/3"
            delay="800ms"
            isHistory={true}
          />
        </div>

      </main>

    </div>
  );
}

function RequestItem({ title, icon, handymanName, time, status, statusLabel, to, delay, isHistory = false }: any) {
  return (
    <Link 
      to={to} 
      className={clsx(
        "bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[28px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:scale-[1.01] hover:bg-white hover:border-primary text-text-primary animate-fade-in-up",
        isHistory ? "opacity-70" : ""
      )}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-5">
        <div className="w-[70px] h-[70px] shrink-0 rounded-[22px] bg-white flex items-center justify-center text-[28px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {icon}
        </div>
        <div>
          <h4 className="m-0 mb-2 text-[1.25rem] font-black text-text-primary">{title}</h4>
          <div className="flex flex-wrap items-center gap-4 text-[0.9rem] font-bold text-text-secondary">
            <span className="flex items-center gap-1.5"><User size={16} strokeWidth={2.5}/> الفني: {handymanName}</span>
            <span className="flex items-center gap-1.5"><Clock size={16} strokeWidth={2.5}/> {time}</span>
          </div>
        </div>
      </div>
      
      <div className={clsx(
        "px-5 py-2.5 rounded-full font-black text-[0.85rem] tracking-[0.5px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] text-center self-start md:self-auto",
        status === 'active' && "bg-blue-500 text-white",
        status === 'pending' && "bg-amber-500 text-white",
        status === 'completed' && "bg-emerald-500 text-white"
      )}>
        {statusLabel}
      </div>
    </Link>
  );
}
