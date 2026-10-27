'use client'

import css from "./NoteForm.module.css"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNote } from "../../lib/api/clientApi";
import { useFormDraft } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { CreateNoteType } from "@/types/note";

export const NoteForm = ( ) => {
    const router = useRouter();
    const draft = useFormDraft((state) => state.draft)
    const setData = useFormDraft((state) => state.setData);
    const cleanDraft = useFormDraft((state) => state.cleanData)

    const queryClient = useQueryClient();

    const mutationCreate = useMutation({
          mutationFn: createNote,
          onSuccess: async () => {
              cleanDraft()
              await queryClient.invalidateQueries({
                queryKey:["notes"]
              })
              router.push("/notes/filter/all")
          }
        })

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string ?? "";
        const content = formData.get("content") as string ?? "";
        const tag = formData.get("tag") as CreateNoteType['tag'] ?? "Todo";
        mutationCreate.mutate({title, content, tag})
    }

     return (
    <form className={css.form} action={handleSubmit}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" name="title" defaultValue={draft.title ?? ""} className={css.input} onChange={(e) => setData({title: e.target.value})}/>
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea 
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
      onChange={(e)=> setData({content: e.target.value})}
      defaultValue={draft.content ?? ""}
    />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select  id="tag" name="tag" className={css.select} defaultValue={draft.tag ?? "Todo"} onChange={(e) => setData({tag: e.target.value as CreateNoteType['tag']})}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={() => router.back()}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={mutationCreate.isPending}
    >
      {mutationCreate.isPending ? "Creating..." : "Create note"}
    </button>
  </div>
</form>    
     )
}