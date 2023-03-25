import { useState } from "react";
import InputBox from "../inputBox/InputBox";
import styles from "./Textarea.module.css";

export interface TextareaProps {
  title: string;
  placeholder: string;
  value?: string;
  setValue?: React.Dispatch<string>;
  maxLength?: number;
}

export default function Textarea({
  title,
  placeholder,
  value,
  setValue,
  maxLength,
}: TextareaProps): JSX.Element {
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <InputBox title={title} focused={focused}>
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue && setValue(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <p className={styles.counter}>
        {maxLength !== undefined && value && `${value.length}/${maxLength}`}
      </p>
    </InputBox>
  );
}
