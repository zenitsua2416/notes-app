import { useParams } from "react-router-dom";

import { STORAGE } from "@/constants";
import { useDocTitle } from "@/hooks";
import { NoteNotFoundPage } from "@/pages";
import { NoteStore } from "@/types";
import { loadFromStorage } from "@/utils";

export const NotePage = () => {
  const { id } = useParams();
  const { setTitle } = useDocTitle();

  const noteStore = loadFromStorage<NoteStore>(STORAGE.NOTE_STORE, {});

  if (!id) return <div>Something went wrong...</div>;
  if (!noteStore) return <div>Loading...</div>;
  const note = noteStore[id];

  if (!note) return <NoteNotFoundPage />;

  setTitle(note.title);

  return (
    <div className="max-w-app mx-auto w-[min(app,100%)] pt-5">
      <div className="px-2">
        <h1 className="text-center text-3xl font-semibold">Note App</h1>
        <div className="mt-10 flex flex-col gap-4">
          <div className="my-8">
            <h1 className="hover:bg-default-100 active:bg-default-100 focus:bg-default-100 text-default-900 border-default-400 w-full rounded-r-md border-l-2 bg-transparent px-4 py-2 text-4xl font-black leading-loose outline-none lg:text-6xl lg:leading-normal">
              {note?.title}
            </h1>
          </div>

          <div className="mb-8">
            <article className="text-default-600 w-full resize-none bg-transparent p-4 text-xl leading-8 tracking-wide outline-none">
              {note.notes}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
