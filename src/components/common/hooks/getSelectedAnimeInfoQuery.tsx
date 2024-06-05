import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getSelectedAnimeInfo = async (id: number | string) => {
  const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${id}/full`;

  const response = await axios.get(selectedAnimeURL);
  return response.data;
};

export const UseGetSelectedAnimeInfo = (id: number | string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['selectedAnime', id],
    queryFn: () => getSelectedAnimeInfo(id),
    refetchOnReconnect: 'always',
  });

  return { data, isLoading, error };
};

const AnimeInfoComponent = ({ id }: { id: number }) => {
  const { data, isLoading, error } = UseGetSelectedAnimeInfo(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.synopsis}</p>
      {/* Render other anime details as needed */}
    </div>
  );
};

export default AnimeInfoComponent;
