import React from "react";

export interface InputProps {
  title?: string;
  value: string;
  setValue: React.Dispatch<string>;
}

export default function Input({ title, value, setValue }: InputProps) {
  return <div>
    <label>
      {title}
      <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
    </label>
  </div>;
}

