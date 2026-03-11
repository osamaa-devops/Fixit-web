import { useState } from 'react';
import { Settings, Globe, Palette, Bell, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

export function CustomerSettings() {
  const [notifications, setNotifications] = useState({ requests: true, offers: false });

  return (
    <div className="max-w-[900px] mx-auto p-4 md:p-8 animate-fade-in-up">
      <h1 className="text-[2.2rem] font-black m-0 mb-10 flex items-center gap-4 text-[#1a1a1a]">
        <div className="w-12 h-12 bg-[#FF6B35]/10 text-[#FF6B35] rounded-2xl flex items-center justify-center transition-transform hover:rotate-90 duration-500">
          <Settings size={28} strokeWidth={2.5} />
        </div>
        الإعدادات
      </h1>

      <div className="bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[32px] shadow-2xl p-6 md:p-10 space-y-10">
        {/* App Experience */}
        <section>
          <h2 className="text-[1.4rem] font-black text-[#FF6B35] mb-6 flex items-center gap-3">
            <Globe size={24} strokeWidth={2.5} />
            تجربة التطبيق
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between items-center py-6 border-b border-black/5">
              <div className="flex flex-col gap-1">
                <span className="text-[1.1rem] font-black text-[#1a1a1a]">اللغة</span>
                <span className="text-[0.95rem] text-[#555555] font-bold">اختر لغتك المفضلة لواجهة FixIt</span>
              </div>
              <select className="px-5 py-2.5 bg-white/50 border border-black/10 rounded-xl font-black text-[1rem] outline-none focus:bg-white focus:border-[#FF6B35] transition-all cursor-pointer">
                <option value="ar">العربية</option>
                <option value="en">English (Coming Soon)</option>
              </select>
            </div>

            <div className="flex justify-between items-center py-6">
              <div className="flex flex-col gap-1">
                <span className="text-[1.1rem] font-black text-[#1a1a1a]">العملة الرائجة</span>
                <span className="text-[0.95rem] text-[#555555] font-bold">عرض الأسعار بالعملة المحلية</span>
              </div>
              <span className="font-black text-[#FF6B35] bg-[#FF6B35]/10 px-4 py-2 rounded-xl">جنية مصري</span>
            </div>
          </div>
        </section>

        {/* Visual Theme */}
        <section>
          <h2 className="text-[1.4rem] font-black text-[#FF6B35] mb-6 flex items-center gap-3">
            <Palette size={24} strokeWidth={2.5} />
            المظهر العام
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
            {[
              { id: 'light', label: 'فاتح', bg: 'bg-white' },
              { id: 'dark', label: 'داكن', bg: 'bg-[#1a1a1a]' },
              { id: 'premium', label: 'مميز', bg: 'bg-gradient-to-br from-[#1a1a1a] to-[#FF6B35]' },
            ].map((theme, idx) => (
              <div 
                key={theme.id}
                className={clsx(
                  "cursor-pointer rounded-[20px] p-4 border-2 transition-all flex flex-col gap-3 items-center hover:-translate-y-1.5",
                  idx === 0 ? "border-[#FF6B35] bg-white shadow-md shadow-[#FF6B35]/05" : "border-transparent bg-white/30 hover:bg-white/60"
                )}
              >
                <div className={clsx("w-full h-[60px] rounded-xl border border-black/5", theme.bg)} />
                <span className="font-black text-[0.95rem]">{theme.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-[1.4rem] font-black text-[#FF6B35] mb-6 flex items-center gap-3">
            <Bell size={24} strokeWidth={2.5} />
            التنبيهات
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between items-center py-6 border-b border-black/5">
              <div className="flex flex-col gap-1">
                <span className="text-[1.1rem] font-black text-[#1a1a1a]">تنبيهات الطلبات</span>
                <span className="text-[0.95rem] text-[#555555] font-bold">تلقي إشعارات عند تغيير حالة طلبك</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.requests}
                  onChange={() => setNotifications(prev => ({ ...prev, requests: !prev.requests }))}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#FF6B35]"></div>
              </label>
            </div>

            <div className="flex justify-between items-center py-6">
              <div className="flex flex-col gap-1">
                <span className="text-[1.1rem] font-black text-[#1a1a1a]">العروض والخصومات</span>
                <span className="text-[0.95rem] text-[#555555] font-bold">لا تفوت فرصة التوفير في خدماتك</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.offers}
                  onChange={() => setNotifications(prev => ({ ...prev, offers: !prev.offers }))}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#FF6B35]"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Privacy & Data */}
        <section>
          <h2 className="text-[1.4rem] font-black text-[#FF6B35] mb-6 flex items-center gap-3">
            <ShieldCheck size={24} strokeWidth={2.5} />
            الخصوصية والبيانات
          </h2>

          <div className="flex justify-between items-center bg-[#FF6B35]/03 p-6 -mx-4 md:-mx-6 rounded-2xl border border-red-500/10 transition-all hover:bg-[#FF6B35]/05">
            <div className="flex flex-col gap-1">
              <span className="text-[1.1rem] font-black text-red-600">حذف الحساب</span>
              <span className="text-[0.95rem] text-[#555555] font-bold">سيتم حذف جميع بياناتك وطلباتك بشكل نهائي</span>
            </div>
            <button className="px-6 py-2.5 bg-transparent border-2 border-red-500 text-red-500 rounded-xl font-black transition-all hover:bg-red-500 hover:text-white active:scale-95 shadow-sm">
              حذف نهائي
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
