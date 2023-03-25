import { MovieList } from "@/generated/graphql";

export type ModalTypes = {
  createList: { onCreate: (listName: string) => void };
  addToList: { imdbId: string; options: MovieList[] };
};
