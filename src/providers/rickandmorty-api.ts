import {
  Character,
  Location,
  Episode,
  ApiResponse,
  ApiError,
  CharacterFilters,
  LocationFilters,
  EpisodeFilters,
} from '@/types';

const BASE_URL = 'https://rickandmortyapi.com/api';

class RickAndMortyApi {
  private async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('API fetch error:', error);
      }
      throw error;
    }
  }

  private buildQueryString(
    params: Record<string, string | number | undefined>
  ): string {
    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string | number>
    );

    const queryString = new URLSearchParams(
      Object.entries(filteredParams).reduce(
        (acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        },
        {} as Record<string, string>
      )
    ).toString();
    return queryString ? `?${queryString}` : '';
  }

  // CHARACTERS
  async getAllCharacters(
    filters: CharacterFilters = {}
  ): Promise<ApiResponse<Character>> {
    const queryString = this.buildQueryString(filters);
    const url = `${BASE_URL}/character${queryString}`;
    return this.fetchData<ApiResponse<Character>>(url);
  }

  async getCharacterById(id: number): Promise<Character> {
    const url = `${BASE_URL}/character/${id}`;
    return this.fetchData<Character>(url);
  }

  async getMultipleCharacters(ids: number[]): Promise<Character[]> {
    const url = `${BASE_URL}/character/${ids.join(',')}`;
    return this.fetchData<Character[]>(url);
  }

  // LOCATIONS
  async getAllLocations(
    filters: LocationFilters = {}
  ): Promise<ApiResponse<Location>> {
    const queryString = this.buildQueryString(filters);
    const url = `${BASE_URL}/location${queryString}`;
    return this.fetchData<ApiResponse<Location>>(url);
  }

  async getLocationById(id: number): Promise<Location> {
    const url = `${BASE_URL}/location/${id}`;
    return this.fetchData<Location>(url);
  }

  async getMultipleLocations(ids: number[]): Promise<Location[]> {
    const url = `${BASE_URL}/location/${ids.join(',')}`;
    return this.fetchData<Location[]>(url);
  }

  // EPISODES
  async getAllEpisodes(
    filters: EpisodeFilters = {}
  ): Promise<ApiResponse<Episode>> {
    const queryString = this.buildQueryString(filters);
    const url = `${BASE_URL}/episode${queryString}`;
    return this.fetchData<ApiResponse<Episode>>(url);
  }

  async getEpisodeById(id: number): Promise<Episode> {
    const url = `${BASE_URL}/episode/${id}`;
    return this.fetchData<Episode>(url);
  }

  async getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
    const url = `${BASE_URL}/episode/${ids.join(',')}`;
    return this.fetchData<Episode[]>(url);
  }

  // UTILITY METHODS
  async searchCharacters(
    query: string,
    page: number = 1
  ): Promise<ApiResponse<Character>> {
    return this.getAllCharacters({ name: query, page });
  }

  async searchLocations(
    query: string,
    page: number = 1
  ): Promise<ApiResponse<Location>> {
    return this.getAllLocations({ name: query, page });
  }

  async searchEpisodes(
    query: string,
    page: number = 1
  ): Promise<ApiResponse<Episode>> {
    return this.getAllEpisodes({ name: query, page });
  }

  // Método para obtener el ID desde una URL de la API
  static getIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
  }
}

export const rickAndMortyApi = new RickAndMortyApi();

export { RickAndMortyApi };

export default rickAndMortyApi;
