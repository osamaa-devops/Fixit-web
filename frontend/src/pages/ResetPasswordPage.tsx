import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword && formData.password.length >= 8) {
      navigate('/login');
    }
  };

  const passwordMatch = formData.password === formData.confirmPassword;
  const passwordStrong = formData.password.length >= 8;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-3xl rounded-3xl p-8 shadow-2xl border border-white/40">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary mb-6 font-black hover:translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} />
          عودة
        </button>

        <h1 className="text-2xl font-black mb-2">إعادة تعيين كلمة المرور</h1>
        <p className="text-gray-600 mb-8 font-bold">
          أدخل كلمة مرور جديدة آمنة
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Password Input */}
          <div>
            <label className="block text-sm font-black text-gray-700 mb-2">
              كلمة المرور الجديدة
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="أدخل كلمة مرور آمنة"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.password && (
              <p className={`text-xs font-bold mt-1 ${passwordStrong ? 'text-green-600' : 'text-yellow-600'}`}>
                {passwordStrong ? '✓ كلمة مرور قوية' : '⚠ يجب أن تكون 8 أحرف على الأقل'}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-black text-gray-700 mb-2">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="أعد إدخال كلمة المرور"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && (
              <p className={`text-xs font-bold mt-1 ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
                {passwordMatch ? '✓ كلمات المرور متطابقة' : '✗ كلمات المرور غير متطابقة'}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!passwordMatch || !passwordStrong}
            className="w-full bg-primary text-white py-3 rounded-xl font-black hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-8"
          >
            تحديث كلمة المرور
          </button>
        </form>
      </div>
    </div>
  );
}
