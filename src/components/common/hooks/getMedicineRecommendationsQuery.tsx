import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getAnimeRecommendations = async (id: number | string) => {
  const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${id}/recommendations`;
  const response = await axios.get(selectedAnimeURL);
  return response.data;
};

export const UseGetAnimeRecommendationsQuery = (id: number | string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['animeRecommendation', id],
    queryFn: () => getAnimeRecommendations(id),
    refetchOnReconnect: 'always',
  });

  return { data, isLoading, error };
};
