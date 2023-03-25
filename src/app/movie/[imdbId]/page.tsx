import { sdk } from "@/lib/client";
import Image from "next/image";

export interface MoviePageProps {
  params: { imdbId: string };
}

export default async function MoviePage({
  params: { imdbId },
}: MoviePageProps) {
  const { searchMovieById: movie } = await sdk.GetMovie({ imdbId: imdbId });

  if (movie === null || movie === undefined) {
    return <p>unable to find movie</p>;
  }

  return (
    <div>
      <Image width={400} height={600} src={movie.Poster!!} alt="movie poster" />
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
    </div>
  );
}
