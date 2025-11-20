import { Home, Map, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: 'home' | 'map' | 'profile';
  onNavigate: (screen: 'home' | 'map' | 'profile') => void;
  isDarkMode: boolean;
}

export default function BottomNav({ currentScreen, onNavigate, isDarkMode }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Início' },
    { id: 'map' as const, icon: Map, label: 'Mapa' },
    { id: 'profile' as const, icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 transition-colors">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4 sm:px-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 ${isActive ? 'fill-orange-100 dark:fill-orange-900' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}