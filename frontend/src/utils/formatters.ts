export const formatDate = (date: string | Date, locale: string = 'ar-EG'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: string | Date, locale: string = 'ar-EG'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (date: string | Date, locale: string = 'ar-EG'): string => {
  return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
};

export const formatRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'منذ لحظات';
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  if (diffHour < 24) return `منذ ${diffHour} ساعة`;
  if (diffDay < 30) return `منذ ${diffDay} يوم`;
  
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `منذ ${diffMonth} شهر`;
  
  const diffYear = Math.floor(diffMonth / 12);
  return `منذ ${diffYear} سنة`;
};

export const getTimeUntil = (targetDate: string | Date): string => {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return 'انتهى الوقت';

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) return `خلال ${diffDay} يوم و ${diffHour % 24} ساعة`;
  if (diffHour > 0) return `خلال ${diffHour} ساعة و ${diffMin % 60} دقيقة`;
  if (diffMin > 0) return `خلال ${diffMin} دقيقة`;
  return `خلال ${diffSec} ثانية`;
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  getTimeUntil,
};
