import styles from "./TextButton.module.css";

export interface ButtonProps {
  title: string;
  onClick?: () => void;
  active?: boolean;
}

export function TextButton({ title, onClick, active }: ButtonProps) {
  return (
    <button
      className={active !== false ? styles.active : styles.deactivated}
      onClick={() => active !== false && onClick && onClick()}
    >
      {title}
    </button>
  );
}
