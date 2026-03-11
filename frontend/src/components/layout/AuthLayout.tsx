
import { Outlet, useSearchParams } from 'react-router-dom';
import { clsx } from 'clsx';

export function AuthLayout() {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('role') === 'handyman' ? 'theme-handyman' : 'theme-customer';

  return (
    <div className={clsx("flex-center text-white transition-colors duration-500", theme === 'theme-handyman' ? 'bg-[#0f172a]' : 'bg-[#0f172a]')} style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', gap: '60px', alignItems: 'center' }}>
        
        <div style={{ flex: 1 }} className="hidden lg:block relative z-10 animate-fade-in">
          <div style={{ marginBottom: '2rem' }}>
            <span className={clsx("inline-block px-4 py-2 rounded-full font-extrabold text-sm transition-colors", theme === 'theme-handyman' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary')}>
              FixIt {theme === 'theme-handyman' ? 'Pro' : 'Application'}
            </span>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.2 }}>
            {theme === 'theme-handyman' ? 'حول مهاراتك إلى مصدر فخر' : 'منزلك يستحق الرعاية الأفضل'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.8 }}>
             {theme === 'theme-handyman' 
                ? 'كن شريكاً في أكبر شبكة لخدمات الصيانة في مصر. احصل على عملاء جدد يومياً وزد من دخلك الاحترافي.' 
                : 'انضم إلى آلاف العملاء الذين يثقون في FixIt للحصول على خدمات صيانة منزلية فورية، آمنة ومضمونة.'}
          </p>
        </div>

        <div style={{ flex: 1, maxWidth: '500px', width: '100%', position: 'relative', zIndex: 10 }}>
          <Outlet />
        </div>
        
      </div>

      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none transition-all duration-1000" 
           style={{ 
             background: theme === 'theme-handyman' 
               ? 'radial-gradient(circle at 30% 30%, var(--color-handyman) 0%, transparent 40%), radial-gradient(circle at 70% 70%, #1e293b 0%, transparent 40%)'
               : 'radial-gradient(circle at 30% 30%, var(--color-primary) 0%, transparent 40%), radial-gradient(circle at 70% 70%, var(--color-handyman) 0%, transparent 40%)'
           }} 
      />
    </div>
  );
}
