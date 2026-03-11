
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function CustomerLayout() {
  return (
    <div className="min-h-screen relative" style={{ paddingTop: '100px', minHeight: '100vh', background: 'radial-gradient(circle at top left, #fdfbfb 0%, #ebedee 100%)' }}>
      <Navbar />
      <main className="container content-inner">
        <Outlet />
      </main>
    </div>
  );
}
