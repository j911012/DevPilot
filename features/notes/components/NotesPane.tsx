import { useState } from "react";
import { Textarea } from "@/shared/ui/atoms/textarea";
import { Button } from "@/shared/ui/atoms/button";
import { Note } from "../type";

type NotesPaneProps = {
  notes: Note[];
  onAddNote: (note: string) => void;
};

export const NotesPane = ({ notes, onAddNote }: NotesPaneProps) => {
  const [draftNote, setDraftNote] = useState("");

  const add = () => {
    const nextNote = draftNote.trim();
    if (!nextNote) return;
    onAddNote(nextNote);
    setDraftNote("");
  };

  return (
    <aside className="border-l border-black/10 dark:border-white/10 p-4">
      <h3 className="mb-2 text-sm font-semibold">Notes / TIL</h3>
      <div className="space-y-2">
        <Textarea
          value={draftNote}
          onChange={(e) => setDraftNote(e.target.value)}
          onKeyDown={(e) => {
            // 送信は Cmd/Ctrl + Enter のみ
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="メモ…（Cmd/Ctrl+Enterで追加 / Escでクリア）"
          aria-label="メモ追加"
        />
        <Button size="sm" onClick={add}>
          追加
        </Button>
      </div>

      {notes.length === 0 ? (
        <p className="mt-4 text-xs text-zinc-500">まだメモがありません</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="rounded border border-black/10 dark:border-white/10 p-2 text-sm whitespace-pre-wrap break-words"
            >
              {note.content}
              <div className="mt-1 text-[10px] text-zinc-500">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
