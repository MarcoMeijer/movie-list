import { MovieListItem } from "@/generated/graphql";
import styles from "./MovieItem.module.css";
import KebabMenu from "../kebabMenu/KebabMenu";
import Link from "next/link";
import Image from "next/image";
import StarIcon from "../icons/StarIcon";

export interface MovieItemProps {
  movie: MovieListItem,
  children: React.ReactNode,
}

export default function MovieItem({ movie, children }: MovieItemProps): JSX.Element {
  const poster = movie.movie.Poster;
  return <div key={movie.id} className={styles.movieItem}>
    {
      poster && poster !== "N/A" &&
      <Link href={`/movie/${movie.imdb_id}`} className={styles.poster}>
        <Image src={movie.movie.Poster!!} width={182} height={268} alt="poster"/>
      </Link>
    }
    <div className={styles.body}>
      <div className={styles.rating}>
        <StarIcon fill="#fbd341" width={20} height={20}/>
        <p>{movie.movie.imdbRating}</p>
      </div>
      <Link href={`/movie/${movie.imdb_id}`} className={styles.title}>
        {movie.movie.Title}
      </Link>
      <div className={styles.flex}/>
      <div className={styles.buttons}>
        <KebabMenu>
          {children}
        </KebabMenu>
      </div>
    </div>
  </div>;
}
