import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Phone, Share2, Heart, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ReviewsList from './ReviewsList';
import LoyaltyCard from './LoyaltyCard';
import ReservationModal from './ReservationModal';
import AdBanner from './AdBanner';

interface VenueDetailScreenProps {
  venueId: number;
  isPremium: boolean;
  isDarkMode: boolean;
  onBack: () => void;
}

const venuesData = {
  1: {
    id: 1,
    name: 'Bar do Zé',
    category: 'Bar',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
    crowdLevel: 'high',
    rating: 4.5,
    totalReviews: 128,
    distance: '0.5 km',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 98765-4321',
    hours: 'Seg-Sáb: 17h - 2h',
    description: 'Bar tradicional com ambiente descontraído e variedade de cervejas artesanais.',
    hasLoyaltyProgram: true,
  },
  2: {
    id: 2,
    name: 'Cervejaria Artesanal',
    category: 'Cervejaria',
    image: 'https://images.unsplash.com/photo-1532634726-8f6e1e0ac4e4?w=800',
    crowdLevel: 'medium',
    rating: 4.8,
    totalReviews: 256,
    distance: '1.2 km',
    address: 'Av. Principal, 456 - Jardins',
    phone: '(11) 91234-5678',
    hours: 'Ter-Dom: 18h - 00h',
    description: 'Cervejaria com produção própria e harmonização com petiscos gourmet.',
    hasLoyaltyProgram: true,
  },
};

const crowdConfig = {
  low: { label: 'Vazio', color: 'bg-green-500', emoji: '🟢' },
  medium: { label: 'Moderado', color: 'bg-yellow-500', emoji: '🟡' },
  high: { label: 'Lotado', color: 'bg-red-500', emoji: '🔴' },
};

export default function VenueDetailScreen({ venueId, isPremium, isDarkMode, onBack }: VenueDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const venue = venuesData[venueId as keyof typeof venuesData] || venuesData[1];
  const crowd = crowdConfig[venue.crowdLevel as keyof typeof crowdConfig];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-md mx-auto w-full">
        {/* Header Image */}
        <div className="relative h-64 w-full">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 left-4 bg-white/90 hover:bg-white"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/90 hover:bg-white"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/90 hover:bg-white"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Crowd Badge */}
          <div className="absolute bottom-4 right-4">
            <Badge className={`${crowd.color} text-white border-none`}>
              {crowd.emoji} {crowd.label}
            </Badge>
          </div>

          {/* Premium Badge */}
          {isPremium && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 border-none">
                ⭐ Premium
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Title and Rating */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-gray-900 mb-1">{venue.name}</h1>
                <p className="text-gray-600">{venue.category}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="text-gray-900">{venue.rating}</span>
                </div>
                <p className="text-sm text-gray-500">{venue.totalReviews} avaliações</p>
              </div>
            </div>
            <p className="text-gray-700">{venue.description}</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Distância</span>
              </div>
              <p className="text-gray-900">{venue.distance}</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Horário</span>
              </div>
              <p className="text-gray-900 text-sm">{venue.hours}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Contato</span>
            </div>
            <p className="text-gray-900">{venue.phone}</p>
            <p className="text-sm text-gray-600">{venue.address}</p>
          </div>

          {/* Premium Discount */}
          {isPremium && (
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎁</div>
                <div>
                  <p className="text-gray-900 mb-1">Desconto Premium</p>
                  <p className="text-sm text-gray-800">25% de desconto exclusivo para membros premium</p>
                </div>
              </div>
            </div>
          )}

          {/* Reservation Button */}
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 gap-2"
            onClick={() => setReservationOpen(true)}
          >
            <Calendar className="w-5 h-5" />
            Fazer Reserva
          </Button>

          {/* Ad for non-premium users */}
          {!isPremium && (
            <AdBanner type="banner" />
          )}

          {/* Tabs */}
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="loyalty">Fidelidade</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="mt-4">
              <ReviewsList venueId={venue.id} isPremium={isPremium} />
            </TabsContent>
            
            <TabsContent value="loyalty" className="mt-4">
              {venue.hasLoyaltyProgram ? (
                <LoyaltyCard 
                  venueName={venue.name}
                  isPremium={isPremium}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Este estabelecimento ainda não possui programa de fidelidade</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        open={reservationOpen}
        onOpenChange={setReservationOpen}
        venueName={venue.name}
        isPremium={isPremium}
      />

      {/* Ad Banner */}
      <AdBanner />
    </div>
  );
}