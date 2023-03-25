import React, { useState } from "react";
import { DropDownOptionProps } from "./DropDownOption";
import styles from "./DropDown.module.css";
import DropDownPopup from "./DropDownPopup";
import InputBox from "../inputBox/InputBox";
import DropDownIcon from "./DropDownIcon";

export interface DropDownProps<T> {
  title: string;
  value: T | null;
  setValue: React.Dispatch<T>;
  children:
    | React.ReactElement<DropDownOptionProps<T>>[]
    | React.ReactElement<DropDownOptionProps<T>>;
}

export default function DropDown<T>({
  title,
  value,
  setValue,
  children,
}: DropDownProps<T>) {
  const [open, setOpen] = useState(false);

  let valueName = "---";
  if (Array.isArray(children)) {
    for (const child of children) {
      if (child.props.value === value) {
        valueName = child.props.name;
      }
    }
  } else {
    if (children.props.value === value) {
      valueName = children.props.name;
    }
  }

  return (
    <div className={styles.dropdown}>
      <InputBox
        title={title}
        onClick={() => {
          setOpen(true);
        }}
        icon={<DropDownIcon fill="#ffffff" />}
      >
        <p className={styles.value}>{valueName}</p>
      </InputBox>
      {open && (
        <DropDownPopup onClose={() => setOpen(false)} style={{ width: "100%" }}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              ...child.props,
              onClick: () => {
                setValue(child.props.value);
                setOpen(false);
              },
            });
          })}
        </DropDownPopup>
      )}
    </div>
  );
}
