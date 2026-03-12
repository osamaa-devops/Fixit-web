import { clsx } from 'clsx';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  circle?: boolean;
  count?: number;
}

export function Skeleton({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  circle = false,
  count = 1
}: SkeletonProps) {
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, i) => (
        <div
          key={i}
          className={clsx(
            'bg-gradient-to-r from-white/20 via-white/40 to-white/20 animate-pulse',
            circle ? 'rounded-full' : 'rounded-lg',
            className
          )}
          style={{
            width: widthStyle,
            height: heightStyle,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: calc(200% + 100px) 0; }
        }
      `}</style>
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[28px] p-6 space-y-4">
      <Skeleton height={24} width="60%" />
      <div className="space-y-3">
        <Skeleton height={16} width="100%" />
        <Skeleton height={16} width="100%" />
        <Skeleton height={16} width="80%" />
      </div>
      <div className="flex gap-3 pt-4">
        <Skeleton height={32} width={100} />
        <Skeleton height={32} width={100} />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <Skeleton width={40} height={40} circle />
          <div className="flex-1 space-y-2">
            <Skeleton height={16} width="100%" />
            <Skeleton height={14} width="70%" />
          </div>
          <Skeleton width={80} height={24} />
        </div>
      ))}
    </div>
  );
}
