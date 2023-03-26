import { useEffect, useRef, useState } from "react";
import styles from "./MovieSearchBar.module.css";
import { sdk } from "@/lib/client";
import { SearchMovie } from "@/generated/graphql";
import Image from "next/image";
import { useClickOutside } from "@/hooks/useClickOutside";

function filterNull<T>(x: null | T): x is T {
  return x !== null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface MovieSearchBarProps {
  onAdd: (movie: SearchMovie) => void;
}

export default function MovieSearchBar({
  onAdd,
}: MovieSearchBarProps): JSX.Element {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchMovie[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (value === "") {
      setSearchResult([]);
      setOpen(false);
      return;
    }

    let cancelled = false;

    const f = async () => {
      // wait a bit to make sure the user stopped typing
      await sleep(300);
      if (cancelled) return;

      const { searchMovieByTitle } = await sdk.SearchMovieByTitle({
        title: value,
      });

      if (cancelled) return;

      if (searchMovieByTitle !== null && searchMovieByTitle !== undefined) {
        const movies = searchMovieByTitle.filter(filterNull);
        setSearchResult(movies);
        setOpen(true);
      } else {
        setSearchResult([]);
        setOpen(false);
      }
    };
    f();

    return () => {
      cancelled = true;
    };
  }, [value]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.searchBar} ${open ? styles.open : ""}`}
        ref={ref}
      >
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setOpen(true)}
        />
        {open &&
          searchResult.map((movie, i) => (
            <div
              className={styles.searchItem}
              onClick={() => onAdd(movie)}
              key={i}
            >
              {movie.Poster && movie.Poster !== "N/A" && (
                <Image
                  src={movie.Poster}
                  width={32}
                  height={48}
                  alt={`poster ${movie.Title}`}
                  style={{ marginRight: 10 }}
                />
              )}
              <div className={styles.searchItemText}>
                <h1>{movie.Title}</h1>
                <p>
                  {movie.Type} - {movie.Year}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
