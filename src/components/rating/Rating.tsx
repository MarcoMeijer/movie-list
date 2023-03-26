import StarIcon from "../icons/StarIcon";
import styles from "./Rating.module.css";

export interface ImdbRatingProps {
  name: string;
  rating: string;
  voters?: string;
}

export default function Rating({ name, rating, voters }: ImdbRatingProps) {
  const [realRating, outOf] = rating.split("/");

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <div className={styles.content}>
        <StarIcon fill="#fbd341" width={34} height={34} />
        <div className={styles.numbers}>
          <p>
            <span className={styles.rating}>{realRating}</span>
            {outOf && `/${outOf}`}
          </p>
          <p className={styles.votes}>{voters}</p>
        </div>
      </div>
    </div>
  );
}
