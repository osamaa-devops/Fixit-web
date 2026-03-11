export const ErrorMessages = {
  NETWORK_ERROR: 'حدث خطأ في الاتصال. يرجى التحقق من الإنترنت.',
  UNAUTHORIZED: 'غير مصرح. يرجى تسجيل الدخول مرة أخرى.',
  FORBIDDEN: 'ليس لديك صلاحيات للوصول إلى هذا المورد.',
  NOT_FOUND: 'المورد غير موجود.',
  SERVER_ERROR: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.',
  INVALID_EMAIL: 'البريد الإلكتروني غير صحيح.',
  INVALID_PASSWORD: 'كلمة المرور غير صحيحة.',
  PASSWORD_MISMATCH: 'كلمات المرور غير متطابقة.',
  USER_NOT_FOUND: 'المستخدم غير موجود.',
  EMAIL_ALREADY_EXISTS: 'البريد الإلكتروني مسجل بالفعل.',
};

export const SuccessMessages = {
  LOGIN_SUCCESS: 'تم تسجيل الدخول بنجاح.',
  LOGOUT_SUCCESS: 'تم تسجيل الخروج بنجاح.',
  REGISTRATION_SUCCESS: 'تم التسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني.',
  PASSWORD_RESET_SUCCESS: 'تم إعادة تعيين كلمة المرور بنجاح.',
  PROFILE_UPDATED: 'تم تحديث الملف الشخصي بنجاح.',
  REQUEST_CREATED: 'تم إنشاء الطلب بنجاح.',
  REQUEST_CANCELLED: 'تم إلغاء الطلب بنجاح.',
  REVIEW_SUBMITTED: 'تم إرسال التقييم بنجاح.',
  PORTFOLIO_UPDATED: 'تم تحديث المحفظة بنجاح.',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any): string => {
  if (!error.response) {
    return ErrorMessages.NETWORK_ERROR;
  }

  const status = error.response.status;
  const message = error.response.data?.message;

  if (message) return message;

  switch (status) {
    case 401:
      return ErrorMessages.UNAUTHORIZED;
    case 403:
      return ErrorMessages.FORBIDDEN;
    case 404:
      return ErrorMessages.NOT_FOUND;
    case 500:
      return ErrorMessages.SERVER_ERROR;
    default:
      return ErrorMessages.SERVER_ERROR;
  }
};

export default {
  ErrorMessages,
  SuccessMessages,
  handleApiError,
};
