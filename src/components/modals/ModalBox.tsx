import styles from "./ModalBox.module.css";

export interface ModalBoxProps {
  children: React.ReactNode;
}

export default function ModalBox({ children }: ModalBoxProps) {
  return <div className={styles.modalBox}>{children}</div>;
}
