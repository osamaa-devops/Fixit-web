import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  date: string;
}

const INITIAL_PORTFOLIO: PortfolioItem[] = [
  { id: 1, title: 'تأسيس حمام كامل بالمعادي', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', date: '15 أكتوبر 2025' },
  { id: 2, title: 'تغيير وصيانة أحواض', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop', date: '12 نوفمبر 2025' },
  { id: 3, title: 'تركيب سخانات غاز', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', date: '20 ديسمبر 2025' },
];

export function HandymanPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [showUpload, setShowUpload] = useState(false);

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#e2e8f0] p-4 md:p-8 font-sans animate-fade-in-up">
      <div className="portfolio-container max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[2rem] font-black text-[#1a1a1a] mb-2">إدارة معرض الأعمال</h1>
          <p className="text-[#555555] text-[1.1rem] font-bold">الصور الجيدة تزيد من ثقة العملاء بك وترفع فرصة قبول طلباتك.</p>
        </div>
        <button 
          onClick={() => setShowUpload(!showUpload)}
          className="bg-[#4db8a8] hover:bg-[#3aa394] text-white px-6 py-3 rounded-[14px] font-black text-[1rem] flex items-center gap-2 shadow-lg shadow-[#4db8a8]/20 transition-all hover:-translate-y-0.5"
        >
          <Plus size={24} /> إضافة عمل جديد
        </button>
      </div>

      {showUpload && (
        <div className="bg-white/70 border-2 border-dashed border-[#4db8a8] rounded-[32px] p-16 text-center mb-12 cursor-pointer hover:bg-white/90 transition-all group animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <ImageIcon size={64} className="text-[#4db8a8] group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-[1.25rem] font-black text-[#1a1a1a] mb-2">اسحب وأفلت الصور هنا</h3>
          <p className="text-[#555555] font-bold">أو اضغط لاختيار ملفات من جهازك (الحد الأقصى 5 ميجابايت للصورة)</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="bg-white/70 backdrop-blur-3xl rounded-[32px] overflow-hidden border border-white/40 shadow-xl group hover:-translate-y-3 hover:shadow-2xl hover:border-[#4db8a8]/50 hover:bg-white transition-all duration-500 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-[4/3]">
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-4 left-4 bg-white/90 text-red-500 p-2 rounded-xl opacity-0 translate-y-[-5px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-500 hover:text-white shadow-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="p-5">
              <span className="block font-black text-[1.1rem] text-[#1a1a1a] mb-1">{item.title}</span>
              <span className="block text-[0.85rem] text-[#555555] font-bold">أضيف في {item.date}</span>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white/50 rounded-[32px] border border-dashed border-[#e2e8f0]">
             <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
             <p className="text-slate-400 font-bold">لا توجد أعمال في معرضك بعد. ابدأ بإضافة صور لمهامك الناجحة!</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
