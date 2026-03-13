import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Star, Clock, Bell, Lock, LogOut, Save } from 'lucide-react';
import { clsx } from 'clsx';
import { useLogout } from '../hooks/useAuth';

type Tab = 'personal' | 'work' | 'hours' | 'notifications' | 'security';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'personal', label: 'البيانات الشخصية', icon: <User size={20} strokeWidth={2.5}/> },
  { id: 'work', label: 'نطاق وتخصص العمل', icon: <Star size={20} strokeWidth={2.5}/> },
  { id: 'hours', label: 'ساعات العمل', icon: <Clock size={20} strokeWidth={2.5}/> },
  { id: 'notifications', label: 'الإشعارات', icon: <Bell size={20} strokeWidth={2.5}/> },
  { id: 'security', label: 'الأمان وكلمة المرور', icon: <Lock size={20} strokeWidth={2.5}/> },
];

const DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

export function HandymanSettings() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [selectedDays, setSelectedDays] = useState(['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء']);
  const [notifs, setNotifs] = useState({ requests: true, messages: true, reviews: true, promos: false });

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const inputCls = "w-full p-[14px_18px] bg-white/60 border border-white/40 rounded-2xl font-bold text-[1rem] box-border transition-all outline-none focus:border-secondary focus:bg-white focus:shadow-[0_0_0_4px_rgba(77,184,168,0.1)]";
  const saveBtnCls = "mt-8 flex items-center gap-2 px-10 py-4 bg-gradient-to-br from-teal-600 to-secondary text-white rounded-xl font-extrabold text-[1.1rem] shadow-[0_10px_20px_rgba(77,184,168,0.2)] hover:shadow-[0_12px_25px_rgba(77,184,168,0.3)] hover:-translate-y-0.5 transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#e2e8f0] font-sans text-text-primary animate-fade-in-up">
      <div className="w-[95%] max-w-[1000px] mx-auto mt-10 mb-16">
      <div className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[40px] flex flex-col md:flex-row overflow-hidden min-h-[600px] shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
        
        {/* Sidebar */}
        <aside className="w-full md:w-[260px] bg-white/30 md:border-l border-b md:border-b-0 border-black/5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible shrink-0 py-3 md:py-10">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={clsx(
              "flex items-center gap-3 w-max md:w-full text-right px-6 py-3.5 md:py-4 bg-transparent border-none text-[0.95rem] md:text-[1.05rem] font-extrabold cursor-pointer transition-all whitespace-nowrap border-r-4",
              activeTab === tab.id
                ? "text-secondary border-r-secondary bg-secondary/10"
                : "text-text-secondary border-transparent hover:text-secondary hover:bg-secondary/5"
            )}>
              {tab.icon} {tab.label}
            </button>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-3 w-max md:w-full text-right px-6 py-4 bg-transparent border-none text-red-500 text-[1.05rem] font-extrabold cursor-pointer transition-all md:mt-auto hover:bg-red-50">
            <LogOut size={20} strokeWidth={2.5}/> تسجيل الخروج
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 md:p-10">
          
          {/* Personal */}
          {activeTab === 'personal' && (
            <div className="animate-fade-in-up">
              <h2 className="text-[1.8rem] font-extrabold text-text-primary border-b border-black/5 pb-4 mb-8">المعلومات الأساسية</h2>
              
              <div className="flex items-center gap-6 mb-10">
                <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&h=200&fit=crop" alt="Avatar" className="w-[90px] h-[90px] rounded-full object-cover border-4 border-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]"/>
                <div>
                  <button className="px-4 py-2 border-2 border-black/10 bg-white text-text-primary rounded-xl font-bold mb-2 hover:border-secondary hover:text-secondary transition-all block">تغيير الصورة</button>
                  <div className="text-[0.85rem] text-text-secondary font-bold">JPG, PNG حد أقصى 2MB</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex-1">
                  <label className="block mb-2 font-bold">الاسم بالكامل</label>
                  <input type="text" className={inputCls} defaultValue="محمد علي سعيد"/>
                </div>
                <div className="flex-1">
                  <label className="block mb-2 font-bold">رقم الهاتف</label>
                  <input type="tel" className={inputCls} defaultValue="01012345678" disabled style={{ opacity: 0.7 }}/>
                  <span className="text-[0.8rem] mt-1 block text-secondary font-bold">لا يمكن تغيير رقم الهاتف مباشرة، تواصل مع الدعم.</span>
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold">نبذة عنك (تظهر للعملاء - اختياري)</label>
                <textarea className={inputCls + " resize-y"} rows={4} defaultValue="فني سباكة وتأسيس صحي بخبرة تتجاوز 10 سنوات. التزام تام بالمواعيد وضمان على جودة العمل المنجز."></textarea>
              </div>
              
              <button className={saveBtnCls}><Save size={18}/> حفظ التعديلات</button>
            </div>
          )}

          {/* Work Specialty */}
          {activeTab === 'work' && (
            <div className="animate-fade-in-up">
              <h2 className="text-[1.8rem] font-extrabold text-text-primary border-b border-black/5 pb-4 mb-8">تخصص ونطاق العمل</h2>
              
              <div className="mb-6">
                <label className="block mb-2 font-bold">التخصص المهني (الفئة)</label>
                <select className={inputCls}>
                  <option value="plumbing">سباكة وتأسيس</option>
                  <option value="electrical">كهرباء خفيفة</option>
                  <option value="carpentry">نجارة</option>
                  <option value="ac">تكييف وتبريد</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-bold">المحافظة</label>
                <select className={inputCls}>
                  <option value="cairo">القاهرة</option>
                  <option value="giza">الجيزة</option>
                  <option value="alex">الإسكندرية</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-bold">المناطق المتاحة للعمل</label>
                <div className="border-2 border-black/5 rounded-2xl p-3 flex flex-wrap gap-2 bg-white/40">
                  {['مدينة نصر', 'مصر الجديدة', 'التجمع الخامس'].map(area => (
                    <span key={area} className="bg-white border border-secondary text-secondary px-3 py-1 rounded-full text-[0.9rem] font-bold cursor-pointer hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all">
                      {area} ✕
                    </span>
                  ))}
                  <input type="text" className="border-none bg-transparent outline-none font-bold flex-1 min-w-[120px]" placeholder="أضف منطقة أخرى..."/>
                </div>
              </div>
              
              <button className={saveBtnCls}><Save size={18}/> حفظ البيانات</button>
            </div>
          )}

          {/* Working Hours */}
          {activeTab === 'hours' && (
            <div className="animate-fade-in-up">
              <h2 className="text-[1.8rem] font-extrabold text-text-primary border-b border-black/5 pb-4 mb-3">ساعات العمل</h2>
              <p className="text-text-secondary mb-8 font-bold">حدد الأوقات التي تكون متاحاً فيها لاستقبال الطلبات.</p>
              
              <div className="flex flex-col md:flex-row gap-5 mb-8">
                <div className="flex-1">
                  <label className="block mb-2 font-bold">وقت البداية</label>
                  <input type="time" className={inputCls} defaultValue="09:00"/>
                </div>
                <div className="flex-1">
                  <label className="block mb-2 font-bold">وقت النهاية</label>
                  <input type="time" className={inputCls} defaultValue="22:00"/>
                </div>
              </div>

              <div>
                <label className="block mb-4 font-bold">أيام العمل</label>
                <div className="flex flex-wrap gap-3">
                  {DAYS.map(day => (
                    <button key={day} type="button" onClick={() => toggleDay(day)} className={clsx(
                      "px-5 py-2.5 rounded-xl border-2 font-extrabold transition-all",
                      selectedDays.includes(day) ? "border-secondary bg-secondary/10 text-secondary" : "border-black/10 text-text-secondary hover:border-secondary/50"
                    )}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <button className={saveBtnCls}><Save size={18}/> حفظ ساعات العمل</button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="animate-fade-in-up">
              <h2 className="text-[1.8rem] font-extrabold text-text-primary border-b border-black/5 pb-4 mb-3">إعدادات الإشعارات</h2>
              <p className="text-text-secondary mb-8 font-bold">تحكم في أنواع الإشعارات التي تصلك عبر التطبيق.</p>
              
              <div className="flex flex-col divide-y divide-black/5">
                {[
                  { key: 'requests' as const, title: 'طلبات العمل الجديدة', desc: 'استلم إشعاراً فور وصول طلب جديد في منطقتك' },
                  { key: 'messages' as const, title: 'الرسائل', desc: 'اعلمني عند وصول رسالة جديدة من عميل' },
                  { key: 'reviews' as const, title: 'التقييمات الجديدة', desc: 'اعلمني عندما يقيّمني عميل على طلب مكتمل' },
                  { key: 'promos' as const, title: 'العروض والإعلانات', desc: 'إشعارات عن العروض الترويجية والأخبار' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-5">
                    <div>
                      <div className="font-black text-[1rem] mb-1">{item.title}</div>
                      <div className="text-[0.85rem] text-text-secondary font-bold">{item.desc}</div>
                    </div>
                    <button type="button" onClick={() => setNotifs(prev => ({ ...prev, [item.key]: !prev[item.key] }))} className={clsx(
                      "relative w-[52px] h-7 rounded-full transition-all duration-300 shrink-0",
                      notifs[item.key] ? "bg-secondary" : "bg-slate-200"
                    )}>
                      <span className={clsx("absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md transition-all duration-300", notifs[item.key] ? "right-[3px]" : "left-[3px]")}></span>
                    </button>
                  </div>
                ))}
              </div>
              
              <button className={saveBtnCls}><Save size={18}/> حفظ الإعدادات</button>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="animate-fade-in-up">
              <h2 className="text-[1.8rem] font-extrabold text-text-primary border-b border-black/5 pb-4 mb-8">الأمان وكلمة المرور</h2>
              
              <div className="mb-6">
                <label className="block mb-2 font-bold">كلمة المرور الحالية</label>
                <input type="password" className={inputCls} placeholder="أدخل كلمة المرور الحالية"/>
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-bold">كلمة المرور الجديدة</label>
                <input type="password" className={inputCls} placeholder="8 أحرف على الأقل"/>
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-bold">تأكيد كلمة المرور الجديدة</label>
                <input type="password" className={inputCls} placeholder="أعد الإدخال"/>
              </div>
              
              <button className={saveBtnCls}><Save size={18}/> تحديث كلمة المرور</button>
            </div>
          )}

        </main>
      </div>
      </div>
    </div>
  );
}
