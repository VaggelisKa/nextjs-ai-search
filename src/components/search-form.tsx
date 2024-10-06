"use client";

import Link from "next/link";
import { useState } from "react";
import { searchAction } from "~/lib/actions";

export function SearchForm() {
  let [results, setResults] = useState<
    { content: string; similarity: number }[]
  >([]);

  return (
    <form
      action={async (formData) => {
        let res = await searchAction(formData);

        setResults(res);
      }}
      className="flex flex-col gap-4 w-full"
    >
      <input
        autoFocus
        className="p-4 text-black outline-blue-400 rounded-sm outline-offset-2"
        type="text"
        placeholder="Search"
        name="search"
      />

      <button
        type="submit"
        className="p-4 bg-blue-500 text-white rounded-sm font-semibold"
      >
        Search
      </button>

      <Link className="underline mx-auto" href="/add" prefetch={false}>
        Add {"->"}
      </Link>

      {results.length > 0 && (
        <div className="flex flex-col gap-4 w-full text-white">
          {results.map((result) => (
            <div key={result.content} className="flex flex-col gap-4 w-full">
              <p>
                {result.content} at {(result.similarity * 100).toFixed(2)}%
                similarity
              </p>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
