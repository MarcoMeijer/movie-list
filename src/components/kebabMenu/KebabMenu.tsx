"use client";
import { useCallback, useState } from "react";
import DropDownPopup from "../dropDown/DropDownPopup";
import KebabIcon from "../icons/KebabIcon";
import styles from "./KebabMenu.module.css";

export interface KebabMenuProps {
  children?: React.ReactNode;
}

export default function KebabMenu({ children }: KebabMenuProps) {
  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <div className={styles.kebabMenu}>
      <button className={styles.kebabButton} onClick={onOpen}>
        <KebabIcon fill="#ffffff" />
      </button>
      {open && <DropDownPopup onClose={onClose}>{children}</DropDownPopup>}
    </div>
  );
}
