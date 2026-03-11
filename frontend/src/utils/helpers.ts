export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const toEgyptianArabic = (englishNumber: number | string): string => {
  const arabicNumbers: { [key: string]: string } = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
  };

  return String(englishNumber).replace(/\d/g, (digit) => arabicNumbers[digit] || digit);
};

export const toEnglishNumbers = (arabicNumber: string): string => {
  const englishNumbers: { [key: string]: string } = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
  };

  return arabicNumber.replace(/[٠-٩]/g, (digit) => englishNumbers[digit] || digit);
};

export const formatCurrency = (amount: number, currency: string = 'EGP'): string => {
  const formatted = new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);

  return formatted;
};

export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const generateAvatarColor = (name: string): string => {
  const colors = [
    '#FF6B35', // primary orange
    '#4db8a8', // secondary teal
    '#10b981', // success green
    '#f59e0b', // warning amber
    '#ef4444', // danger red
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#ec4899', // pink
  ];

  const hash = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export default {
  cn,
  toEgyptianArabic,
  toEnglishNumbers,
  formatCurrency,
  truncateText,
  getInitials,
  generateAvatarColor,
};
