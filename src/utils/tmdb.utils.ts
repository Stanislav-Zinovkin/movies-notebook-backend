import axios from "axios";

const TMDB_API = process.env.TMDB_API;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export type TMDBMovie = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
};

export async function fethcMovies(page: number = 1): Promise<TMDBMovie[]> {
    const response = await axios.get(`${TMDB_API}/discover/movie`, {
        headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
        params: {
            include_adult: false,
            language: "en-US",
            page,
            sort_by: "popularity.desc",

        },
    });
    return response.data.results;
}
