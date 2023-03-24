import { EMAIL } from "@/constants/email";
import { sdk } from "@/lib/client";
import styles from "./page.module.css";
import MovieLists from "@/components/movieLists/MovieLists";

export default async function Home() {
  const res = await sdk.GetMovieLists({
    email: EMAIL,
  });

  return (
    <main className={styles.main}>
      <MovieLists lists={res.getMovieLists}/>
    </main>
  );
}
