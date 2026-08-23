"use client";

import { useState } from "react";
import { newNoteId, type Note } from "@/lib/notes-store";
import { useNotesStore } from "@/lib/use-notes-store";

/** Renders a "+ Add note" affordance plus the list of saved note titles for one
 * item, and a full-screen title+content editor popup. Drop one of these next
 * to any list item that should let the learner attach their own free-text
 * notes — e.g. one per Listen a Minute extension task, or one per collocation/
 * phrasal verb. Notes persist locally and sync to Drive (once signed in)
 * under `moduleKey`, addressed within it by `itemKey`. */
export function NotesList({ moduleKey, itemKey }: { moduleKey: string; itemKey: string }) {
  const { getNotes, saveNote, deleteNote } = useNotesStore(moduleKey);
  const notes = getNotes(itemKey);
  const [editing, setEditing] = useState<{ note: Note | null } | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");

  function openNew() {
    setEditing({ note: null });
    setDraftTitle("");
    setDraftContent("");
  }

  function openExisting(note: Note) {
    setEditing({ note });
    setDraftTitle(note.title);
    setDraftContent(note.content);
  }

  function save() {
    if (!editing) return;
    saveNote(itemKey, {
      id: editing.note?.id ?? newNoteId(),
      title: draftTitle,
      content: draftContent,
      updatedAt: Date.now(),
    });
    setEditing(null);
  }

  function remove() {
    if (!editing?.note) return;
    deleteNote(itemKey, editing.note.id);
    setEditing(null);
  }

  return (
    <>
      {notes.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          {notes.map((n) => (
            <button
              key={n.id}
              type="button"
              className="truncate text-left text-[16px] text-accent-700 underline decoration-[color:var(--color-accent-100)] underline-offset-2"
              onClick={() => openExisting(n)}
            >
              {n.title || "Untitled note"}
            </button>
          ))}
        </div>
      )}
      <button type="button" className="label-xs mt-2 block text-accent" onClick={openNew}>
        + Add note
      </button>

      {editing && (
        <div className="fixed inset-0 z-[60] bg-bg">
          <div className="mx-auto flex h-full max-w-[480px] flex-col lg:max-w-[1080px]">
            <div className="divider-b flex items-center justify-between px-4 py-3">
              <span className="text-[19px] font-extrabold">{editing.note ? "Edit note" : "New note"}</span>
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>
                Close
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              <input
                className="input"
                placeholder="Title"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
              />
              <textarea
                className="input min-h-[240px] flex-1 resize-y"
                placeholder="Write your note…"
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
              />
            </div>
            <div className="divider-t flex gap-3 p-4">
              {editing.note && (
                <button className="btn btn-secondary flex-1 px-4 py-3" onClick={remove}>
                  Delete
                </button>
              )}
              <button
                className="btn btn-primary flex-1 px-4 py-3 disabled:opacity-40"
                disabled={draftTitle.trim() === ""}
                onClick={save}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
