import { QrCode } from 'lucide-react';

interface QRCodeDisplayProps {
  userId: string;
  userName: string;
  isPremium: boolean;
}

export default function QRCodeDisplay({ userId, userName, isPremium }: QRCodeDisplayProps) {
  // Generate QR code URL using a free service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    JSON.stringify({ userId, userName, timestamp: Date.now() })
  )}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <QrCode className="w-5 h-5 text-orange-500" />
        <h3 className="text-gray-900 dark:text-white">Meu QR Code</h3>
      </div>
      
      <div className="text-center">
        <div className={`inline-block p-4 rounded-2xl ${
          isPremium 
            ? 'bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900' 
            : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          <img
            src={qrCodeUrl}
            alt="QR Code do usuário"
            className="w-48 h-48 mx-auto"
          />
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
          Mostre este QR Code no estabelecimento para registrar sua visita e acumular carimbos
        </p>
        
        {isPremium && (
          <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm">
            ⚡ Acúmulo 2x mais rápido para Premium
          </div>
        )}
      </div>
    </div>
  );
}
