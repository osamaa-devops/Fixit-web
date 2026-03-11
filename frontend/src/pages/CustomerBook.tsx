import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, UploadCloud, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export function CustomerBook() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const submitRequest = () => {
    // In a real app, this would hit an API endpoint
    navigate('/customer/track/1'); // Navigate to the tracking page for the new request
  };

  return (
    <div className="w-[95%] max-w-[1000px] mx-auto mt-10 mb-20 bg-white/70 backdrop-blur-[30px] rounded-[50px] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-white/50 overflow-hidden font-sans text-text-primary flex flex-col transition-all duration-400 fade-in-up">
      
      {/* Wizard Header */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent p-[60px_40px] border-b border-black/5 text-center">
        
        {/* Target Handyman Summary */}
        <div className="inline-flex items-center gap-4 bg-white p-[12px_30px_12px_12px] rounded-[60px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] mb-10 border border-black/5 transition-transform hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
          <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&h=100&fit=crop" alt="HM" className="w-[50px] h-[50px] rounded-full object-cover border-2 border-primary-soft" />
          <div className="text-right pr-2">
            <div className="font-black text-[1.1rem]">محمد علي سعيد</div>
            <div className="text-[0.95rem] font-bold text-text-secondary">حجز خدمة سباكة وتأسيس</div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between relative max-w-[600px] mx-auto">
          <div className="absolute top-[28px] left-[40px] right-[40px] h-1 bg-black/5 z-0 rounded-full"></div>
          
          <div className={clsx("flex flex-col items-center gap-4 z-10 relative", currentStep >= 1 ? "active" : "")}>
            <div className={clsx(
              "w-[60px] h-[60px] rounded-[22px] border-2 border-black/5 flex items-center justify-center font-black text-[1.3rem] transition-all duration-400 shadow-[0_8px_20px_rgba(0,0,0,0.03)]",
              currentStep === 1 ? "bg-primary text-white border-transparent scale-110 shadow-[0_15px_35px_rgba(255,107,53,0.3)] rotate-3" : 
              currentStep > 1 ? "bg-emerald-500 text-white border-transparent" : "bg-white text-text-secondary"
            )}>
              {currentStep > 1 ? <CheckCircle size={24} strokeWidth={3} /> : "1"}
            </div>
            <div className={clsx("text-[1rem] transition-all", currentStep === 1 ? "font-black text-primary opacity-100" : currentStep > 1 ? "font-bold text-emerald-500 opacity-80" : "font-bold text-text-secondary opacity-60")}>
              التفاصيل والصور
            </div>
          </div>

          <div className={clsx("flex flex-col items-center gap-4 z-10 relative", currentStep >= 2 ? "active" : "")}>
            <div className={clsx(
              "w-[60px] h-[60px] rounded-[22px] border-2 border-black/5 flex items-center justify-center font-black text-[1.3rem] transition-all duration-400 shadow-[0_8px_20px_rgba(0,0,0,0.03)]",
              currentStep === 2 ? "bg-primary text-white border-transparent scale-110 shadow-[0_15px_35px_rgba(255,107,53,0.3)] -rotate-3" : 
              currentStep > 2 ? "bg-emerald-500 text-white border-transparent" : "bg-white text-text-secondary"
            )}>
              {currentStep > 2 ? <CheckCircle size={24} strokeWidth={3} /> : "2"}
            </div>
            <div className={clsx("text-[1rem] transition-all", currentStep === 2 ? "font-black text-primary opacity-100" : currentStep > 2 ? "font-bold text-emerald-500 opacity-80" : "font-bold text-text-secondary opacity-60")}>
              الموعد والمكان
            </div>
          </div>

          <div className={clsx("flex flex-col items-center gap-4 z-10 relative", currentStep >= 3 ? "active" : "")}>
            <div className={clsx(
              "w-[60px] h-[60px] rounded-[22px] border-2 border-black/5 flex items-center justify-center font-black text-[1.3rem] transition-all duration-400 shadow-[0_8px_20px_rgba(0,0,0,0.03)]",
              currentStep === 3 ? "bg-primary text-white border-transparent scale-110 shadow-[0_15px_35px_rgba(255,107,53,0.3)] rotate-3" : 
              "bg-white text-text-secondary"
            )}>
              3
            </div>
            <div className={clsx("text-[1rem] transition-all", currentStep === 3 ? "font-black text-primary opacity-100" : "font-bold text-text-secondary opacity-60")}>
              تأكيد الطلب
            </div>
          </div>
        </div>
      </div>

      {/* Forms Body */}
      <div className="p-[40px_30px] md:p-[20px_60px_60px] min-h-[400px]">
        
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="text-[2.2rem] font-black text-text-primary mb-10 tracking-tight">اشرح المشكلة للفني</h2>

            <div className="mb-8">
              <label className="block mb-3 font-extrabold text-[1.1rem]">وصف المشكلة بدقة</label>
              <textarea 
                className="w-full p-6 border-2 border-black/5 rounded-[20px] font-bold text-[1.1rem] bg-white/80 transition-all outline-none focus:border-primary-soft focus:bg-white focus:shadow-[0_10px_25px_rgba(255,107,53,0.05)] resize-y min-h-[120px]"
                rows={5}
                placeholder="مثال: يوجد تسريب مياه من ماسورة الحوض في الحمام الرئيسي ونحتاج لتغيير الخلاط..."
              ></textarea>
            </div>

            <div className="mb-8">
              <label className="block mb-3 font-extrabold text-[1.1rem]">إرفاق صور توضيحية للمشكلة</label>
              <div className="border-[3px] border-dashed border-black/5 rounded-[24px] p-12 text-center bg-black/5 cursor-pointer transition-all hover:border-primary-soft hover:bg-primary/5 hover:scale-[0.99]">
                <UploadCloud size={50} className="text-primary mx-auto mb-5 opacity-80" strokeWidth={2.5}/>
                <div className="font-black text-[1.2rem] mb-3">اضغط أو اسحب الصور هنا</div>
                <div className="font-bold text-[1rem] text-text-secondary opacity-80">يساعد إرفاق الصور الفني على فهم المشكلة وتحديد السعر المتوقع.</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="text-[2.2rem] font-black text-text-primary mb-10 tracking-tight">متى وأين ترغب في الخدمة؟</h2>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1">
                <label className="block mb-3 font-extrabold text-[1.1rem]">تاريخ الزيارة</label>
                <input 
                  type="date" 
                  className="w-full p-[20px_24px] border-2 border-black/5 rounded-[20px] font-bold text-[1.1rem] bg-white/80 transition-all outline-none focus:border-primary-soft focus:bg-white focus:shadow-[0_10px_25px_rgba(255,107,53,0.05)]"
                  defaultValue="2026-02-22"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-3 font-extrabold text-[1.1rem]">الوقت المفضل</label>
                <select className="w-full p-[22px_24px] border-2 border-black/5 rounded-[20px] font-bold text-[1.1rem] bg-white/80 transition-all outline-none focus:border-primary-soft focus:bg-white focus:shadow-[0_10px_25px_rgba(255,107,53,0.05)] cursor-pointer">
                  <option>صباحاً (10:00 ص - 01:00 م)</option>
                  <option>عصراً (02:00 م - 05:00 م)</option>
                  <option>مساءً (06:00 م - 09:00 م)</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block mb-3 font-extrabold text-[1.1rem]">العنوان التفصيلي</label>
              <textarea 
                className="w-full p-6 border-2 border-black/5 rounded-[20px] font-bold text-[1.1rem] bg-white/80 transition-all outline-none focus:border-primary-soft focus:bg-white focus:shadow-[0_10px_25px_rgba(255,107,53,0.05)] resize-y"
                rows={3}
                placeholder="المحافظة، المنطقة، الشارع، رقم العمارة، رقم الشقة..."
              ></textarea>
            </div>

            <div className="mb-8">
              <label className="block mb-3 font-extrabold text-[1.1rem]">علامة مميزة (اختياري)</label>
              <input 
                type="text"
                className="w-full p-[20px_24px] border-2 border-black/5 rounded-[20px] font-bold text-[1.1rem] bg-white/80 transition-all outline-none focus:border-primary-soft focus:bg-white focus:shadow-[0_10px_25px_rgba(255,107,53,0.05)]"
                placeholder="بجوار صيدلية أو مسجد..."
              />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="animate-fade-in-up">
            <h2 className="text-[2.2rem] font-black text-text-primary mb-10 tracking-tight">مراجعة وتأكيد الطلب</h2>

            <div className="bg-red-500/5 backdrop-blur-[10px] border-2 border-red-500/10 rounded-[35px] p-10 flex flex-col sm:flex-row gap-8 items-start mb-10 transition-all hover:scale-[1.01] hover:bg-red-500/10">
              <div className="w-[76px] h-[76px] rounded-[20px] shrink-0 bg-white shadow-[0_10px_20px_rgba(239,68,68,0.1)] flex items-center justify-center text-red-500">
                <AlertTriangle size={32} strokeWidth={2.5}/>
              </div>
              <div>
                <h3 className="text-red-500 text-[1.4rem] font-black m-0 mb-3">الدفع نقداً فقط (Cash Only)</h3>
                <p className="m-0 text-text-secondary leading-[1.8] font-bold text-[1.1rem]">
                  بناءً على سياسة المنصة الحالية، يتم الدفع نقداً مباشرة للفني بعد الانتهاء من العمل والتأكد من
                  جودته. لن نطلب منك أبداً إدخال بيانات بطاقتك الائتمانية.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-8 mb-8 border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              <h3 className="m-0 text-[1.3rem] font-black border-b border-black/5 pb-4 mb-6">ملخص الطلب</h3>
              
              <div className="flex justify-between mb-4 text-[1.1rem]">
                <span className="text-text-secondary font-bold">الفني المختص</span>
                <span className="text-text-primary font-black">محمد علي سعيد</span>
              </div>
              <div className="flex justify-between mb-4 text-[1.1rem]">
                <span className="text-text-secondary font-bold">تاريخ الزيارة</span>
                <span className="text-text-primary font-black">22 فبراير 2026، عصراً</span>
              </div>
              <div className="flex justify-between mt-6 pt-4 border-t border-dashed border-black/10 text-[1.1rem]">
                <span className="text-primary font-black">التكلفة التقديرية</span>
                <span className="text-primary font-black">يحددها الفني لاحقاً</span>
              </div>
            </div>
            
          </div>
        )}

      </div>

      {/* Wizard Footer */}
      <div className="bg-white/40 p-[30px] md:p-[40px_60px] border-t border-black/5 flex justify-between items-center mt-auto">
        <button 
          onClick={prevStep}
          className={clsx(
            "flex items-center gap-3 p-[18px_40px] rounded-[24px] font-black text-[1.15rem] transition-all bg-white text-text-primary border-2 border-black/5 shadow-[0_10px_20px_rgba(0,0,0,0.02)] hover:bg-[#f8fafc] hover:scale-[1.02]",
            currentStep === 1 && "invisible"
          )}
        >
          <ArrowRight size={20} strokeWidth={3} />
          السابق
        </button>

        {currentStep < 3 ? (
          <button 
            onClick={nextStep}
            className="flex items-center gap-3 p-[20px_48px] rounded-[24px] font-black text-[1.15rem] transition-all bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white shadow-[0_15px_35px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.3)] hover:scale-[1.02] hover:bg-gradient-to-br hover:from-primary hover:to-[#ff8d64]"
          >
            التالي {currentStep === 1 ? "(الموعد والمكان)" : "(تأكيد الطلب)"}
            <ArrowLeft size={20} strokeWidth={3} />
          </button>
        ) : (
          <button 
            onClick={submitRequest}
            className="flex items-center gap-3 p-[20px_48px] rounded-[24px] font-black text-[1.15rem] transition-all bg-gradient-to-br from-primary to-[#ff8d64] text-white shadow-[0_15px_35px_rgba(255,107,53,0.3)] hover:shadow-[0_20px_45px_rgba(255,107,53,0.4)] hover:scale-[1.02]"
          >
            تأكيد وإرسال الطلب
            <CheckCircle size={20} strokeWidth={3} />
          </button>
        )}
      </div>

    </div>
  );
}
