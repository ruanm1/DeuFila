import { useState } from 'react';
import { Search, Flame, TrendingUp, Crown } from 'lucide-react';
import { Input } from './ui/input';
import VenueCard from './VenueCard';
import CouponCard from './CouponCard';
import AdvancedFilters, { FilterOptions } from './AdvancedFilters';
import AdBanner from './AdBanner';
import PremiumUpgradeAd from './PremiumUpgradeAd';
import ThemeToggle from './ThemeToggle';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import logo from 'figma:asset/110401e48911992189bdf3d5550ecdeaf758835d.png';

const venues = [
  {
    id: 1,
    name: 'Bar do Zé',
    category: 'Bar',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
    crowdLevel: 'high',
    rating: 4.5,
    distance: '0.5 km',
    promotion: '2x1 em cervejas até 19h',
    premiumDiscount: 25,
    hasLoyaltyProgram: true,
  },
  {
    id: 2,
    name: 'Cervejaria Artesanal',
    category: 'Cervejaria',
    image: 'https://images.unsplash.com/photo-1532634726-8f6e1e0ac4e4?w=800',
    crowdLevel: 'medium',
    rating: 4.8,
    distance: '1.2 km',
    promotion: null,
    premiumDiscount: 20,
    hasLoyaltyProgram: true,
  },
  {
    id: 3,
    name: 'Restaurante Sabor',
    category: 'Restaurante',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    crowdLevel: 'low',
    rating: 4.3,
    distance: '2.1 km',
    promotion: '15% de desconto no almoço',
    premiumDiscount: 30,
    hasLoyaltyProgram: false,
  },
  {
    id: 4,
    name: 'Pub irlandês',
    category: 'Pub',
    image: 'https://images.unsplash.com/photo-1543007631-283050bb3e8c?w=800',
    crowdLevel: 'high',
    rating: 4.6,
    distance: '0.8 km',
    promotion: null,
    premiumDiscount: 25,
    hasLoyaltyProgram: true,
  },
  {
    id: 5,
    name: 'Choperia Central',
    category: 'Choperia',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800',
    crowdLevel: 'medium',
    rating: 4.4,
    distance: '1.5 km',
    promotion: 'Happy hour até 20h',
    premiumDiscount: 20,
    hasLoyaltyProgram: false,
  },
];

const coupons = [
  {
    id: 1,
    venueName: 'Bar do Zé',
    discount: '30%',
    description: 'Desconto em toda a casa',
    validUntil: '2025-11-20',
    code: 'BAR30',
    premiumOnly: false,
  },
  {
    id: 2,
    venueName: 'Restaurante Sabor',
    discount: 'R$ 20',
    description: 'Desconto na conta acima de R$ 100',
    validUntil: '2025-11-25',
    code: 'SABOR20',
    premiumOnly: false,
  },
  {
    id: 3,
    venueName: 'Cervejaria Artesanal',
    discount: '40%',
    description: 'Desconto exclusivo Premium em cervejas especiais',
    validUntil: '2025-11-30',
    code: 'PREMIUM40',
    premiumOnly: true,
  },
];

interface HomeScreenProps {
  isPremium: boolean;
  onSelectVenue: (id: number) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function HomeScreen({ isPremium, onSelectVenue, isDarkMode, onToggleTheme }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    venueTypes: [],
    priceRange: [1, 4],
    openNow: false,
    hasPromotion: false,
    hasLoyaltyProgram: false,
  });

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || venue.crowdLevel === selectedFilter;
    
    // Advanced filters
    const matchesType = advancedFilters.venueTypes.length === 0 || 
                       advancedFilters.venueTypes.includes(venue.category.toLowerCase());
    const matchesPromotion = !advancedFilters.hasPromotion || venue.promotion !== null;
    const matchesLoyalty = !advancedFilters.hasLoyaltyProgram || venue.hasLoyaltyProgram;
    
    return matchesSearch && matchesFilter && matchesType && matchesPromotion && matchesLoyalty;
  });

  const availableCoupons = coupons.filter(coupon => !coupon.premiumOnly || isPremium);

  return (
    <div className="p-4 space-y-6 w-full">
      {/* Header */}
      <div className="pt-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Deu Fila" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="text-gray-900 dark:text-white mb-1">Descubra</h1>
            <p className="text-gray-600 dark:text-gray-300">Os melhores lugares perto de você</p>
          </div>
        </div>
        <ThemeToggle isDark={isDarkMode} onToggle={onToggleTheme} />
      </div>

      {/* Premium Banner */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 mb-1">Torne-se Premium</p>
              <p className="text-sm text-gray-800">Descontos maiores e menos visitas para recompensas!</p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar bares e restaurantes..."
          className="pl-10 bg-white shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <AdvancedFilters onApplyFilters={setAdvancedFilters} />
        <Badge
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          className={`cursor-pointer whitespace-nowrap ${
            selectedFilter === 'all' ? 'bg-orange-500 hover:bg-orange-600' : ''
          }`}
          onClick={() => setSelectedFilter('all')}
        >
          Todos
        </Badge>
        <Badge
          variant={selectedFilter === 'low' ? 'default' : 'outline'}
          className={`cursor-pointer whitespace-nowrap ${
            selectedFilter === 'low' ? 'bg-green-500 hover:bg-green-600' : ''
          }`}
          onClick={() => setSelectedFilter('low')}
        >
          🟢 Vazio
        </Badge>
        <Badge
          variant={selectedFilter === 'medium' ? 'default' : 'outline'}
          className={`cursor-pointer whitespace-nowrap ${
            selectedFilter === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' : ''
          }`}
          onClick={() => setSelectedFilter('medium')}
        >
          🟡 Moderado
        </Badge>
        <Badge
          variant={selectedFilter === 'high' ? 'default' : 'outline'}
          className={`cursor-pointer whitespace-nowrap ${
            selectedFilter === 'high' ? 'bg-red-500 hover:bg-red-600' : ''
          }`}
          onClick={() => setSelectedFilter('high')}
        >
          🔴 Lotado
        </Badge>
      </div>

      {/* Hot Now */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-orange-500" />
          <h2 className="text-gray-900 dark:text-white">Populares agora</h2>
        </div>
        <div className="space-y-3">
          {filteredVenues.map((venue, index) => (
            <div key={`venue-${venue.id}`}>
              <VenueCard venue={venue} isPremium={isPremium} onClick={() => onSelectVenue(venue.id)} />
              {/* Ad after 2nd venue */}
              {!isPremium && index === 1 && (
                <div className="mt-3">
                  <AdBanner type="card" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Premium Upgrade Ad for non-premium users */}
      {!isPremium && (
        <PremiumUpgradeAd variant="compact" />
      )}

      {/* Coupons */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h2 className="text-gray-900 dark:text-white">Cupons disponíveis</h2>
        </div>
        <div className="space-y-3">
          {availableCoupons.map((coupon, index) => (
            <div key={`coupon-${coupon.id}`}>
              <CouponCard coupon={coupon} />
              {/* Inline ad after 1st coupon */}
              {!isPremium && index === 0 && (
                <div className="mt-3">
                  <AdBanner type="inline" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}