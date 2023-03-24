import { sdk } from "@/lib/client";

export interface MovieListPageProps {
  params: { listId: string };
}

export default async function MovieListPage({ params }: MovieListPageProps) {
  const listId = parseInt(params.listId)
  const { getMovieListItems } = await sdk.GetMovieListItems({
    listId
  });

  return <div>
    {
      getMovieListItems.map((listItem) => {
        return <div>
          {listItem.imdb_id}
        </div>
      })
    }
  </div>;
}
