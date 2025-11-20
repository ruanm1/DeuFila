import { Ticket, Copy, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface Coupon {
  id: number;
  venueName: string;
  discount: string;
  description: string;
  validUntil: string;
  code: string;
  premiumOnly?: boolean;
}

interface CouponCardProps {
  coupon: Coupon;
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    toast.success('Código copiado!');
  };

  return (
    <div className={`${coupon.premiumOnly ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-gradient-to-r from-orange-500 to-red-500'} rounded-2xl p-[2px] shadow-md w-full`}>
      <div className="bg-white rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${coupon.premiumOnly ? 'bg-gradient-to-br from-amber-100 to-yellow-100' : 'bg-gradient-to-br from-orange-100 to-red-100'} rounded-xl flex items-center justify-center`}>
            {coupon.premiumOnly ? (
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            ) : (
              <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-2 mb-1">
              <h3 className="text-gray-900 truncate">{coupon.venueName}</h3>
              <div className={`${coupon.premiumOnly ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-gradient-to-r from-orange-500 to-red-500'} text-white px-3 py-1 rounded-lg flex-shrink-0 whitespace-nowrap`}>
                {coupon.discount}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{coupon.description}</p>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Válido até {new Date(coupon.validUntil).toLocaleDateString('pt-BR')}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={handleCopy}
              >
                <Copy className="w-3 h-3" />
                {coupon.code}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}