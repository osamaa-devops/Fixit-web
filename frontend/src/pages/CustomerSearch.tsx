// Reusing HandymanCard for now. Note that search view uses a slightly different horizontal layout in the mockup 

// Reusing HandymanCard for now. Note that search view uses a slightly different horizontal layout in the mockup 
// but we will use the shared one to start and refine later if needed.
import { HandymanCard } from '../components/shared/HandymanCard';

const SEARCH_RESULTS = [
  {
    id: '1',
    name: 'محمد علي سعيد',
    category: 'متخصص سباكة وتأسيس',
    rating: 4.9,
    reviewsCount: 124,
    isAvailable: true,
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: '2',
    name: 'أحمد حسن جلال',
    category: 'كهربائي منازل محترف',
    rating: 4.8,
    reviewsCount: 85,
    isAvailable: true,
    avatar: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: '3',
    name: 'سيد إبراهيم خليل',
    category: 'نجار موبيليا وتصليحات',
    rating: 4.7,
    reviewsCount: 210,
    isAvailable: false,
    avatar: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: '4',
    name: 'خالد إبراهيم عثمان',
    category: 'نقاشة ودهانات عامة',
    rating: 4.9,
    reviewsCount: 42,
    isAvailable: true,
    avatar: 'https://i.pravatar.cc/150?u=4'
  }
];

export function CustomerSearch() {
  return (
    <div className="w-[95%] max-w-[1400px] mx-auto mt-10 mb-20 grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10 font-sans text-text-primary fade-in-up">
      
      {/* Sidebar Filters */}
      <aside className="bg-white/70 backdrop-blur-[25px] rounded-[40px] p-8 border border-white/40 sticky top-[110px] h-fit shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="mb-6">
          <h3 className="text-[1.6rem] font-black m-0 text-text-primary">تصفية البحث</h3>
        </div>

        <div className="mb-8">
          <label className="block font-black text-text-primary mb-4 text-[1.1rem]">📍 المنطقة الجغرافية</label>
          <select className="w-full p-3.5 rounded-2xl bg-white border border-white/40 font-extrabold text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer">
            <option>القاهرة - كافة المناطق</option>
            <option defaultValue="selected">القاهرة - مدينة نصر</option>
            <option>القاهرة - المعادي</option>
            <option>القاهرة - التجمع الخامس</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block font-black text-text-primary mb-4 text-[1.1rem]">🛠️ التخصص المطلوب</label>
          <select className="w-full p-3.5 rounded-2xl bg-white border border-white/40 font-extrabold text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer">
            <option value="">الكل — جميع التخصصات</option>
            <option value="plumbing">🚰 السباكة والتأسيس</option>
            <option value="elec">⚡ الكهرباء والإنارة</option>
            <option value="carp">🪚 النجارة وتصليح الموبيليا</option>
            <option value="ac">❄️ التكييف والتبريد</option>
            <option value="painting">🖌️ الدهانات والنقاشة</option>
            <option value="cleaning">🧹 النظافة والتعقيم</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block font-black text-text-primary mb-4 text-[1.1rem]">⚡ خيارات سريعة</label>
          <div className="flex items-center gap-3 mb-3 cursor-pointer p-2.5 rounded-xl transition-colors hover:bg-primary/5">
            <input type="checkbox" id="verified" defaultChecked className="w-5 h-5 accent-primary" />
            <label htmlFor="verified" className="font-bold text-text-secondary cursor-pointer flex-1">فنيين معتمدين فقط</label>
          </div>
          <div className="flex items-center gap-3 mb-3 cursor-pointer p-2.5 rounded-xl transition-colors hover:bg-primary/5">
            <input type="checkbox" id="express" className="w-5 h-5 accent-primary" />
            <label htmlFor="express" className="font-bold text-text-secondary cursor-pointer flex-1">دعم سريع (إكسبريس)</label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main>
        {/* Results Hero */}
        <div className="bg-white/70 backdrop-blur-[25px] rounded-[32px] p-8 md:px-10 border border-white/40 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div>
            <h2 className="text-[1.8rem] font-black m-0 mb-2">تم العثور على <span className="text-primary">{SEARCH_RESULTS.length}</span> فني محترف</h2>
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3.5 py-1.5 rounded-full text-[0.95rem] font-black mt-2">
              📍 القاهرة - مدينة نصر
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="font-extrabold text-text-secondary whitespace-nowrap">ترتيب حسب:</label>
            <select className="min-w-[180px] p-3.5 rounded-2xl bg-white border border-white/40 font-extrabold text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer">
              <option>الأعلى تقييماً</option>
              <option>الأكثر خبرة</option>
              <option>الأقل سعراً</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          {SEARCH_RESULTS.map(handyman => (
             <HandymanCard key={handyman.id} handyman={handyman} />
          ))}
        </div>
      </main>

    </div>
  );
}
