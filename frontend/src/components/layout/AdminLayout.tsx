
import { Outlet, Link } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      <aside style={{ width: '280px', background: '#0f172a', color: 'white', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '3rem', color: 'white', textAlign: 'center' }}>
          FixIt <span style={{ color: 'var(--color-primary)' }}>Admin</span>
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/admin/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '12px 16px', borderRadius: '8px', transition: 'background 0.3s' }}>
            لوحة التحكم
          </Link>
          <Link to="/admin/approvals" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '12px 16px', borderRadius: '8px', transition: 'background 0.3s' }}>
            طلبات الفنيين
          </Link>
          <Link to="/admin/categories" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '12px 16px', borderRadius: '8px', transition: 'background 0.3s' }}>
            الفئات والخدمات
          </Link>
          <Link to="/admin/requests" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '12px 16px', borderRadius: '8px', transition: 'background 0.3s' }}>
            مراقبة الطلبات
          </Link>
          <Link to="/admin/users" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '12px 16px', borderRadius: '8px', transition: 'background 0.3s' }}>
            إدارة المستخدمين
          </Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px' }}>
        <div style={{ background: 'white', padding: '16px 32px', borderRadius: '16px', marginBottom: '32px', display: 'flex', justifyContent: 'flex-end', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontWeight: 600 }}>المدير العام</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
