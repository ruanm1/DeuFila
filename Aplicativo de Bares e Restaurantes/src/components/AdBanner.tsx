import { X, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface AdBannerProps {
  type?: 'banner' | 'card' | 'inline';
  position?: 'top' | 'bottom' | 'middle';
}

const adContent = [
  {
    title: 'Cervejaria Premium',
    description: 'Happy hour especial: 50% OFF em cervejas artesanais',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400',
    sponsor: 'Cervejaria Dourada',
  },
  {
    title: 'Restaurante Gourmet',
    description: 'Almoço executivo com 30% de desconto',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    sponsor: 'Sabores da Terra',
  },
  {
    title: 'Pub & Lounge',
    description: 'Música ao vivo todas as sextas. Reserve já!',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400',
    sponsor: 'The Rock Pub',
  },
];

export default function AdBanner({ type = 'banner', position = 'middle' }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd] = useState(adContent[Math.floor(Math.random() * adContent.length)]);

  if (!isVisible) return null;

  if (type === 'inline') {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200 relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded">Anúncio</span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={currentAd.image}
            alt={currentAd.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 mb-1">{currentAd.title}</p>
            <p className="text-xs text-gray-600 line-clamp-2">{currentAd.description}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
        <div className="absolute top-2 left-2 z-10">
          <span className="text-xs text-gray-600 bg-white/90 px-2 py-1 rounded">Patrocinado</span>
        </div>
        <div className="relative h-32">
          <img
            src={currentAd.image}
            alt={currentAd.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="p-3">
          <p className="text-gray-900 mb-1">{currentAd.title}</p>
          <p className="text-sm text-gray-600 mb-2">{currentAd.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{currentAd.sponsor}</span>
            <Button size="sm" variant="ghost" className="text-orange-500 h-8">
              Saiba mais
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default banner type
  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100 relative">
      <div className="flex items-start gap-3">
        <img
          src={currentAd.image}
          alt={currentAd.title}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
              Patrocinado
            </span>
          </div>
          <p className="text-gray-900 mb-1">{currentAd.title}</p>
          <p className="text-sm text-gray-600 mb-2">{currentAd.description}</p>
          <span className="text-xs text-gray-500">{currentAd.sponsor}</span>
        </div>
        <ExternalLink className="w-5 h-5 text-orange-500 flex-shrink-0" />
      </div>
    </div>
  );
}
