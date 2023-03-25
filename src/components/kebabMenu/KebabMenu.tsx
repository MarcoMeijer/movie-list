"use client";
import { useState } from "react";
import DropDownPopup from "../dropDown/DropDownPopup";
import KebabIcon from "../icons/KebabIcon";
import styles from "./KebabMenu.module.css";

export interface KebabMenuProps {
  children?: React.ReactNode
}

export default function KebabMenu({ children }: KebabMenuProps) {
  const [open, setOpen] = useState(false);

  return <div className={styles.kebabMenu}>
    <button className={styles.kebabButton} onClick={() => setOpen(true)}>
      <KebabIcon fill="#ffffff"/>
    </button>
    {open && (
      <DropDownPopup onClose={() => setOpen(false)}>
        {children}
      </DropDownPopup>
    )}
  </div>;
}

