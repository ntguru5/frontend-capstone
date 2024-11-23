import { Home, Clock, User, Code, TestTube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Clock, label: 'Logs', path: '/logs' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Code, label: 'API', path: '/api' },
    { icon: TestTube, label: 'Test', path: '/test' }
  ];

  return (
    <nav className="h-screen w-20 bg-indigo-900 fixed left-0 top-0 flex flex-col items-center py-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-xl mb-4 transition-all ${
              isActive
                ? 'bg-indigo-700 text-white'
                : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'
            }`}
          >
            <Icon size={24} />
          </Link>
        );
      })}
    </nav>
  );
}
