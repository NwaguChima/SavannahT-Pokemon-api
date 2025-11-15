import {
  formatPokemonName,
  getPokemonSprite,
  getTypeColor,
  formatHeight,
  formatWeight,
} from '@shared/utils/pokemon-helpers';
import { type Pokemon } from '@/types';
import Loader from '@/shared/components/loader/Loader';
import Button from '@/shared/components/button/Button';
import styles from './PokemonDetails.module.scss';
import { usePokemonDetail } from '../../hooks';
import Modal from '@/shared/components/modal/Modal';

interface PokemonDetailProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: Pokemon) => void;
  onClose: () => void;
  isOpen: boolean;
}

const PokemonDetail = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClose,
  isOpen,
}: PokemonDetailProps) => {
  const sprite = getPokemonSprite(pokemon);
  const { evolutions, isLoading: isLoadingEvolution } = usePokemonDetail(
    pokemon.id
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className={styles.detail}>
        <div className={styles.detail__header}>
          <div className={styles.detail__image}>
            {sprite && <img src={sprite} alt={pokemon.name} />}
          </div>
          <div className={styles.detail__info}>
            <span className={styles.detail__id}>
              #{String(pokemon.id).padStart(3, '0')}
            </span>
            <h2 className={styles.detail__name}>
              {formatPokemonName(pokemon.name)}
            </h2>
            <div className={styles.detail__types}>
              {pokemon.types.map((type) => (
                <span
                  key={type.slot}
                  className={styles.detail__type}
                  style={{ backgroundColor: getTypeColor(type.type.name) }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.detail__stats}>
          <div className={styles.detail__stat}>
            <span className={styles.detail__label}>Height</span>
            <span className={styles.detail__value}>
              {formatHeight(pokemon.height)}
            </span>
          </div>
          <div className={styles.detail__stat}>
            <span className={styles.detail__label}>Weight</span>
            <span className={styles.detail__value}>
              {formatWeight(pokemon.weight)}
            </span>
          </div>
        </div>

        <div className={styles.detail__section}>
          <h3 className={styles.detail__title}>Abilities</h3>
          <div className={styles.detail__abilities}>
            {pokemon.abilities.map((ability) => (
              <span key={ability.slot} className={styles.detail__ability}>
                {formatPokemonName(ability.ability.name)}
                {ability.is_hidden && ' (Hidden)'}
              </span>
            ))}
          </div>
        </div>

        {evolutions.length > 0 && (
          <div className={styles.detail__section}>
            <h3 className={styles.detail__title}>Evolution Chain</h3>
            {isLoadingEvolution ? (
              <Loader size="sm" />
            ) : (
              <div className={styles.detail__evolutions}>
                {evolutions.map((evo, index) => (
                  <span key={index} className={styles.detail__evolution}>
                    {formatPokemonName(evo)}
                    {index < evolutions.length - 1 && (
                      <span className={styles.detail__arrow}>→</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={styles.detail__actions}>
          <Button
            variant={isFavorite ? 'danger' : 'primary'}
            fullWidth
            onClick={() => onToggleFavorite(pokemon)}
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PokemonDetail;
