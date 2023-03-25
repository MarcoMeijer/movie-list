"use client";
import { MovieList } from "@/generated/graphql";
import Input from "../input/input";
import { useState } from "react";
import { Button } from "../button/Button";
import { sdk } from "@/lib/client";
import { EMAIL } from "@/constants/email";
import Link from "next/link";
import { modals } from "@/modals/ModalsWrapper";

export interface MovieListsProps {
  lists: MovieList[];
}

export default function MovieLists({ lists }: MovieListsProps) {
  const [movies, setMovies] = useState(lists);
  const [movieName, setMovieName] = useState("");
  const { setModal } = modals.useModal();

  const createList = async () => {
    setModal("createList", undefined);
    // const { createList } = await sdk.CreateList({
    //   createListInput: {
    //     email: EMAIL,
    //     name: movieName,
    //   },
    // });

    // setMovies([...movies, createList]);
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
      <Button title="Create list" onClick={createList} />
    </div>
  );
}
