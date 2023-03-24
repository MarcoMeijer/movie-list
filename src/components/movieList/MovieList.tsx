"use client";
import { MovieList as MovieListData, MovieList, MovieListItem, SearchMovie } from "@/generated/graphql";
import MovieSearchBar from "../movieSearchBar/MovieSearchBar";
import { sdk } from "@/lib/client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../button/Button";

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
    {
      movies.map((item) => (
        <div key={item.id}>
          <Link href={`/movie/${item.imdb_id}`}>
            {item.movie.Title}
          </Link>
          <Button title="remove" onClick={() => removeMovie(item.id)}/>
        </div>
      ))
    }
  </div>;
}

