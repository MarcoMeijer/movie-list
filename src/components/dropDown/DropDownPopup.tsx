import { useRef } from "react";
import styles from "./DropDownPopup.module.css";
import { useClickOutside } from "@/hooks/useClickOutside";

export interface DropDownPopupProps {
  children?: React.ReactNode;
  onClose: () => void;
  style?: React.CSSProperties;
}

export default function DropDownPopup({
  children,
  onClose,
  style,
}: DropDownPopupProps) {
  const ref = useRef(null);

  useClickOutside(ref, onClose);

  return (
    <div ref={ref} className={styles.popup} style={style}>
      {children}
    </div>
  );
}
