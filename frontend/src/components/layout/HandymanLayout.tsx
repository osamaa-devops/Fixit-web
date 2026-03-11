
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

export function HandymanLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'الطلبات', path: '/handyman/dashboard' },
    { name: 'أعمالي', path: '/handyman/portfolio' },
    { name: 'التقييمات', path: '/handyman/reviews' },
  ];

  return (
    <div className="min-h-screen relative" style={{ paddingTop: '100px', minHeight: '100vh', background: 'radial-gradient(circle at top left, #fdfbfb 0%, #ebedee 100%)' }}>
      <nav className="fixed top-5 left-5 right-5 h-[70px] z-50 rounded-[20px] px-6"
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
        <Link to="/handyman/dashboard" style={{ fontSize: '1.5rem', fontWeight: 900, textDecoration: 'none', color: 'var(--color-secondary)' }}>
          FixIt Pro<span style={{ color: 'var(--color-primary)' }}>.</span>
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
                  color: isActive ? 'var(--color-secondary)' : 'var(--color-text-secondary)',
                  transition: 'color 0.3s ease'
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/handyman/notifications" style={{ position: 'relative', display: 'flex', padding: '8px' }}>
            <Bell size={20} color="var(--color-text-secondary)" />
          </Link>
          <Link to="/handyman/profile" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <img src="https://i.pravatar.cc/100?img=11" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Link>
        </div>
      </nav>

      <main className="container content-inner">
        <Outlet />
      </main>
    </div>
  );
}
