import {
  formatPokemonName,
  getPokemonSprite,
  getTypeColor,
} from '@shared/utils/pokemon-helpers';
import styles from './PokemonCard.module.scss';
import type { Pokemon } from '@/types';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: Pokemon) => void;
  onClick: (pokemon: Pokemon) => void;
}

const PokemonCard = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClick,
}: PokemonCardProps) => {
  const sprite = getPokemonSprite(pokemon);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(pokemon);
  };

  return (
    <div className={styles.card} onClick={() => onClick(pokemon)}>
      {isFavorite && (
        <div className={styles.card__badge}>
          <span>⭐</span>
        </div>
      )}

      <button
        className={styles.card__favorite}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div className={styles.card__image}>
        {sprite ? (
          <img src={sprite} alt={pokemon.name} loading="lazy" />
        ) : (
          <div className={styles.card__placeholder}>?</div>
        )}
      </div>

      <div className={styles.card__content}>
        <span className={styles.card__id}>
          #{String(pokemon.id).padStart(3, '0')}
        </span>
        <h3 className={styles.card__name}>{formatPokemonName(pokemon.name)}</h3>

        <div className={styles.card__types}>
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className={styles['card__type-badge']}
              style={{ backgroundColor: getTypeColor(type.type.name) }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
