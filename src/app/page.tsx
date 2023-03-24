import { EMAIL } from "@/constants/email";
import { sdk } from "@/lib/client";
import styles from "./page.module.css";

export default async function Home() {
  const res = await sdk.Query({
    email: EMAIL,
  });

  return (
    <main className={styles.main}>
      {res.getMovieLists.map((list) => (
        <p key={list.id}>{list.name}</p>
      ))}
    </main>
  );
}
