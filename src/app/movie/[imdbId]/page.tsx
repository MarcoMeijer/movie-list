import StarIcon from "@/components/icons/StarIcon";
import Rating from "@/components/rating/Rating";
import { sdk } from "@/lib/client";
import Image from "next/image";
import styles from "./page.module.css";

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

  return (
    <div className={styles.movieInfo}>
      <div className={styles.topBar}>
        <div className={styles.titleDiv}>
          <h1 className={styles.title}>{movie.Title}</h1>
          <div className={styles.underTitle}>
            <p>{movie.Year}</p>
            <p>{movie.Rated}</p>
            <p>{movie.Runtime}</p>
          </div>
        </div>
        {movie.imdbRating && movie.imdbVotes && (
          <Rating
            name={"IMDb rating"}
            rating={`${movie.imdbRating}/10`}
            voters={movie.imdbVotes}
          />
        )}
        {movie.Ratings?.map((rating, i) => {
          const source = rating?.Source;
          const value = rating?.Value;
          if (!source || !value || source === "Internet Movie Database") {
            return;
          }

          return <Rating key={i} name={source} rating={value} />;
        })}
      </div>
      <div className={styles.content}>
        <Image src={movie.Poster || ""} width={260} height={386} alt={""} />
        <div className={styles.description}>
          <p>{movie.Plot}</p>
          <div className={styles.section}>
            <h1>Director</h1>
            <p>{movie.Director}</p>
          </div>
          <div className={styles.section}>
            <h1>Actors</h1>
            {movie.Actors?.split(", ").map((actor, i) => (
              <p key={i}>{actor}</p>
            ))}
          </div>
          <div className={styles.section}>
            <h1>Genre</h1>
            {movie.Genre?.split(", ").map((genre, i) => (
              <p key={i}>{genre}</p>
            ))}
          </div>
          <div className={styles.section}>
            <h1>Awards</h1>
            {movie.Awards}
          </div>
        </div>
      </div>
    </div>
  );
}
