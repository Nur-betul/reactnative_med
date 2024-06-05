import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getSelectedAnimePictures = async (id: number | string) => {
  const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${id}/pictures`;
  const response = await axios.get(selectedAnimeURL);
  return response.data;
};

export const UseGetSelectedAnimePictures = (id: number | string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['selectedAnimePics', id],
    queryFn: () => getSelectedAnimePictures(id),
    refetchOnReconnect: 'always',
  });

  return { data, isLoading, error };
};

const AnimePicturesComponent = ({ id }: { id: number }) => {
  const { data, isLoading, error } = UseGetSelectedAnimePictures(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.pictures.map((picture: { large: string }, index: number) => (
        <img key={index} src={picture.large} alt={`Anime picture ${index}`} />
      ))}
    </div>
  );
};

export default AnimePicturesComponent;
