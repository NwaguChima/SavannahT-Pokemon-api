import React from 'react';
import Loader from '@/shared/components/loader/Loader';
import Modal from '@/shared/components/modal/Modal';
import {
  formatPokemonName,
  getPokemonSprite,
  getTypeColor,
  formatHeight,
  formatWeight,
} from '@shared/utils/pokemon-helpers';
import Button from '@/shared/components/button/Button';
import styles from './PokemonDetails.module.scss';
import { useEvolutionSprites, usePokemonDetail } from '../../hooks';
import { type Pokemon } from '@/types';
import {
  AbilitiesIcon,
  EvolutionIcon,
  HeightIcon,
  StarIcon,
  WeightIcon,
} from '@/assets/icons';

interface PokemonDetailProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: Pokemon) => void;
  onClose: () => void;
  isOpen: boolean;
  isDisabled?: boolean;
}

const PokemonDetail = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClose,
  isOpen,
  isDisabled = false,
}: PokemonDetailProps) => {
  const sprite = getPokemonSprite(pokemon);
  const { evolutions, isLoading: isLoadingEvolution } = usePokemonDetail(
    pokemon.id
  );
  const { evolutionSprites, isLoading: isLoadingSprites } =
    useEvolutionSprites(evolutions);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className={styles.detail}>
        <HeaderSection pokemon={pokemon} sprite={sprite} />
        <ContentSection
          pokemon={pokemon}
          evolutions={evolutions}
          evolutionSprites={evolutionSprites}
          isLoadingEvolution={isLoadingEvolution}
          isLoadingSprites={isLoadingSprites}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          isDisabled={isDisabled}
        />
      </div>
    </Modal>
  );
};

export default PokemonDetail;

/* --- All kept here because this is the closet point of used and not ever used in another file --- */
const HeaderSection = ({
  pokemon,
  sprite,
}: {
  pokemon: Pokemon;
  sprite: string | null;
}) => (
  <div className={styles.detail__header}>
    <div className={styles.detail__headerContent}>
      <div className={styles.detail__headerInfo}>
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

      <div className={styles.detail__imageWrapper}>
        <div className={styles.detail__image}>
          {sprite && <img src={sprite} alt={pokemon.name} />}
        </div>
      </div>
    </div>
  </div>
);

const ContentSection = ({
  pokemon,
  evolutions,
  evolutionSprites,
  isLoadingEvolution,
  isLoadingSprites,
  isFavorite,
  onToggleFavorite,
  isDisabled,
}: {
  pokemon: Pokemon;
  evolutions: string[];
  evolutionSprites: Record<string, string>;
  isLoadingEvolution: boolean;
  isLoadingSprites: boolean;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: Pokemon) => void;
  isDisabled: boolean;
}) => (
  <div className={styles.detail__content}>
    <StatsSection pokemon={pokemon} />
    <AbilitiesSection pokemon={pokemon} />
    <EvolutionChain
      evolutions={evolutions}
      evolutionSprites={evolutionSprites}
      isLoadingEvolution={isLoadingEvolution}
      isLoadingSprites={isLoadingSprites}
    />
    <div className={styles.detail__actions}>
      <Button
        variant={isFavorite ? 'danger' : 'primary'}
        fullWidth
        onClick={() => onToggleFavorite(pokemon)}
        disabled={isDisabled}
        className={styles.detail__favoriteButton}
      >
        <StarIcon
          fill={isFavorite ? '#ffdc64' : 'transparent'}
          height="20"
          width="20"
        />
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </div>
  </div>
);

const StatsSection = ({ pokemon }: { pokemon: Pokemon }) => (
  <div className={styles.detail__stats}>
    <div className={styles.detail__stat}>
      <div className={styles.detail__statHeader}>
        <HeightIcon className={styles.detail__statIcon} />
        <span className={styles.detail__label}>Height</span>
      </div>
      <span className={styles.detail__value}>
        {formatHeight(pokemon.height)}
      </span>
    </div>

    <div className={styles.detail__stat}>
      <div className={styles.detail__statHeader}>
        <WeightIcon className={styles.detail__statIcon} />
        <span className={styles.detail__label}>Weight</span>
      </div>
      <span className={styles.detail__value}>
        {formatWeight(pokemon.weight)}
      </span>
    </div>
  </div>
);

const AbilitiesSection = ({ pokemon }: { pokemon: Pokemon }) => (
  <div className={styles.detail__section}>
    <h3 className={styles.detail__title}>
      <AbilitiesIcon className={styles.detail__titleIcon} />
      Abilities
    </h3>
    <div className={styles.detail__abilities}>
      {pokemon.abilities.map((ability) => (
        <span key={ability.slot} className={styles.detail__ability}>
          {formatPokemonName(ability.ability.name)}
          {ability.is_hidden && (
            <span className={styles.detail__hiddenBadge}>(Hidden)</span>
          )}
        </span>
      ))}
    </div>
  </div>
);

const EvolutionChain = ({
  evolutions,
  evolutionSprites,
  isLoadingEvolution,
  isLoadingSprites,
}: {
  evolutions: string[];
  evolutionSprites: Record<string, string>;
  isLoadingEvolution: boolean;
  isLoadingSprites: boolean;
}) => {
  if (isLoadingEvolution) return <Loader size="sm" variant="pulse" />;

  if (!evolutions.length) return null;

  return (
    <div className={styles.detail__section}>
      <h3 className={styles.detail__title}>
        <EvolutionIcon className={styles.detail__titleIcon} />
        Evolution Chain
      </h3>
      <div className={styles.detail__evolutionsWrapper}>
        <div className={styles.detail__evolutions}>
          {evolutions.map((evo, index) => (
            <React.Fragment key={index}>
              <div className={styles.detail__evolution}>
                <div className={styles.detail__evolutionCircle}>
                  {isLoadingSprites ? (
                    <div className={styles.detail__evolutionPlaceholder}>
                      ...
                    </div>
                  ) : evolutionSprites[evo] ? (
                    <img src={evolutionSprites[evo]} alt={evo} />
                  ) : (
                    <div className={styles.detail__evolutionPlaceholder}>?</div>
                  )}
                </div>
                <p className={styles.detail__evolutionName}>
                  {formatPokemonName(evo)}
                </p>
              </div>
              {index < evolutions.length - 1 && (
                <div className={styles.detail__arrow}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
