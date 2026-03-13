
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Settings, Bell } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useLogout } from '../../hooks/useAuth';

const MENU_ITEMS = [
  { path: '/admin/dashboard', label: 'لوحة التحكم', icon: '📊' },
  { path: '/admin/approvals', label: 'طلبات الفنيين', icon: '👤' },
  { path: '/admin/categories', label: 'الفئات والخدمات', icon: '🛠️' },
  { path: '/admin/requests', label: 'مراقبة الطلبات', icon: '📋' },
  { path: '/admin/reviews', label: 'الشكاوى والتقييمات', icon: '⭐' },
  { path: '/admin/users', label: 'إدارة المستخدمين', icon: '👥' },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]/50 font-sans">
      {/* Sidebar */}
      <aside className={clsx(
        "w-[280px] bg-[#0f172a] text-white flex flex-col flex-shrink-0 transition-all duration-300 border-l border-white/5",
        !sidebarOpen && "w-0 overflow-hidden"
      )}>
        {/* Sidebar Header */}
        <div className="h-[70px] flex items-center px-6 border-b border-white/10">
          <h1 className="text-[1.75rem] font-black text-white">
            FixIt<span className="text-blue-500">/</span><span className="text-blue-400">A</span>
          </h1>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-0 flex flex-col gap-1">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-6 py-3 text-[0.95rem] font-bold transition-all border-r-4",
                  isActive
                    ? "bg-[#334155] text-white border-r-blue-500 border-r-4 text-white"
                    : "text-[#94a3b8] border-r-transparent hover:bg-[#1e293b]/50"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 p-4">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-[0.9rem] font-bold">
            <LogOut size={18} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-[70px] bg-white border-b border-[#e2e8f0] flex items-center justify-between px-8 sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all text-[#0f172a]"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-all text-blue-500 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-all text-[#0f172a]">
              <Settings size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              م
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
