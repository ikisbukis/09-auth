import { fetchNotes } from "@/lib/api/clientApi"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteClient from "./Notes.client"
import { Metadata } from "next"

interface MetadataProps{
    params: Promise<{slug: string[]}>
}

export async function generateMetadata({params} : MetadataProps): Promise<Metadata> {
    const {slug} = await params;
    return {
        title: `Filter: ${slug}`,
        description: `All notes with tag ${slug}`,
        openGraph:{
            title: `Filter: ${slug}`,
            description: `All notes with tag ${slug}`,
            url: `https://notehub-public.goit.study/api/notes/filter/${slug}`,
            images: [ {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: `Filter: ${slug}`
            }]
        }
    }
}

interface NotesProps{
    params: Promise<{slug: string[]}>
}

const Notes = async ({params} : NotesProps)  => {
    const queryClient = new QueryClient();
    const {slug} = await params;
    const tag = slug[0] === "all" ? undefined : slug[0];

    const page = 1
    const searchValue = ""

    await queryClient.prefetchQuery({
        queryKey:["notes", page, searchValue, tag],
        queryFn: () => fetchNotes({page, search: searchValue, tag})
    })

    return  <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteClient tag={tag}/>
            </HydrationBoundary>  
}

export default Notes