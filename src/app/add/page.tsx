export default async function AddPage() {
  async function searchAction(formData: FormData) {
    "use server";

    console.log(formData.get("add"));
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-xl">
        <span>Add text to database</span>

        <form
          action={searchAction}
          className="flex flex-col gap-4 w-full min-w-[500px]"
        >
          <textarea
            autoFocus
            className="p-4 text-black outline-blue-400 rounded-sm outline-offset-2"
            name="add"
          />

          <button
            type="submit"
            className="p-4 bg-blue-500 text-white rounded-sm font-semibold"
          >
            Add to search
          </button>
        </form>
      </main>
    </div>
  );
}
