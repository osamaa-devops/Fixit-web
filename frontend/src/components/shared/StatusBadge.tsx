

type RequestStatus = 'pending' | 'active' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: RequestStatus;
  label?: string;
}

const statusConfig: Record<RequestStatus, { bg: string; color: string; defaultLabel: string }> = {
  pending: { bg: 'rgba(245,158,11,.1)', color: '#d97706', defaultLabel: 'في الانتظار' },
  active: { bg: 'rgba(59,130,246,.1)', color: '#2563eb', defaultLabel: 'الفني في الطريق' },
  completed: { bg: 'rgba(16,185,129,.1)', color: '#059669', defaultLabel: 'مكتمل' },
  cancelled: { bg: 'rgba(239,68,68,.08)', color: '#dc2626', defaultLabel: 'ملغي' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      style={{
        backgroundColor: config.bg,
        color: config.color,
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.875rem',
        fontWeight: 700,
        display: 'inline-block'
      }}
    >
      {label || config.defaultLabel}
    </span>
  );
}
