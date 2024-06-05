import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const AllMedicineUrl = "https://api.jikan.moe/v4/anime";

interface Anime {
    mal_id: number;
    title: string;
    // Diğer gerekli alanları burada tanımlayabilirsiniz
}

interface AnimeResponse {
    data: Anime[];
    // Diğer gerekli alanları burada tanımlayabilirsiniz
}

const getAllMedicine = async (): Promise<AnimeResponse> => {
    const response = await axios.get(AllMedicineUrl);
    return response.data;
}

export const UseGetAllAnime = () => {
    const { isLoading, data, error } = useQuery<AnimeResponse>({
        queryKey: ['allAnime'],
        queryFn: getAllMedicine
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {data?.data.map(anime => (
                <div key={anime.mal_id}>
                    {anime.title}
                </div>
            ))}
        </div>
    );
};
