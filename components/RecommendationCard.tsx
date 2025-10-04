import React from 'react';
import { Recommendation } from '../types';
import { BookIcon, FilmIcon, RecipeIcon } from './Icons';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { type, title, description } = recommendation;
  
  const ICONS: { [key in Recommendation['type']]: React.ReactElement } = {
    book: <BookIcon className="w-8 h-8 text-white/90" />,
    movie: <FilmIcon className="w-8 h-8 text-white/90" />,
    recipe: <RecipeIcon className="w-8 h-8 text-white/90" />,
  };
  
  const IMAGE_URLS = {
      book: "https://picsum.photos/seed/book-cover/400/200",
      movie: "https://picsum.photos/seed/movie-scene/400/200",
      recipe: "https://picsum.photos/seed/delicious-food/400/200",
  }

  const typeTranslations: { [key in Recommendation['type']]: string } = {
    book: 'Libro',
    movie: 'Película',
    recipe: 'Receta',
  };

  const icon = ICONS[type] || null;
  const imageUrl = IMAGE_URLS[type];
  
  return (
    <div className="relative mt-4 overflow-hidden bg-gray-800/50 rounded-lg border border-gray-600 group transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20">
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center border-4 border-gray-800/80 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <img src={imageUrl} alt={title} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="p-4">
        <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider">{typeTranslations[type]}</h4>
        <p className="mt-1 text-xl font-bold text-white">{title}</p>
        <p className="mt-2 text-gray-400 text-base">{description}</p>
      </div>
    </div>
  );
};

export default RecommendationCard;