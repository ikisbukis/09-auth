
import { NoteForm } from "@/components/NoteForm/NoteForm"
import css from "../../../notes/[id]/NoteDetails.module.css"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Note",
    description: "Create your own note",
    openGraph: {
        title: "Create Note",
        description: "Create your own note",
        url: "https://notehub-public.goit.study/notes/action/create",
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: `NoteHub`
            }
        ]
    }
}

const CreateNotePage = () => {

    return (
        <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	  <NoteForm />
  </div>
</main>

    )
}

export default CreateNotePage