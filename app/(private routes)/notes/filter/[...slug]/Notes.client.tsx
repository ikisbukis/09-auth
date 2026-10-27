'use client'

import css from "./Notes.module.css"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { useRouter } from "next/navigation"
import { fetchNotes } from "@/lib/api/clientApi"
import { Pagination } from "@/components/Pagination/Pagination"
import SearchBox from "@/components/SearchBox/SearchBox"
import { NoteList } from "@/components/NoteList/NoteList"

interface NoteClientProps {
    tag?: string
}

const NoteClient = ({tag} : NoteClientProps) => {
    const[searchValue, setSearch]=useState<string>("")
    const[page, setPage]= useState<number>(1)
    const {data, isLoading, isError} = useQuery({
      queryKey: ["notes", page, searchValue, tag],
      queryFn: () => fetchNotes( {page, search: searchValue, tag}),
      placeholderData: keepPreviousData,
      refetchOnMount: false,
      retry: false
    })
    const router = useRouter();

    const onChange = useDebouncedCallback(
      (value: string) => {
        setSearch(value)
        setPage(1)
      },
      400
    );
    const notes = data?.notes ?? []
    console.log(data)

  return (
    <div className={css.app}>
	    <header className={css.toolbar}>
		    <SearchBox value={searchValue} onChange={onChange} />
		    {(data?.totalPages ?? 0) > 1 && <Pagination totalPages={data?.totalPages ?? 0} currentPage={page} onPageChange={setPage}/>}
		    <button className={css.button} onClick={()=> router.push(`/notes/action/create`)}>Create note +</button>
      </header>
       {notes.length > 0 && <NoteList notes={notes} />}  
       {isLoading && <h3>Content is loading</h3>}
       {isError && <h3>..Ops</h3>}
    </div>
  )
}

export default NoteClient