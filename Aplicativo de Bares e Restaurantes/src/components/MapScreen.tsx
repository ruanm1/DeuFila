import { MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import AdBanner from './AdBanner';
import ThemeToggle from './ThemeToggle';
import CampinaGrandeMap from './CampinaGrandeMap';

// Coordenadas reais de estabelecimentos em Campina Grande, PB
const venues = [
  { id: 1, name: 'Bar do Zé', lat: -7.2206, lng: -35.8811, crowdLevel: 'high' as const },
  { id: 2, name: 'Cervejaria Artesanal', lat: -7.2256, lng: -35.8761, crowdLevel: 'medium' as const },
  { id: 3, name: 'Restaurante Sabor', lat: -7.2356, lng: -35.8861, crowdLevel: 'low' as const },
  { id: 4, name: 'Pub irlandês', lat: -7.2156, lng: -35.8711, crowdLevel: 'high' as const },
  { id: 5, name: 'Choperia Central', lat: -7.2406, lng: -35.8911, crowdLevel: 'medium' as const },
];

const crowdColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

interface MapScreenProps {
  onSelectVenue: (id: number) => void;
  isPremium?: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function MapScreen({ onSelectVenue, isPremium = false, isDarkMode, onToggleTheme }: MapScreenProps) {
  return (
    <div className="relative h-screen w-full">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-white/90 dark:from-gray-900/90 to-transparent backdrop-blur-sm">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          <h1 className="text-gray-900 dark:text-white">Campina Grande</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDarkMode} onToggle={onToggleTheme} />
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 gap-2 text-xs sm:text-sm">
              <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Minha localização</span>
              <span className="xs:hidden">Localizar</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Campina Grande Map */}
      <div className="w-full h-full">
        <CampinaGrandeMap 
          venues={venues} 
          onSelectVenue={onSelectVenue}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Legenda de lotação:</p>
            <div className="flex gap-4 justify-around">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Vazio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Moderado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Lotado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}