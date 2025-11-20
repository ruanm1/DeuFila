import { MapPin, Star, Users, Crown } from 'lucide-react';
import { Badge } from './ui/badge';

interface Venue {
  id: number;
  name: string;
  category: string;
  image: string;
  crowdLevel: 'low' | 'medium' | 'high';
  rating: number;
  distance: string;
  promotion: string | null;
  premiumDiscount?: number;
}

interface VenueCardProps {
  venue: Venue;
  isPremium?: boolean;
  onClick?: () => void;
}

const crowdConfig = {
  low: { label: 'Vazio', color: 'bg-green-500', emoji: '🟢' },
  medium: { label: 'Moderado', color: 'bg-yellow-500', emoji: '🟡' },
  high: { label: 'Lotado', color: 'bg-red-500', emoji: '🔴' },
};

export default function VenueCard({ venue, isPremium = false, onClick }: VenueCardProps) {
  const crowd = crowdConfig[venue.crowdLevel];

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer w-full"
      onClick={onClick}
    >
      <div className="relative h-40 sm:h-48 w-full">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={`${crowd.color} text-white border-none text-xs sm:text-sm`}>
            {crowd.emoji} {crowd.label}
          </Badge>
        </div>
        {venue.promotion && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-white text-sm">🎉 {venue.promotion}</p>
          </div>
        )}
        {isPremium && venue.premiumDiscount && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 border-none">
              <Crown className="w-3 h-3 mr-1" />
              {venue.premiumDiscount}% OFF
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">{venue.name}</h3>
            <p className="text-gray-600 text-sm">{venue.category}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm text-gray-900">{venue.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{venue.distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Ver movimento</span>
          </div>
        </div>
      </div>
    </div>
  );
}