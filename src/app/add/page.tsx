import { SubmitButton } from "~/components/submit-button";
import { addAction } from "~/lib/actions";

export default async function AddPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-xl">
        <span>Add text to database</span>

        <form
          action={addAction}
          className="flex flex-col gap-4 w-full min-w-[500px]"
        >
          <textarea
            autoFocus
            className="p-4 text-black outline-blue-400 rounded-sm outline-offset-2"
            name="add"
          />

          <SubmitButton>Add</SubmitButton>
        </form>
      </main>
    </div>
  );
}
