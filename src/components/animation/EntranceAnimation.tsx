import styles from "./EntranceAnimation.module.css";

export interface EntranceAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

export default function EntranceAnimation({
  children,
  delay,
}: EntranceAnimationProps): JSX.Element {
  return (
    <div
      className={styles.entranceAnimation}
      style={{ animationDelay: `${delay ?? 0}s` }}
    >
      {children}
    </div>
  );
}
