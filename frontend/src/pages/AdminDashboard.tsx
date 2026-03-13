import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Users, Briefcase, Clock, Star, TrendingUp, CheckCircle, UserPlus, AlertTriangle } from 'lucide-react';
import { adminService } from '../services/admin.service';

export function AdminDashboard() {
  // Fetch dashboard stats from API
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: () => adminService.getDashboardStats(),
  });

  // Fetch recent requests from API
  // const { data: recentRequests } = useQuery({
  //   queryKey: ['adminRecentRequests'],
  //   queryFn: () => adminService.getRecentRequests(),
  // });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] p-8 text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border border-white/20 border-t-white mx-auto mb-4"></div>
          <p className="text-slate-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0b0f19] p-8 text-white font-sans animate-fade-in-up">
      <div className="max-w-[1600px] mx-auto">
      
      {/* KPI Grid - Using API Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 flex items-center gap-6 transition-all hover:-translate-y-2 hover:border-white/10 hover:bg-white/[0.08]">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-400">
            <Users size={28} strokeWidth={2}/>
          </div>
          <div className="flex-1">
            <h3 className="m-0 mb-1 text-[0.9rem] text-slate-400 font-bold">إجمالي المستخدمين</h3>
            <p className="m-0 mb-1 text-[1.75rem] font-black text-white">{stats?.totalUsers || '0'}</p>
            <p className="m-0 text-[0.85rem] flex items-center gap-1.5 font-bold text-slate-400">من جميع الأنواع</p>
          </div>
        </div>

        {/* Total Handymen */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 flex items-center gap-6 transition-all hover:-translate-y-2 hover:border-white/10 hover:bg-white/[0.08]">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-emerald-500/10 text-emerald-400">
            <Briefcase size={28} strokeWidth={2}/>
          </div>
          <div className="flex-1">
            <h3 className="m-0 mb-1 text-[0.9rem] text-slate-400 font-bold">الفنيين المعتمدين</h3>
            <p className="m-0 mb-1 text-[1.75rem] font-black text-white">{stats?.totalHandymen || '0'}</p>
            <p className="m-0 text-[0.85rem] flex items-center gap-1.5 font-bold text-slate-400">جاهزين للعمل</p>
          </div>
        </div>

        {/* Active Requests */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 flex items-center gap-6 transition-all hover:-translate-y-2 hover:border-white/10 hover:bg-white/[0.08]">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-amber-500/10 text-amber-400">
            <Clock size={28} strokeWidth={2}/>
          </div>
          <div className="flex-1">
            <h3 className="m-0 mb-1 text-[0.9rem] text-slate-400 font-bold">الطلبات النشطة</h3>
            <p className="m-0 mb-1 text-[1.75rem] font-black text-white">{stats?.activeRequests || '0'}</p>
            <p className="m-0 text-[0.85rem] flex items-center gap-1.5 font-bold text-slate-400">قيد التنفيذ الآن</p>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 flex items-center gap-6 transition-all hover:-translate-y-2 hover:border-white/10 hover:bg-white/[0.08]">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-purple-500/10 text-purple-400">
            <Star size={28} strokeWidth={2}/>
          </div>
          <div className="flex-1">
            <h3 className="m-0 mb-1 text-[0.9rem] text-slate-400 font-bold">متوسط التقييم</h3>
            <p className="m-0 mb-1 text-[1.75rem] font-black text-white">{stats?.averageRating?.toFixed(1) || '0.0'}<span className="text-[1rem] text-slate-400">/5</span></p>
            <p className="m-0 text-[0.85rem] flex items-center gap-1.5 font-bold text-slate-400">رضا العملاء</p>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        
        {/* Recent Requests Table - API Data Ready */}
        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
            <h2 className="m-0 font-extrabold text-[1.1rem]">أحدث الطلبات على المنصة</h2>
            <Link to="/admin/requests" className="text-blue-400 font-bold text-[0.9rem] hover:underline no-underline">عرض الكل</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['رقم الطلب', 'الوصف', 'الحالة', 'الفني', 'المنطقة'].map(h => (
                    <th key={h} className="text-right px-6 py-4 text-[0.85rem] text-slate-400 border-b border-white/5 bg-white/[0.02] font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/[0.03] transition-colors border-b border-white/5">
                  <td className="px-6 py-4 text-slate-300 font-bold text-center">-</td>
                  <td colSpan={4} className="px-6 py-4 text-slate-400 text-center py-8">جاري تحميل البيانات من API...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed - API Data Ready */}
        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5">
            <h2 className="m-0 font-extrabold text-[1.1rem]">آخر نشاطات المنصة</h2>
          </div>
          <div className="p-6 flex flex-col gap-6 relative">
            <div className="text-center py-8 text-slate-400">
              البيانات ستأتي من API عند التوصيل
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
