import { db } from "~/lib/db/db";
import { documents } from "~/lib/db/schema";

export default async function Home() {
  const data = await db.select().from(documents);

  console.log("testing 123", data);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-xl">
        Nextjs search with text embeddings
      </main>
    </div>
  );
}
