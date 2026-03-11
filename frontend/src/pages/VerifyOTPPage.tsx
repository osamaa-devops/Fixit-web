import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function VerifyOTPPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/\d/.test(value) && value !== '') return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[data-index="${index + 1}"]`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      navigate('/reset-password');
    }
  };

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

        <h1 className="text-2xl font-black mb-2">التحقق من رقم الهاتف</h1>
        <p className="text-gray-600 mb-8 font-bold">
          أدخل الكود المرسل إلى بريدك الإلكتروني
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-3 mb-8 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              data-index={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-12 h-12 text-center text-2xl font-black border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-8">
          <p className="text-gray-600 font-bold">
            {timeLeft > 0 
              ? `رمز جديد في ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
              : 'انتهت صلاحية الكود'}
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleVerify}
          disabled={otp.join('').length !== 6}
          className="w-full bg-primary text-white py-3 rounded-xl font-black hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          تحقق
        </button>

        {/* Resend Option */}
        <p className="text-center text-gray-600 mt-6 font-bold">
          لم تستقبل الكود؟{' '}
          <button className="text-primary font-black hover:underline">
            أرسل مرة أخرى
          </button>
        </p>
      </div>
    </div>
  );
}
