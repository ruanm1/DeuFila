import { User, Heart, Ticket, Settings, LogOut, Crown, Star, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import PremiumUpgradeAd from './PremiumUpgradeAd';
import ThemeToggle from './ThemeToggle';
import QRCodeDisplay from './QRCodeDisplay';
import { toast } from 'sonner';

interface ProfileScreenProps {
  isPremium: boolean;
  onUpgrade: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function ProfileScreen({ isPremium, onUpgrade, isDarkMode, onToggleTheme }: ProfileScreenProps) {
  const userStats = [
    { label: 'Locais visitados', value: 12, icon: MapPin },
    { label: 'Favoritos', value: 8, icon: Heart },
    { label: 'Cupons usados', value: 5, icon: Ticket },
  ];

  return (
    <div className="p-4 space-y-6 w-full">
      {/* Profile Header */}
      <div className="text-center pt-6 relative">
        <div className="absolute top-2 right-2">
          <ThemeToggle isDark={isDarkMode} onToggle={onToggleTheme} />
        </div>
        <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 ${isPremium ? 'bg-gradient-to-br from-amber-400 to-yellow-500' : 'bg-gradient-to-br from-orange-400 to-red-500'} rounded-full mb-4 relative`}>
          <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          {isPremium && (
            <div className="absolute -top-1 -right-1 bg-white rounded-full p-1">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            </div>
          )}
        </div>
        <h2 className="text-gray-900 dark:text-white mb-1">João Silva</h2>
        <p className="text-gray-600 dark:text-gray-300">joao.silva@email.com</p>
        {isPremium && (
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full mt-2">
            <Crown className="w-4 h-4" />
            <span className="text-sm">Membro Premium</span>
          </div>
        )}
      </div>

      {/* Premium Upgrade */}
      {!isPremium && (
        <PremiumUpgradeAd variant="full" onUpgrade={onUpgrade} />
      )}

      {/* QR Code */}
      <QRCodeDisplay 
        userId="user-12345" 
        userName="João Silva" 
        isPremium={isPremium}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm">
          <p className="text-gray-900 dark:text-white mb-1">12</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Visitados</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm">
          <p className="text-gray-900 dark:text-white mb-1">8</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Favoritos</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm">
          <p className="text-gray-900 dark:text-white mb-1">{isPremium ? '12' : '5'}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Cupons</p>
        </div>
      </div>

      {/* Favorites */}
      <div>
        <h3 className="text-gray-900 dark:text-white mb-3">Locais favoritos</h3>
        <div className="space-y-2">
          {['Bar do Zé', 'Cervejaria Artesanal', 'Pub irlandês'].map((venue, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">{venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-14 dark:border-gray-700"
        >
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="dark:text-gray-300">Configurações</span>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-14 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
}