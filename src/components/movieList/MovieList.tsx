"use client";
import { MovieList as MovieListData, MovieList, MovieListItem, SearchMovie } from "@/generated/graphql";
import MovieSearchBar from "../movieSearchBar/MovieSearchBar";
import { sdk } from "@/lib/client";
import { useState } from "react";

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

  return <div>
    <MovieSearchBar onAdd={onAdd}/>
    {
      movies.map((item) => {
        return <div>
          {item.movie.Title}
        </div>
      })
    }
  </div>;
}

