"use client";
import { useEffect, useState } from "react";
import styles from "./MovieSearchBar.module.css"
import { sdk } from "@/lib/client";
import { SearchMovie } from "@/generated/graphql";

function filterNull<T>(x: null | T): x is T {
  return x !== null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function MovieSearchBar(): JSX.Element {
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
      searchResult.map((result) => (
        <div className={styles.searchItem}>
          <h1>{result.Title}</h1>
          <p>{result.Type} - {result.Year}</p>
        </div>
      ))
    }
  </div>;
}

