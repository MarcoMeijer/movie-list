import MovieDetails from "@/components/movieDetails/MovieDetails";
import { sdk } from "@/lib/client";

export interface MoviePageProps {
  params: { imdbId: string };
}

export default async function MoviePage({
  params: { imdbId },
}: MoviePageProps) {
  const { searchMovieById: movie } = await sdk.GetMovie({ imdbId: imdbId });

  if (movie === null || movie === undefined) {
    throw new Error("Unable to find movie.");
  }

  return <MovieDetails movie={movie} />;
}
