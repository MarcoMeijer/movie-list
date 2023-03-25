export interface ButtonProps {
  title: string;
  onClick?: () => void;
}

export function Button({ title, onClick }: ButtonProps) {
  return <button onClick={onClick}>{title}</button>;
}
