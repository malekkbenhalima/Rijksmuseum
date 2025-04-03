import axios from 'axios';

const API_KEY = process.env.VUE_APP_RIJKSMUSEUM_API_KEY;
const BASE_URL = 'https://www.rijksmuseum.nl/api/en/collection';

export async function fetchArtworks({ page = 1, limit = 20, query = '' }) {
  const queryParams = {
    key: API_KEY,
    p: page,
    ps: limit,
    imgonly: true,
    s: 'relevance',
    format: 'json',
    culture: 'en'
  };
  
  // Only add the q parameter if we have a search query
  if (query && query.trim() !== '') {
    queryParams.q = query;
  }
  
  try {
    const response = await axios.get(BASE_URL, {
      params: queryParams
    });
    
    return {
      artworks: response.data.artObjects || [],
      count: response.data.count || 0
    };
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
}

export function filterArtworksByQuery(artworks, query) {
  if (!query || query.trim() === '') {
    return artworks;
  }
  
  const searchTerms = query.toLowerCase().split(' ');
  return artworks.filter(artwork => {
    const title = artwork.title.toLowerCase();
    // Check if all search terms are in the title
    return searchTerms.every(term => title.includes(term));
  });
}

export default {
  fetchArtworks,
  filterArtworksByQuery
}; 