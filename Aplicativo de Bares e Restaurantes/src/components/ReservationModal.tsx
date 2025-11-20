import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venueName: string;
  isPremium: boolean;
}

export default function ReservationModal({ 
  open, 
  onOpenChange, 
  venueName,
  isPremium 
}: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
    '23:00', '23:30', '00:00'
  ];

  const handleReserve = () => {
    if (step === 1 && date && time && guests) {
      setStep(2);
    } else if (step === 2 && name && phone && email) {
      // Simula envio da reserva
      toast.success('Reserva confirmada!', {
        description: `${venueName} - ${date?.toLocaleDateString('pt-BR')} às ${time}h para ${guests} pessoas`,
        duration: 5000,
      });
      onOpenChange(false);
      // Reset
      setStep(1);
      setDate(undefined);
      setTime('');
      setGuests('');
      setName('');
      setPhone('');
      setEmail('');
      setSpecialRequests('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fazer Reserva - {venueName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-orange-500' : 'bg-gray-200'}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  Selecione a data
                </Label>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              {/* Time Selection */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  Horário
                </Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Guests */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" />
                  Número de pessoas
                </Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'pessoa' : 'pessoas'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={!date || !time}
                onClick={() => setStep(2)}
              >
                Continuar
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Nome completo
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="João Silva"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="joao@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                />
              </div>

              {isPremium && (
                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 border border-amber-300">
                  <p className="text-sm text-gray-800">
                    ⭐ Como membro Premium, você ganha 15% de desconto nesta reserva!
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <p className="text-gray-900">Resumo da reserva:</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data:</span>
                    <span className="text-gray-900">{date?.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Horário:</span>
                    <span className="text-gray-900">{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pessoas:</span>
                    <span className="text-gray-900">{guests}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </Button>
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  disabled={!name || !email || !phone}
                  onClick={handleReserve}
                >
                  Confirmar Reserva
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}