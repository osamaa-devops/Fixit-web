import { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface Category {
  id: number;
  name: string;
  icon: string;
  handymenCount: number;
  completedJobs: number;
  active: boolean;
  color: string;
}

const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'سباكة وتأسيس', icon: '💧', handymenCount: 120, completedJobs: 840, active: true, color: '#3b82f6' },
  { id: 2, name: 'كهرباء خفيفة', icon: '⚡', handymenCount: 85, completedJobs: 520, active: true, color: '#f59e0b' },
  { id: 3, name: 'تكييف وتبريد', icon: '❄️', handymenCount: 42, completedJobs: 310, active: true, color: '#10b981' },
  { id: 4, name: 'نجارة', icon: '🔨', handymenCount: 15, completedJobs: 45, active: false, color: '#ef4444' },
];

export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const toggleCategory = (id: number) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] p-8 font-sans animate-fade-in-up">
      <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[1.8rem] font-black text-[#0f172a] m-0">أقسام الخدمات والصيانة</h1>
          <p className="text-[#64748b] font-bold mt-1">إدارة وتفعيل فئات الخدمات المتاحة للعملاء</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-black shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
          <Plus size={20} /> إضافة قسم جديد
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8 flex items-start gap-3">
        <div className="bg-blue-500 text-white rounded-full p-1 shrink-0">
          <CheckCircle size={14} />
        </div>
        <p className="m-0 text-[#1e40af] font-bold text-[0.95rem]">
          تفعيل أو تعطيل الأقسام سيؤثر مباشرة على ما يراه العملاء في التطبيق. الأقسام المعطلة لن تستقبل طلبات جديدة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" 
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <h3 className="text-[1.2rem] font-black text-[#0f172a] m-0">{cat.name}</h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={cat.active} 
                  onChange={() => toggleCategory(cat.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {!cat.active && (
              <div className="text-red-500 font-black text-[0.85rem] flex items-center gap-1.5">
                <XCircle size={14} /> القسم معطل مؤقتاً
              </div>
            )}

            <div className={clsx("flex gap-4 bg-slate-50 p-4 rounded-xl", !cat.active && "opacity-50")}>
              <div className="flex-1 text-center border-l border-slate-200 last:border-0">
                <div className="text-[1.1rem] font-black text-[#0f172a]">{cat.handymenCount}</div>
                <div className="text-[0.8rem] text-[#64748b] font-bold">فني معتمد</div>
              </div>
              <div className="flex-1 text-center border-l border-slate-200 last:border-0 pl-4">
                <div className="text-[1.1rem] font-black text-[#0f172a]">{cat.completedJobs}</div>
                <div className="text-[0.8rem] text-[#64748b] font-bold">طلب مكتمل</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-[#e2e8f0] rounded-lg font-bold text-[#0f172a] hover:border-blue-500 hover:text-blue-500 transition-all text-[0.9rem]">
                <Edit2 size={16} /> تعديل القسم
              </button>
              {!cat.active && (
                <button className="px-4 py-2.5 bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-all">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
