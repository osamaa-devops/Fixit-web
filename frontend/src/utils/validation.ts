import { z } from 'zod';

export const emailSchema = z.string().email('البريد الإلكتروني غير صحيح');

export const passwordSchema = z
  .string()
  .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
  .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
  .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير')
  .regex(/[0-9]/, 'يجب أن تحتوي على رقم');

export const phoneSchema = z
  .string()
  .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'رقم الهاتف غير صحيح');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  role: z.enum(['customer', 'handyman'], { message: 'الدور مطلوب' }),
  firstName: z.string().min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل'),
  lastName: z.string().min(2, 'الاسم الأخير يجب أن يكون حرفين على الأقل'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  phone: phoneSchema,
  address: z.string().optional(),
  specialization: z.string().optional(),
  yearsOfExperience: z.number().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export const bookingSchema = z.object({
  category: z.string().min(1, 'الفئة مطلوبة'),
  title: z.string().min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  scheduledDate: z.string().min(1, 'التاريخ مطلوب'),
  location: z.string().min(5, 'الموقع مطلوب'),
  estimatedDuration: z.string().min(1, 'المدة المتوقعة مطلوبة'),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, 'التقييم مطلوب').max(5),
  comment: z.string().min(10, 'التعليق يجب أن يكون 10 أحرف على الأقل'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateField = (schema: z.ZodSchema, value: any, field: string) => {
  try {
    const fieldSchema = schema instanceof z.ZodObject ? schema.shape[field] : schema;
    fieldSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorsArray = (error as any).errors as Array<{ message: string }>;
      return (errorsArray?.[0]?.message) || 'حدث خطأ في التحقق';
    }
    return 'حدث خطأ غير متوقع';
  }
};

export default {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  bookingSchema,
  reviewSchema,
};
