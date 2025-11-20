import { Gift, Check } from 'lucide-react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface LoyaltyCardProps {
  venueName: string;
  isPremium: boolean;
}

export default function LoyaltyCard({ venueName, isPremium }: LoyaltyCardProps) {
  // Simulando dados do cartão fidelidade
  const visits = isPremium ? 7 : 4;
  const requiredVisits = isPremium ? 8 : 10;
  const progress = (visits / requiredVisits) * 100;

  const rewards = [
    { visits: isPremium ? 8 : 10, reward: 'Cerveja grátis', unlocked: visits >= (isPremium ? 8 : 10) },
    { visits: isPremium ? 16 : 20, reward: 'Porção de petiscos', unlocked: false },
    { visits: isPremium ? 24 : 30, reward: '30% de desconto na conta', unlocked: false },
  ];

  const isComplete = visits >= requiredVisits;

  const handleClaimReward = () => {
    if (isComplete) {
      toast.success('🎁 Recompensa solicitada!', {
        description: `${rewards[0].reward} - Mostre esta notificação no ${venueName}`,
        duration: 7000,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Premium Badge */}
      {isPremium && (
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 border border-amber-300">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⭐</div>
            <div>
              <p className="text-gray-900 mb-1">Benefício Premium Ativo</p>
              <p className="text-sm text-gray-700">
                Você precisa de apenas {requiredVisits} visitas ao invés de 10 para ganhar recompensas!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loyalty Card */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 sm:p-6 text-white shadow-lg w-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-amber-100 text-sm mb-1">Cartão Fidelidade</p>
            <h3 className="text-white truncate">{venueName}</h3>
          </div>
          <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-amber-200 flex-shrink-0 ml-2" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Progresso</span>
            <span className="text-sm">{visits}/{requiredVisits} visitas</span>
          </div>
          <Progress value={progress} className="h-2 bg-red-700" />
        </div>

        <p className="text-amber-100 text-sm">
          {requiredVisits - visits === 0 
            ? '🎉 Você ganhou uma recompensa!' 
            : `Faltam ${requiredVisits - visits} visitas para sua próxima recompensa!`}
        </p>
      </div>

      {/* Stamps Grid */}
      <div className="bg-white rounded-xl p-4 shadow-sm w-full">
        <p className="text-gray-900 mb-3">Carimbos de visita</p>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {Array.from({ length: requiredVisits }).map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg flex items-center justify-center border-2 ${
                index < visits
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 border-orange-500'
                  : 'bg-gray-100 border-gray-300 border-dashed'
              }`}
            >
              {index < visits ? (
                <Check className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              ) : (
                <span className="text-gray-400 text-xs sm:text-sm">{index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-gray-900 mb-3">Recompensas disponíveis</p>
        <div className="space-y-3">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                reward.unlocked
                  ? 'bg-green-50 border-green-500'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  reward.unlocked ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {reward.unlocked ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white text-sm">{reward.visits}</span>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    reward.unlocked ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {reward.reward}
                </p>
                <p className="text-xs text-gray-500">
                  {reward.unlocked ? 'Disponível!' : `${reward.visits} visitas necessárias`}
                </p>
              </div>
              {reward.unlocked && (
                <Gift className="w-5 h-5 text-green-600" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <p className="text-gray-900 mb-2">Como funciona?</p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            <span>Visite o estabelecimento e peça para carimbar seu cartão</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            <span>Complete {requiredVisits} carimbos para ganhar sua recompensa</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            <span>Membros Premium precisam de menos visitas!</span>
          </li>
        </ul>
      </div>

      {/* Collect Stamp Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleClaimReward}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white"
        >
          Coletar Recompensa
        </Button>
      </div>
    </div>
  );
}