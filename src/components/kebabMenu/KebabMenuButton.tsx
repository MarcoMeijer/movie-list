import styles from "./KebabMenuButton.module.css";

export interface KebabMenuButtonProps {
  title: string;
  onClick: () => void;
}

export default function KebabMenuButton({
  title,
  onClick,
}: KebabMenuButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
}
