import { Bell, Clock, Info, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import { clsx } from 'clsx';
import { useNotifications, useMarkNotificationAsRead } from '../hooks/useCustomer';

interface Notification {
  id: string;
  type?: 'status' | 'success' | 'alert';
  content?: string;
  text?: string;
  createdAt?: string;
  time?: string;
  read?: boolean;
  unread?: boolean;
}

export function CustomerNotifications() {
  const { data: notificationsData = [], isLoading } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();

  // Map API data to UI format
  const notifications: Notification[] = notificationsData.map(n => ({
    id: n.id,
    type: (n.type || 'status') as 'status' | 'success' | 'alert',
    text: n.content || n.text || '',
    unread: !n.read,
    time: n.createdAt ? new Date(n.createdAt).toLocaleDateString('ar-EG') : n.time || '',
  }));

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAsRead = (id: string) => {
    markAsRead.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    notifications.filter(n => n.unread).forEach(n => {
      markAsRead.mutate(n.id);
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-[850px] mx-auto p-4 md:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader size={40} className="animate-spin mx-auto mb-4 text-[#FF6B35]" />
          <p className="text-slate-600 font-bold">جاري تحميل الإشعارات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[850px] mx-auto p-4 md:p-8 animate-fade-in-up">
      <div className="bg-white/70 backdrop-blur-[25px] border border-white/40 rounded-[32px] shadow-2xl overflow-hidden">
        <div className="p-8 md:p-10 border-b-2 border-black/5 flex justify-between items-center flex-wrap gap-4 bg-white/30">
          <h1 className="text-[1.8rem] font-black m-0 flex items-center gap-4">
            إشعاراتي
            {unreadCount > 0 && <span className="text-[1.2rem] bg-[#FF6B35] text-white px-3 py-1 rounded-xl font-black shadow-lg shadow-[#FF6B35]/20">{unreadCount} جديدة</span>}
          </h1>
          {unreadCount > 0 && (
            <button onClick={handleMarkAllAsRead} className="px-5 py-2.5 bg-[#FF6B35]/10 text-[#FF6B35] rounded-2xl font-black text-[1rem] hover:bg-[#FF6B35] hover:text-white hover:-translate-y-0.5 transition-all">
              تحديد الكل كمقروء
            </button>
          )}
        </div>

        <div className="flex flex-col">
          {notifications.map((n, idx) => (
            <div 
              key={n.id} 
              className={clsx(
                "flex items-start gap-6 p-7 md:p-10 border-b border-black/5 last:border-0 cursor-pointer transition-all hover:bg-white hover:scale-[1.01] hover:shadow-xl hover:z-10 group animate-fade-in-up",
                n.unread && "bg-[#FF6B35]/03 border-r-4 border-r-[#FF6B35]"
              )}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => n.unread && handleMarkAsRead(n.id)}
            >
              <div className={clsx(
                "w-14 h-14 rounded-[18px] flex items-center justify-center shrink-0 shadow-sm border border-black/5 transition-transform group-hover:rotate-[-5deg] group-hover:scale-110",
                n.type === 'status' ? "text-blue-500 bg-blue-50" : 
                n.type === 'success' ? "text-emerald-500 bg-emerald-50" : 
                "text-amber-500 bg-amber-50"
              )}>
                {n.type === 'status' && <Clock size={28} strokeWidth={2.5} />}
                {n.type === 'success' && <CheckCircle size={28} strokeWidth={2.5} />}
                {n.type === 'alert' && <AlertTriangle size={28} strokeWidth={2.5} />}
              </div>

              <div className="flex-1">
                <p className={clsx("text-[1.15rem] text-[#1a1a1a] mb-3 leading-relaxed", n.unread ? "font-black" : "font-bold")}>
                  {n.text}
                </p>
                <div className="flex items-center gap-2 text-[0.95rem] text-[#555555] font-black">
                  <Info size={16} strokeWidth={2.5} className="text-[#FF6B35]" />
                  {n.time}
                </div>
              </div>

              {n.unread && (
                <div className="relative w-3 h-3 bg-[#FF6B35] rounded-full mt-6 shrink-0">
                  <div className="absolute inset-0 bg-[#FF6B35] rounded-full animate-ping opacity-75" />
                </div>
              )}
            </div>
          ))}
          {NOTIFICATIONS.length === 0 && (
            <div className="py-24 text-center flex flex-col items-center gap-4">
              <Bell size={64} className="text-slate-200" />
              <p className="text-slate-400 font-bold text-lg">لا توجد تنبيهات جديدة حالياً</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
