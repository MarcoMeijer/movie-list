import React from "react";
import styles from "./DropDownOption.module.css";

export interface DropDownOptionProps<T> {
  value: T;
  name: string;
  onClick?: () => void;
}

export function DropDownOption<T>({
  name,
  onClick,
}: DropDownOptionProps<T>): JSX.Element {
  return (
    <button className={styles.button} onClick={onClick}>
      {name}
    </button>
  );
}
