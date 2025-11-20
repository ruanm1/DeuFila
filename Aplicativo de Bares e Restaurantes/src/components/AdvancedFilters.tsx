import { useState } from 'react';
import { Filter, X, DollarSign, Clock, Coffee, Utensils, Beer as BeerIcon, Wine } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';

interface AdvancedFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  venueTypes: string[];
  priceRange: number[];
  openNow: boolean;
  hasPromotion: boolean;
  hasLoyaltyProgram: boolean;
}

const venueTypes = [
  { id: 'bar', label: 'Bar', icon: BeerIcon },
  { id: 'restaurante', label: 'Restaurante', icon: Utensils },
  { id: 'cervejaria', label: 'Cervejaria', icon: BeerIcon },
  { id: 'pub', label: 'Pub', icon: Wine },
  { id: 'choperia', label: 'Choperia', icon: Coffee },
  { id: 'cafe', label: 'Café', icon: Coffee },
];

export default function AdvancedFilters({ onApplyFilters }: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([1, 4]);
  const [openNow, setOpenNow] = useState(false);
  const [hasPromotion, setHasPromotion] = useState(false);
  const [hasLoyaltyProgram, setHasLoyaltyProgram] = useState(false);

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      venueTypes: selectedTypes,
      priceRange,
      openNow,
      hasPromotion,
      hasLoyaltyProgram,
    });
    setOpen(false);
  };

  const handleClear = () => {
    setSelectedTypes([]);
    setPriceRange([1, 4]);
    setOpenNow(false);
    setHasPromotion(false);
    setHasLoyaltyProgram(false);
  };

  const activeFiltersCount = 
    selectedTypes.length + 
    (openNow ? 1 : 0) + 
    (hasPromotion ? 1 : 0) + 
    (hasLoyaltyProgram ? 1 : 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="w-4 h-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white border-none w-5 h-5 p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filtros Avançados</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Tipo de estabelecimento */}
          <div>
            <h3 className="text-gray-900 mb-3">Tipo de estabelecimento</h3>
            <div className="grid grid-cols-2 gap-2">
              {venueTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedTypes.includes(type.id);
                return (
                  <button
                    key={type.id}
                    onClick={() => toggleType(type.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-500' : 'text-gray-600'}`} />
                    <span className={`text-sm ${isSelected ? 'text-orange-500' : 'text-gray-700'}`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Faixa de preço */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900">Faixa de preço</h3>
              <div className="flex gap-1">
                {Array.from({ length: priceRange[1] }).map((_, i) => (
                  <DollarSign
                    key={i}
                    className={`w-4 h-4 ${
                      i + 1 >= priceRange[0] ? 'text-orange-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={1}
              max={4}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Econômico</span>
              <span>Luxo</span>
            </div>
          </div>

          {/* Horário */}
          <div>
            <h3 className="text-gray-900 mb-3">Horário</h3>
            <button
              onClick={() => setOpenNow(!openNow)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                openNow
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Clock className={`w-5 h-5 ${openNow ? 'text-orange-500' : 'text-gray-600'}`} />
              <div className="flex-1 text-left">
                <p className={`text-sm ${openNow ? 'text-orange-500' : 'text-gray-700'}`}>
                  Aberto agora
                </p>
                <p className="text-xs text-gray-500">Mostrar apenas locais abertos</p>
              </div>
            </button>
          </div>

          {/* Benefícios */}
          <div>
            <h3 className="text-gray-900 mb-3">Benefícios</h3>
            <div className="space-y-2">
              <button
                onClick={() => setHasPromotion(!hasPromotion)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  hasPromotion
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-2xl">🎉</div>
                <div className="flex-1 text-left">
                  <p className={`text-sm ${hasPromotion ? 'text-orange-500' : 'text-gray-700'}`}>
                    Com promoções
                  </p>
                  <p className="text-xs text-gray-500">Happy hour e ofertas especiais</p>
                </div>
              </button>

              <button
                onClick={() => setHasLoyaltyProgram(!hasLoyaltyProgram)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  hasLoyaltyProgram
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-2xl">🎁</div>
                <div className="flex-1 text-left">
                  <p className={`text-sm ${hasLoyaltyProgram ? 'text-orange-500' : 'text-gray-700'}`}>
                    Programa de fidelidade
                  </p>
                  <p className="text-xs text-gray-500">Acumule visitas e ganhe prêmios</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t pt-4 pb-6 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleClear}
          >
            Limpar
          </Button>
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={handleApply}
          >
            Aplicar filtros
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}