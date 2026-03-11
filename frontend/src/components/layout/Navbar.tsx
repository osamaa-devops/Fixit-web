
import { Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'الرئيسية', path: '/customer/home' },
    { name: 'تصفح الفنيين', path: '/customer/browse' },
    { name: 'طلباتي', path: '/customer/dashboard' },
    { name: 'المساعدة', path: '/help' },
  ];

  return (
    <nav className="fixed top-5 left-5 right-5 h-[70px] z-50 rounded-[20px] px-6 flex items-center justify-between"
         style={{
           position: 'fixed',
           top: '20px', left: '20px', right: '20px',
           height: '70px',
           background: 'rgba(255, 255, 255, 0.7)',
           backdropFilter: 'blur(25px)',
           WebkitBackdropFilter: 'blur(25px)',
           border: '1px solid rgba(255, 255, 255, 0.4)',
           borderRadius: '20px',
           padding: '0 24px',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'space-between',
           boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
           zIndex: 1000
         }}>
      
      {/* Brand */}
      <Link to="/customer/home" style={{ fontSize: '1.5rem', fontWeight: 900, textDecoration: 'none', color: 'var(--color-text-primary)' }}>
        FixIt<span style={{ color: 'var(--color-primary)' }}>.</span>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '2rem', fontWeight: 700 }}>
        {navLinks.map((link) => {
          const isActive = currentPath.startsWith(link.path);
          return (
            <Link 
              key={link.path} 
              to={link.path}
              style={{
                textDecoration: 'none',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                transition: 'color 0.3s ease'
              }}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link 
          to="/customer/notifications" 
          style={{ position: 'relative', display: 'flex', padding: '8px', borderRadius: '50%' }}
        >
          <Bell size={20} color="var(--color-text-secondary)" />
          <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: 'var(--color-danger)', borderRadius: '50%' }}></span>
        </Link>
        <Link 
          to="/customer/profile" 
          style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}
        >
          <img src="https://i.pravatar.cc/100?img=33" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Link>
      </div>
    </nav>
  );
}
