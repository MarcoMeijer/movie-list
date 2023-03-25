import { useEffect } from "react";

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  onClick: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (ref.current && event.target && !ref.current.contains(event.target)) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClick]);
}
