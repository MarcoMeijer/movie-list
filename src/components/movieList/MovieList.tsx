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
import { modals } from "@/modals/ModalsWrapper";
import { EMAIL } from "@/constants/email";
import EntranceAnimation from "../animation/EntranceAnimation";

interface MovieListProps {
  list: MovieListData;
  items: MovieListItem[];
}

export default function MovieListView({ list, items }: MovieListProps) {
  const [movies, setMovies] = useState(items);
  const { setModal } = modals.useModal();

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
      <h1>{list.name}</h1>
      <MovieSearchBar onAdd={onAdd} />
      <div className={styles.movieList}>
        {movies.length === 0 && (
          <p>This list is empty. Search for a movie to add it to this list.</p>
        )}
        {movies.map((item, i) => (
          <EntranceAnimation key={item.id} delay={0.1 * i}>
            <MovieItem movie={item}>
              <KebabMenuButton
                title="Remove"
                onClick={() => removeMovie(item.id)}
              />
              <KebabMenuButton
                title="Add to list"
                onClick={async () => {
                  const { getMovieLists } = await sdk.GetMovieLists({
                    email: EMAIL,
                  });
                  setModal("addToList", {
                    imdbId: item.imdb_id,
                    options: getMovieLists,
                  });
                }}
              />
            </MovieItem>
          </EntranceAnimation>
        ))}
      </div>
    </div>
  );
}
