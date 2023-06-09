"use client";
import { MovieList } from "@/generated/graphql";
import { useState } from "react";
import { Button } from "../button/Button";
import { sdk } from "@/lib/client";
import { EMAIL } from "@/constants/email";
import Link from "next/link";
import { modals } from "@/modals/ModalsWrapper";
import styles from "./MovieLists.module.css";
import KebabMenu from "../kebabMenu/KebabMenu";
import KebabMenuButton from "../kebabMenu/KebabMenuButton";
import EntranceAnimation from "../animation/EntranceAnimation";

export interface MovieListsProps {
  lists: MovieList[];
}

export default function MovieLists({ lists }: MovieListsProps) {
  const [movies, setMovies] = useState(lists);
  const { setModal } = modals.useModal();

  const createList = async () => {
    setModal("createList", {
      onCreate: async (movieName) => {
        const { createList } = await sdk.CreateList({
          createListInput: {
            email: EMAIL,
            name: movieName,
          },
        });

        setMovies([...movies, createList]);
      },
    });
  };

  const deleteList = async (listId: number) => {
    await sdk.DeleteList({ listId });
    setMovies(movies.filter((movie) => movie.id !== listId));
  };

  return (
    <div className={styles.lists}>
      <h1>Movie lists</h1>
      {movies.length === 0 && (
        <p>
          You don&apos;t have any movie lists. Press the button below to create
          one.
        </p>
      )}
      {movies.map(({ id, name }, i) => (
        <EntranceAnimation key={id} delay={0.1 * i}>
          <div className={styles.list}>
            <Link href={`/my-lists/${id}`} className={styles.link}>
              {name}
            </Link>
            <KebabMenu>
              <KebabMenuButton
                title={"Delete"}
                onClick={() => deleteList(id)}
              />
            </KebabMenu>
          </div>
        </EntranceAnimation>
      ))}
      <Button title="Create list" onClick={createList} />
    </div>
  );
}
