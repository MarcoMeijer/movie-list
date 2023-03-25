"use client";
import { MovieList } from "@/generated/graphql";
import Input from "../input/input";
import { useState } from "react";
import { Button } from "../button/Button";
import { sdk } from "@/lib/client";
import { EMAIL } from "@/constants/email";
import Link from "next/link";

export interface MovieListsProps {
  lists: MovieList[];
}

export default function MovieLists({ lists }: MovieListsProps) {
  const [movies, setMovies] = useState(lists);
  const [movieName, setMovieName] = useState("");

  const createList = async () => {
    const { createList } = await sdk.CreateList({
      createListInput: {
        email: EMAIL,
        name: movieName,
      },
    });

    setMovies([...movies, createList]);
  };

  return (
    <div>
      {movies.map(({ id, name }) => (
        <div key={id}>
          <Link key={id} href={`/my-lists/${id}`}>
            {name}
          </Link>
        </div>
      ))}
      <Input title="List name:" value={movieName} setValue={setMovieName} />
      <Button title="Create list" onClick={createList} />
    </div>
  );
}
