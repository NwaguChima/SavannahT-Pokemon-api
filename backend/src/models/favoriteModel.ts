import mongoose, { Schema } from 'mongoose';
import { IFavorite } from '../types';

const favoriteSchema: Schema = new Schema(
  {
    pokemonId: {
      type: Number,
      required: [true, 'Pokemon ID is required'],
      unique: true,
    },
    pokemonName: {
      type: String,
      required: [true, 'Pokemon name is required'],
      lowercase: true,
    },
    pokemonSprite: {
      type: String,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
favoriteSchema.index({ pokemonName: 1 });

const Favorite = mongoose.model<IFavorite>('Favorite', favoriteSchema);

export default Favorite;
