"use client";

import { Button } from "@/components/button/Button";

type ErrorProps = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>An error occured: {error.message}</h2>
      <Button title="Retry" onClick={reset} />
    </div>
  );
}
