"use client";
import {
  MovieList as MovieListData,
  MovieListItem,
  SearchMovie,
} from "@/generated/graphql";
import MovieSearchBar from "../movieSearchBar/MovieSearchBar";
import { sdk } from "@/lib/client";
import { useState } from "react";
import styles from "./MovieList.module.css";
import KebabMenuButton from "../kebabMenu/KebabMenuButton";
import MovieItem from "../movieItem/MovieItem";

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
    setMovies([...movies, addMovie]);
  };

  const removeMovie = async (movieId: number) => {
    await sdk.RemoveMovie({ movieId, listId: list.id });
    setMovies(movies.filter(({ id }) => id !== movieId));
  };

  return (
    <div className={styles.movieListView}>
      <MovieSearchBar onAdd={onAdd} />
      <div className={styles.movieList}>
        {movies.map((item) => (
          <MovieItem movie={item} key={item.id}>
            <KebabMenuButton
              title="remove"
              onClick={() => removeMovie(item.id)}
            />
          </MovieItem>
        ))}
      </div>
    </div>
  );
}
