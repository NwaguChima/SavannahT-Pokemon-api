import axios, { AxiosInstance } from 'axios';
import {
  PokemonListResponse,
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
} from '../types';

class PokeApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://pokeapi.co/api/v2',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Fetch a list of Pokemon with pagination
   */
  async getPokemonList(
    limit: number = 150,
    offset: number = 0
  ): Promise<PokemonListResponse> {
    const response = await this.client.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  }

  /**
   * Fetch detailed information about a specific Pokemon by ID or name
   */
  async getPokemonDetails(idOrName: string | number): Promise<PokemonDetails> {
    const response = await this.client.get<PokemonDetails>(
      `/pokemon/${idOrName}`
    );
    return response.data;
  }

  /**
   * Fetch Pokemon species information
   */
  async getPokemonSpecies(idOrName: string | number): Promise<PokemonSpecies> {
    const response = await this.client.get<PokemonSpecies>(
      `/pokemon-species/${idOrName}`
    );
    return response.data;
  }

  /**
   * Fetch evolution chain by URL
   */
  async getEvolutionChain(url: string): Promise<EvolutionChain> {
    const response = await axios.get<EvolutionChain>(url);
    return response.data;
  }

  /**
   * Extract evolution chain data
   */
  extractEvolutions(chain: EvolutionChain): string[] {
    const evolutions: string[] = [];

    const traverse = (chainLink: any) => {
      evolutions.push(chainLink.species.name);
      if (chainLink.evolves_to && chainLink.evolves_to.length > 0) {
        chainLink.evolves_to.forEach((evolution: any) => traverse(evolution));
      }
    };

    traverse(chain.chain);
    return evolutions;
  }
}

export default new PokeApiClient();
