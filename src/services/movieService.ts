import axios from "axios";
import type { Movie } from "../types/movie";

const VITE_TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmE0ODc4YWExNmI3OWVlNGY3Y2VmNGNkNmExMmU1ZiIsIm5iZiI6MTc1OTA1NDkzNC4zNTIsInN1YiI6IjY4ZDkwYzU2Y2JjYzRjNWFiYTM4YmI3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DfHYjfcAJyK5wEPG5sCVO6eKHYIxrVxZAS3wA2-qKg4";

type ResponseData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<ResponseData>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("fetchMovies error:", error);
    throw new Error("Failed to fetch movies");
  }
}

export default fetchMovies;
