import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

type Role = 'customer' | 'handyman';

export function RegisterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRole = (searchParams.get('role') as Role) || 'customer';
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isHandyman = currentRole === 'handyman';
  const totalSteps = isHandyman ? 5 : 4;
  
  const stepTitles = isHandyman 
    ? ['البيانات الشخصية', 'إثبات الهوية', 'الموقع والعنوان', 'البيانات المهنية', 'تأمين الحساب']
    : ['البيانات الشخصية', 'إثبات الهوية', 'الموقع والعنوان', 'تأمين الحساب'];

  const handleRoleChange = (role: Role) => {
    setSearchParams({ role });
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((s: number) => s + 1);
    } else {
      // Mock submit
      navigate(isHandyman ? '/pending-approval' : '/customer/home');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <Input label="الاسم بالكامل" placeholder="الاسم بالكامل" required />
            <Input label="البريد الإلكتروني" type="email" dir="ltr" placeholder="test@email.com" required />
            <Input label="رقم الهاتف" type="tel" dir="ltr" placeholder="01X XXXX XXXX" required />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
             <Input label="تاريخ الميلاد" type="date" dir="ltr" required />
             {isHandyman && (
               <div>
                  <label className="block text-white/40 mb-3 text-sm">الصورة الشخصية</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 hover:bg-white/5 cursor-pointer text-center text-white/60 transition-colors">
                    + اضغط هنا لرفع صورة
                  </div>
               </div>
             )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <Input label="المحافظة" placeholder="القاهرة" required />
            <Input label="المنطقة / الحي" placeholder="مدينة نصر" required />
            <Input label="العنوان بالتفصيل" placeholder="رقم العمارة والشقة..." required />
          </div>
        );
      case 4:
        if (isHandyman) {
          return (
            <div className="space-y-6 animate-fade-in">
               <Input label="التخصص الأساسي" placeholder="مثال: سباكة" required />
               <Input label="سنوات الخبرة" type="number" dir="ltr" required />
            </div>
          );
        }
        return renderSecurityStep();
      case 5:
        return renderSecurityStep();
    }
  };

  const renderSecurityStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="relative">
        <Input 
          type={showPassword ? 'text' : 'password'} 
          placeholder="كلمة المرور" 
          dir="ltr"
          className="pr-12"
          label="كلمة المرور"
          required 
        />
        <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-4 top-[38px] text-white/40 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      <div className="relative">
        <Input type="password" placeholder="تأكيد كلمة المرور" dir="ltr" label="تأكيد كلمة المرور" required />
      </div>

      <label className="flex items-start gap-3 mt-6 cursor-pointer p-4 bg-white/5 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all">
        <input type="checkbox" className="hidden peer" required />
        <div className={clsx(
          "w-6 h-6 border-2 border-white/20 rounded flex items-center justify-center shrink-0 transition-colors",
          isHandyman ? "peer-checked:bg-secondary peer-checked:border-secondary peer-checked:shadow-[0_0_15px_var(--color-handyman-glow)]" 
                     : "peer-checked:bg-primary peer-checked:border-primary peer-checked:shadow-[0_0_15px_var(--color-customer-glow)]"
        )}>
          <span className="text-white text-sm hidden peer-checked:block font-black">✓</span>
        </div>
        <span className="text-sm text-white/60 leading-tight">
          أوافق على <Link to="/legal" className="text-white font-bold hover:underline">الشروط والأحكام</Link> وسياسة الخصوصية
        </span>
      </label>
    </div>
  );

  return (
    <div className="w-full max-w-[500px] mx-auto text-white pb-10">
      
      {/* Role Nav */}
      <div className="flex gap-6 mb-8">
        <button 
          className={clsx("pb-2 border-b-2 font-bold transition-all", !isHandyman ? "border-primary text-white" : "border-transparent text-white/40")}
          onClick={() => handleRoleChange('customer')}
        >
          أنا عميل
        </button>
        <button 
          className={clsx("pb-2 border-b-2 font-bold transition-all", isHandyman ? "border-secondary text-white" : "border-transparent text-white/40")}
          onClick={() => handleRoleChange('handyman')}
        >
          أنا فني
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-10">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={clsx(
              "h-1.5 flex-1 rounded-full transition-colors", 
              i + 1 <= currentStep ? (isHandyman ? 'bg-secondary' : 'bg-primary') : 'bg-white/10'
            )} 
          />
        ))}
      </div>

      <div className="mb-10 text-right">
        <span className={clsx("block text-sm font-bold uppercase tracking-wider mb-2", isHandyman ? "text-secondary" : "text-primary")}>
          الخطوة {currentStep} من {totalSteps}
        </span>
        <h2 className="text-[2.2rem] font-black text-white">{stepTitles[currentStep - 1]}</h2>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        
        {renderStep()}

        <Button 
          type="submit" 
          variant="primary" 
          className={clsx(
            "w-full py-5 rounded-2xl text-[1.1rem] font-black mt-8",
            isHandyman && "bg-secondary hover:bg-[#3aa394] shadow-[0_15px_30px_var(--color-handyman-glow)]"
          )}
        >
          <span>{currentStep === totalSteps ? 'إنشاء الحساب' : 'التالي'}</span>
          <span className="mr-3">⟶</span>
        </Button>

        {currentStep > 1 && (
          <button 
            type="button" 
            onClick={() => setCurrentStep((s: number) => s - 1)}
            className="w-full mt-5 text-white/40 hover:text-white font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <span>⟵</span> الرجوع للخطوة السابقة
          </button>
        )}
      </form>
    </div>
  );
}
