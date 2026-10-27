"use client"

import {fetchNoteById} from "@/lib/api/clientApi"
import  {Modal} from "@/components/Modal/Modal"
import css from "./NotePreview.module.css"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"


const NotePreviewClient = () => {
        const {id} = useParams<{id:string}>()
        const router = useRouter();

        const {data: note, isError, isLoading } = useQuery({
            queryKey: ['note', id],
            queryFn: () => fetchNoteById(id),
            refetchOnMount: false
        })

        const onClose = () => router.back()       
        
        return (
            <>
            {isLoading && <p>Loading, please wait...</p>}
		    {isError && <p>Something went wrong.</p>}
            {note && <Modal onClose={onClose}>
            <main className={css.main}>	
	<div className={css.container}>
		<div className={css.item}>
		  <div className={css.header}>
		    <h2>{note?.title}</h2>
		  </div>
		  <p className={css.tag}>{note?.tag}</p>
		  <p className={css.content}>{note?.content}</p>
		  <p className={css.date}>{note?.createdAt}</p>
		</div>
	</div>
</main>
        </Modal>}
        </>        
    )
}

export default NotePreviewClient