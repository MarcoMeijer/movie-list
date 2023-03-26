import { sdk } from "@/lib/client";
import MovieListView from "@/components/movieList/MovieList";

export interface MovieListPageProps {
  params: { listId: string };
}

export default async function MovieListPage({ params }: MovieListPageProps) {
  try {
    const listId = parseInt(params.listId);
    const { getMovieList, getMovieListItems } = await sdk.GetMovieList({
      listId,
    });

    return (
      <div>
        <MovieListView list={getMovieList} items={getMovieListItems} />
      </div>
    );
  } catch (error) {
    throw new Error("Unable to find list with this id.");
  }
}
