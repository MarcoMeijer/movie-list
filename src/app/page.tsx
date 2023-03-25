import { EMAIL } from "@/constants/email";
import { sdk } from "@/lib/client";
import MovieLists from "@/components/movieLists/MovieLists";

export default async function Home() {
  const res = await sdk.GetMovieLists({
    email: EMAIL,
  });

  return <MovieLists lists={res.getMovieLists} />;
}
