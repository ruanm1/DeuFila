import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import AdBanner from './AdBanner';
import { Badge } from './ui/badge';

interface ReviewsListProps {
  venueId: number;
  isPremium: boolean;
}

const reviewsData = [
  {
    id: 1,
    userName: 'Maria Santos',
    userInitials: 'MS',
    rating: 5,
    date: '2025-11-10',
    comment: 'Ambiente incrível! Cervejas artesanais de qualidade e atendimento excepcional. Super recomendo!',
    likes: 12,
    isPremiumUser: true,
  },
  {
    id: 2,
    userName: 'Pedro Oliveira',
    userInitials: 'PO',
    rating: 4,
    date: '2025-11-08',
    comment: 'Ótimo lugar para happy hour. Preços justos e boa variedade de petiscos.',
    likes: 8,
    isPremiumUser: false,
  },
  {
    id: 3,
    userName: 'Ana Costa',
    userInitials: 'AC',
    rating: 5,
    date: '2025-11-05',
    comment: 'Melhor bar da região! Música ao vivo às sextas é sensacional. Voltarei sempre!',
    likes: 15,
    isPremiumUser: true,
  },
  {
    id: 4,
    userName: 'Carlos Lima',
    userInitials: 'CL',
    rating: 4,
    date: '2025-11-03',
    comment: 'Bom atendimento e ambiente agradável. Apenas achei um pouco lotado no sábado.',
    likes: 5,
    isPremiumUser: false,
  },
];

export default function ReviewsList({ venueId, isPremium }: ReviewsListProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    // Aqui seria enviado para o backend
    setShowReviewForm(false);
    setRating(0);
    setComment('');
  };

  return (
    <div className="space-y-4">
      {/* Review Stats */}
      <div className="bg-white rounded-xl p-4 shadow-sm w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-900">4.5</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4.5 ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">Baseado em 128 avaliações</p>
          </div>
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            Avaliar
          </Button>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-8">{stars}★</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500"
                  style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-8">
                {stars === 5 ? 89 : stars === 4 ? 26 : stars === 3 ? 9 : stars === 2 ? 3 : 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-2">Sua avaliação</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <Textarea
              placeholder="Compartilhe sua experiência..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              onClick={handleSubmitReview}
            >
              Publicar
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowReviewForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Premium Benefits Notice */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 border border-amber-300">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⭐</div>
            <div>
              <p className="text-gray-900 mb-1">Membros Premium ganham mais</p>
              <p className="text-sm text-gray-700">
                Suas avaliações aparecem em destaque e você ganha pontos extras no programa de fidelidade!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviewsData.map((review, index) => (
          <>
            <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback className={review.isPremiumUser ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900' : 'bg-gray-200'}>
                    {review.userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{review.userName}</span>
                      {review.isPremiumUser && (
                        <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 border-none text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Ad after 2nd review for non-premium users */}
            {!isPremium && index === 1 && (
              <AdBanner type="inline" />
            )}
          </>
        ))}
      </div>
    </div>
  );
}