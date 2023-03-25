import styles from "./InputBox.module.css";

export interface InputBoxProps {
  title?: string;
  focused?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  icon?: React.ReactNode;
}

export default function InputBox({
  focused,
  title,
  children,
  onClick,
  icon,
}: InputBoxProps): JSX.Element {
  return (
    <div
      className={focused ? styles.focused : styles.unfocused}
      onClick={onClick}
    >
      <div className={styles.column}>
        {title && <p className={styles.title}>{title}</p>}
        {children}
      </div>
      {icon}
    </div>
  );
}
