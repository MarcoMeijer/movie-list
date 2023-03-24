"use client";
import { MovieList as MovieListData, MovieList, MovieListItem, SearchMovie } from "@/generated/graphql";
import MovieSearchBar from "../movieSearchBar/MovieSearchBar";
import { sdk } from "@/lib/client";
import { useState } from "react";
import Link from "next/link";
import KebabMenu from "../kebabMenu/KebabMenu";
import styles from "./MovieList.module.css"
import KebabMenuButton from "../kebabMenu/KebabMenuButton";

interface MovieListProps {
  list: MovieListData;
  items: MovieListItem[];
}

export default function MovieListView({ list, items }: MovieListProps) {
  const [movies, setMovies] = useState(items);

  const onAdd = async (movie: SearchMovie) => {
    const { addMovie } = await sdk.AddMovie({
      imdbId: movie.imdbID!!,
      listId: list.id,
    });
    setMovies([
      ...movies,
      addMovie,
    ]);
  };

  const removeMovie = async (movieId: number) => {
    await sdk.RemoveMovie({ movieId, listId: list.id });
    setMovies(movies.filter(({ id }) => id !== movieId));
  };

  return <div>
    <MovieSearchBar onAdd={onAdd}/>
    <div className={styles.movieList}>
    {
      movies.map((item) => (
        <div key={item.id} className={styles.movie}>
          <Link href={`/movie/${item.imdb_id}`}>
            {item.movie.Title}
          </Link>
          <div className={styles.flex}/>
          <KebabMenu>
            <KebabMenuButton title="remove" onClick={() => removeMovie(item.id)}/>
          </KebabMenu>
        </div>
      ))
    }
    </div>
  </div>;
}

