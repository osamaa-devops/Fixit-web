
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Bell, Settings, Menu } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';

const MENU_ITEMS = [
  { path: '/handyman/dashboard', label: 'الطلبات', icon: '📋' },
  { path: '/handyman/portfolio', label: 'معرض الأعمال', icon: '🖼️' },
  { path: '/handyman/reviews', label: 'التقييمات', icon: '⭐' },
  { path: '/handyman/profile', label: 'الحساب الشخصي', icon: '👤' },
  { path: '/handyman/notifications', label: 'الإشعارات', icon: '🔔' },
];

export function HandymanLayout() {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#e2e8f0] font-sans">
      {/* Fixed Navbar */}
      <nav className="fixed top-5 left-5 right-5 h-[70px] z-50 rounded-[20px] px-6"
           style={{
             background: 'rgba(255, 255, 255, 0.7)',
             backdropFilter: 'blur(25px)',
             WebkitBackdropFilter: 'blur(25px)',
             border: '1px solid rgba(255, 255, 255, 0.4)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'space-between',
             boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
           }}>
        
        {/* Logo */}
        <Link to="/handyman/dashboard" style={{ fontSize: '1.5rem', fontWeight: 900, textDecoration: 'none', color: '#4db8a8' }} className="font-black text-[#4db8a8]">
          FixIt<span className="text-[#4db8a8]">Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-[0.9rem] font-bold transition-all",
                  isActive
                    ? "bg-[#4db8a8]/10 text-[#4db8a8]"
                    : "text-[#555555] hover:text-[#4db8a8]"
                )}
                style={{ whiteSpace: 'nowrap' }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link to="/handyman/notifications" className="p-2 hover:bg-[#4db8a8]/10 rounded-lg transition-all relative">
            <Bell size={20} color="#4db8a8" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
          <Link to="/handyman/profile" className="p-2 hover:bg-[#4db8a8]/10 rounded-lg transition-all">
            <Settings size={20} color="#4db8a8" />
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 hover:bg-[#4db8a8]/10 rounded-lg transition-all"
          >
            <Menu size={20} color="#4db8a8" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {navOpen && (
        <div className="fixed top-[90px] left-5 right-5 bg-white/90 backdrop-blur-2xl border border-white/40 rounded-[20px] p-4 z-40 md:hidden animate-fade-in-up">
          <div className="flex flex-col gap-2">
            {MENU_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setNavOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-[0.9rem] font-bold transition-all",
                    isActive
                      ? "bg-[#4db8a8]/10 text-[#4db8a8]"
                      : "text-[#555555] hover:bg-[#f8fafc]"
                  )}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-[100px]">
        <Outlet />
      </main>
    </div>
  );
}
