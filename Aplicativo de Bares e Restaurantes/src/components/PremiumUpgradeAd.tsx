import { Button } from './ui/button';
import { Crown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PremiumUpgradeAdProps {
  onUpgrade?: () => void;
  variant?: 'compact' | 'full';
}

export default function PremiumUpgradeAd({ onUpgrade, variant = 'compact' }: PremiumUpgradeAdProps) {
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
      toast.success('🎉 Bem-vindo ao Premium!', {
        description: 'Agora você tem acesso a todos os benefícios exclusivos',
        duration: 5000,
      });
    }
  };

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-3 border border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Crown className="w-5 h-5 text-gray-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 mb-1">Remova os anúncios</p>
            <p className="text-xs text-gray-700">
              Assine o Premium e tenha uma experiência sem publicidade
            </p>
          </div>
          <Button 
            size="sm" 
            className="bg-gray-900 hover:bg-gray-800 text-white h-8 text-xs flex-shrink-0"
            onClick={handleUpgrade}
          >
            Assinar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Crown className="w-7 h-7 text-orange-500" />
          </div>
        </div>
        
        <h3 className="text-white mb-2">Experiência sem anúncios</h3>
        <p className="text-amber-100 text-sm mb-4">
          Assine o Premium e aproveite o app sem interrupções, além de descontos exclusivos e benefícios especiais
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-white">
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">✓</div>
            <span>Sem anúncios</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white">
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">✓</div>
            <span>Até 40% de desconto</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white">
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">✓</div>
            <span>Recompensas mais rápidas</span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-white text-orange-600 hover:bg-gray-100"
          onClick={handleUpgrade}
        >
          Assinar por R$ 19,90/mês
        </Button>
      </div>
    </div>
  );
}