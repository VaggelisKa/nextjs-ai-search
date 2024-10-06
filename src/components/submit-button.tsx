"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  let { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="p-4 bg-blue-500 text-white rounded-sm font-semibold"
    >
      {pending ? "Loading..." : children}
    </button>
  );
}
