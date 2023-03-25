import { useEffect, useState } from "react";
import styles from "./MovieSearchBar.module.css"
import { sdk } from "@/lib/client";
import { SearchMovie } from "@/generated/graphql";
import Image from "next/image";

function filterNull<T>(x: null | T): x is T {
  return x !== null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface MovieSearchBarProps {
  onAdd: (movie: SearchMovie) => void;
}

export default function MovieSearchBar({ onAdd }: MovieSearchBarProps): JSX.Element {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchMovie[]>([]);

  useEffect(() => {
    if (value === "") {
      setSearchResult([]);
      return;
    }

    let cancelled = false;

    const f = async () => {
      // wait a bit to make sure the user stopped typing
      await sleep(300);
      if (cancelled)
        return;

      const { searchMovieByTitle } = await sdk.SearchMovieByTitle({ title: value });

      if (cancelled)
        return;

      if (searchMovieByTitle !== null && searchMovieByTitle !== undefined) {
        const movies = searchMovieByTitle.filter(filterNull);
        setSearchResult(movies);
      } else {
        setSearchResult([]);
      }
    };
    f();

    return () => {
      cancelled = true;
    };
  }, [value]);

  return <div className={`${styles.searchBar} ${searchResult.length ? styles.open : "" }`}>
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
    {
      searchResult.map((movie) => (
        <div className={styles.searchItem} onClick={() => onAdd(movie)}>
          {
            movie.Poster && movie.Poster !== "N/A" &&
            <Image src={movie.Poster} width={32} height={48} alt={`poster ${movie.Title}`} style={{ marginRight: 10 }} />
          }
          <div className={styles.searchItemText}>
            <h1>{movie.Title}</h1>
            <p>{movie.Type} - {movie.Year}</p>
          </div>
        </div>
      ))
    }
  </div>;
}

