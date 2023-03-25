import { sdk } from "@/lib/client";
import MovieListView from "@/components/movieList/MovieList";

export interface MovieListPageProps {
  params: { listId: string };
}

export default async function MovieListPage({ params }: MovieListPageProps) {
  const listId = parseInt(params.listId);
  const { getMovieList, getMovieListItems } = await sdk.GetMovieList({
    listId,
  });

  return (
    <div>
      <MovieListView list={getMovieList} items={getMovieListItems} />
    </div>
  );
}
