import { useState } from 'react';
import { Search, UserPlus, MoreHorizontal, Ban, Eye, CheckCircle, Loader } from 'lucide-react';
import { clsx } from 'clsx';
import { useAllUsers } from '../hooks/useAdmin';

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  role: 'customer' | 'handyman' | 'admin';
  memberSince?: string;
  createdAt?: string;
  status: 'active' | 'blocked';
  verified?: boolean;
}

export function AdminUsers() {
  const [filter, setFilter] = useState<'all' | 'customer' | 'handyman'>('all');
  const [search, setSearch] = useState('');
  
  // Fetch both customers and handymen
  const { data: customerData = [], isLoading: customersLoading } = useAllUsers(filter === 'all' ? 'customer' : filter === 'customer' ? 'customer' : undefined);
  const { data: handymanData = [], isLoading: handymansLoading } = useAllUsers(filter === 'all' ? 'handyman' : filter === 'handyman' ? 'handyman' : undefined);

  const isLoading = customersLoading || handymansLoading;

  // Combine and format data
  const users: User[] = [
    ...customerData.map((u: User) => ({
      ...u,
      role: 'customer' as const,
      status: u.status || 'active' as const,
    })),
    ...handymanData.map((u: User) => ({
      ...u,
      role: 'handyman' as const,
      status: u.status || 'active' as const,
    })),
  ];

  const filtered = users.filter((u: User) => {
    const matchType = filter === 'all' || u.role === filter;
    const matchSearch = !search || u.email.includes(search) || u.phone.includes(search);
    return matchType && matchSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] flex items-center justify-center">
        <div className="text-center">
          <Loader size={40} className="animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-[#64748b] font-bold">جاري تحميل المستخدمين...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] p-8 font-sans animate-fade-in-up">
      <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-[1.8rem] font-black text-[#0f172a] m-0">قاعدة بيانات المستخدمين</h1>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-black shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 hover:-translate-y-0.5">
          <UserPlus size={20} /> إضافة مستخدم (مسؤول)
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b]" size={18} />
          <input 
            type="text" 
            placeholder="البحث بالبريد الإلكتروني، الاسم، رقم الهاتف..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg py-3 px-4 pr-12 text-[#0f172a] font-bold outline-none focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex bg-[#f8fafc] p-1 rounded-lg border border-[#e2e8f0]">
          {(['all', 'customer', 'handyman'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={clsx(
                "px-5 py-2 rounded-md font-bold text-[0.9rem] transition-all",
                filter === tab ? "bg-white text-blue-500 shadow-sm" : "text-[#64748b] hover:text-[#0f172a]"
              )}
            >
              {tab === 'all' ? 'الكل' : tab === 'customer' ? 'العملاء' : 'الفنيين'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-right">
            <thead>
              <tr className="bg-[#f8fafc] border-b-2 border-[#e2e8f0]">
                <th className="px-6 py-4 text-[0.85rem] text-[#64748b] font-black">الاسم الكامل</th>
                <th className="px-6 py-4 text-[0.85rem] text-[#64748b] font-black">البريد الإلكتروني / الهاتف</th>
                <th className="px-6 py-4 text-[0.85rem] text-[#64748b] font-black">نوع الحساب</th>
                <th className="px-6 py-4 text-[0.85rem] text-[#64748b] font-black">تاريخ الانضمام</th>
                <th className="px-6 py-4 text-[0.85rem] text-[#64748b] font-black">الحالة</th>
                <th className="px-6 py-4 text-[0.85rem] text-[#64748b] font-black">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user: User) => (
                <tr key={user.id} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc]/50 transition-colors">
                  <td className="px-6 py-4 font-black text-[#0f172a]">{`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'مستخدم'}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[0.95rem] direction-ltr text-right">{user.email}</div>
                    <div className="text-[0.85rem] text-[#64748b] font-bold direction-ltr text-right">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-[0.8rem] font-black",
                      user.role === 'customer' ? "bg-sky-100 text-sky-700" : 
                      user.role === 'handyman' ? "bg-emerald-100 text-emerald-700" : 
                      "bg-purple-100 text-purple-700"
                    )}>
                      {user.role === 'customer' ? 'عميل' : user.role === 'handyman' ? `فني ${user.verified ? '(مُعتمد)' : ''}` : 'مدير نظام'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#64748b]">{user.memberSince?.split('T')[0] || user.createdAt?.split('T')[0] || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "font-black text-[0.95rem]",
                      user.status === 'active' ? "text-emerald-500" : "text-red-500"
                    )}>
                      {user.status === 'active' ? 'نشط' : 'محظور'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="p-2 text-[#64748b] hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="عرض التفاصيل">
                        <Eye size={18} />
                      </button>
                      {user.status === 'active' ? (
                        <button className="p-2 text-[#64748b] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="حظر">
                          <Ban size={18} />
                        </button>
                      ) : (
                        <button className="p-2 text-emerald-500 hover:bg-emerald-100 rounded-lg transition-all" title="إلغاء الحظر">
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button className="p-2 text-[#64748b] hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
