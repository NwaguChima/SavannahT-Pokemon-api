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
import { StarIcon } from '@/assets/icons';

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
        {/* Header Section with Gradient Background */}
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

            {/* Pokemon Image */}
            <div className={styles.detail__imageWrapper}>
              <div className={styles.detail__image}>
                {sprite && <img src={sprite} alt={pokemon.name} />}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.detail__content}>
          {/* Stats Cards */}
          <div className={styles.detail__stats}>
            <div className={styles.detail__stat}>
              <div className={styles.detail__statHeader}>
                <svg
                  className={styles.detail__statIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                <span className={styles.detail__label}>Height</span>
              </div>
              <span className={styles.detail__value}>
                {formatHeight(pokemon.height)}
              </span>
            </div>

            <div className={styles.detail__stat}>
              <div className={styles.detail__statHeader}>
                <svg
                  className={styles.detail__statIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
                <span className={styles.detail__label}>Weight</span>
              </div>
              <span className={styles.detail__value}>
                {formatWeight(pokemon.weight)}
              </span>
            </div>
          </div>

          {/* Abilities Section */}
          <div className={styles.detail__section}>
            <h3 className={styles.detail__title}>
              <svg
                className={styles.detail__titleIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
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

          {/* Evolution Chain */}
          {isLoadingEvolution ? (
            <Loader size="sm" variant="pulse" />
          ) : (
            evolutions.length > 0 && (
              <div className={styles.detail__section}>
                <h3 className={styles.detail__title}>
                  <svg
                    className={styles.detail__titleIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Evolution Chain
                </h3>
                <div className={styles.detail__evolutionsWrapper}>
                  <div className={styles.detail__evolutions}>
                    {evolutions.map((evo, index) => (
                      <React.Fragment key={index}>
                        <div className={styles.detail__evolution}>
                          <div className={styles.detail__evolutionCircle}>
                            {isLoadingSprites ? (
                              <div
                                className={styles.detail__evolutionPlaceholder}
                              >
                                ...
                              </div>
                            ) : evolutionSprites[evo] ? (
                              <img src={evolutionSprites[evo]} alt={evo} />
                            ) : (
                              <div
                                className={styles.detail__evolutionPlaceholder}
                              >
                                ?
                              </div>
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
            )
          )}

          {/* Add to Favorites Button */}
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
      </div>
    </Modal>
  );
};

export default PokemonDetail;
