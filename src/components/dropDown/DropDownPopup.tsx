import { useRef } from "react";
import styles from "./DropDownPopup.module.css";
import { useClickOutside } from "@/hooks/useClickOutside";

export interface DropDownPopupProps {
  children?: React.ReactNode;
  onClose: () => void;
}

export default function DropDownPopup({
  children,
  onClose,
}: DropDownPopupProps) {
  const ref = useRef(null);

  useClickOutside(ref, onClose);

  return (
    <div ref={ref} className={styles.popup}>
      {children}
    </div>
  );
}
