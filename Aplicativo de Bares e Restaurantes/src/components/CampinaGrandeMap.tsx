import { MapPin } from 'lucide-react';
import { Badge } from './ui/badge';

interface Venue {
  id: number;
  name: string;
  lat: number;
  lng: number;
  crowdLevel: 'low' | 'medium' | 'high';
}

interface CampinaGrandeMapProps {
  venues: Venue[];
  onSelectVenue: (id: number) => void;
  isDarkMode: boolean;
}

const crowdColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

// Coordenadas de Campina Grande, PB
const CAMPINA_GRANDE_CENTER = {
  lat: -7.2306,
  lng: -35.8811,
};

export default function CampinaGrandeMap({ venues, onSelectVenue, isDarkMode }: CampinaGrandeMapProps) {
  // Converte coordenadas reais para posições no mapa (simplificado)
  const latLngToPosition = (lat: number, lng: number) => {
    // Normaliza as coordenadas para porcentagens da tela
    const latRange = 0.05; // ~5.5km de alcance vertical
    const lngRange = 0.05; // ~5.5km de alcance horizontal
    
    const x = ((lng - (CAMPINA_GRANDE_CENTER.lng - lngRange/2)) / lngRange) * 100;
    const y = ((lat - (CAMPINA_GRANDE_CENTER.lat - latRange/2)) / latRange) * 100;
    
    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, 100 - y))}%`, // Inverte Y porque CSS conta de cima pra baixo
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Embed Google Maps iframe */}
      <iframe
        title="Mapa de Campina Grande"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63203.18584324!2d-35.9150!3d-7.2306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac1e6c7c0a4b67%3A0x45e61b0e0d9c0b8c!2sCampina%20Grande%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={isDarkMode ? 'grayscale-[30%]' : ''}
      />
      
      {/* Overlay com marcadores dos estabelecimentos */}
      <div className="absolute inset-0 pointer-events-none">
        {venues.map((venue) => {
          const position = latLngToPosition(venue.lat, venue.lng);
          
          return (
            <div
              key={venue.id}
              className="absolute pointer-events-auto cursor-pointer group"
              style={position}
            >
              <div className="relative">
                <div className={`w-10 h-10 ${crowdColors[venue.crowdLevel]} rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-125`}
                  onClick={() => onSelectVenue(venue.id)}
                >
                  <MapPin className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">{venue.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className={`w-2 h-2 ${crowdColors[venue.crowdLevel]} rounded-full`} />
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {venue.crowdLevel === 'low' && 'Vazio'}
                        {venue.crowdLevel === 'medium' && 'Moderado'}
                        {venue.crowdLevel === 'high' && 'Lotado'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800" />
                </div>
                {/* Pulse animation */}
                <div className={`absolute inset-0 ${crowdColors[venue.crowdLevel]} rounded-full animate-ping opacity-30`} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* User location marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30" />
        </div>
      </div>
    </div>
  );
}
