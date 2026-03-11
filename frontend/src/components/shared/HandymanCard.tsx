
import { Link } from 'react-router-dom';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';

export interface Handyman {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  avatarUrl?: string;
  isVerified?: boolean;
}

interface HandymanCardProps {
  handyman: Handyman;
}

export function HandymanCard({ handyman }: HandymanCardProps) {
  const content = (
    <GlassCard className="relative overflow-hidden transition-all duration-300">
      {!handyman.isAvailable && (
        <div 
          className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full z-10"
          style={{ background: 'rgba(245,158,11,.12)', color: '#d97706', border: '1px solid rgba(245,158,11,.25)' }}
        >
          ⏳ مشغول حالياً
        </div>
      )}
      
      <div className="flex flex-row items-center gap-4 mb-4" style={{ display: 'flex' }}>
        <img 
          src={handyman.avatarUrl || `https://i.pravatar.cc/100?u=${handyman.id}`} 
          alt={handyman.name}
          className="rounded-full object-cover"
          style={{ width: '64px', height: '64px', border: '2px solid white', boxShadow: 'var(--shadow-sm)' }}
        />
        <div>
          <h3 className="text-lg font-black mb-1 flex items-center gap-2">
            {handyman.name}
            {handyman.isVerified && <span className="text-blue-500 text-sm">✓</span>}
          </h3>
          <p className="text-sm text-gray-500" style={{ color: 'var(--color-text-secondary)' }}>{handyman.category}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm" style={{ display: 'flex' }}>
        <div className="flex items-center gap-1 text-yellow-500">
          ⭐ {handyman.rating} <span style={{ color: 'var(--color-text-tertiary)' }}>({handyman.reviewsCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--color-text-secondary)' }}>الحالة:</span>
          {handyman.isAvailable ? (
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>● متاح الآن</span>
          ) : (
             <span style={{ color: '#d97706', fontWeight: 'bold' }}>● مشغول</span>
          )}
        </div>
      </div>

      <Button 
        variant="primary" 
        className="w-full" 
        style={{ width: '100%' }}
        disabled={!handyman.isAvailable}
      >
        {handyman.isAvailable ? 'احجز الآن' : '⛔ مشغول حالياً — غير متاح'}
      </Button>
    </GlassCard>
  );

  if (handyman.isAvailable) {
    return (
      <Link to={`/customer/handyman/${handyman.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div className="hover:shadow-xl transition-all duration-300" style={{ transform: 'translateY(0)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} 
             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          {content}
        </div>
      </Link>
    );
  }

  return (
    <div style={{ opacity: 0.6, cursor: 'not-allowed', filter: 'grayscale(0.4)', pointerEvents: 'none' }}>
      {content}
    </div>
  );
}
