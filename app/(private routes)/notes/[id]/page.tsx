import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import { NoteDetailsClient } from "./NoteDetails.client"
import { fetchNoteById } from "@/lib/api/serverApi";
import { Metadata } from "next";

interface NoteDetailsProps {
    params: Promise<{id:string}>
}

export async function generateMetadata({params} : NoteDetailsProps): Promise<Metadata> {
    const { id } = await params
    const note = await fetchNoteById(id)
    return {
        title: `${note.title}`,
        description: `${note.content}`,
        openGraph:{
            title: `${note.title}`,
            description: `${note.content}`,
            url: `https://notehub-public.goit.study/api/notes/${note.id}`,
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1260,
                height: 630,
                alt: `${note.title}`
            }]
        }
    }
}


const NoteDetails = async ({params} : NoteDetailsProps) => {
    const {id} = await params;
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['noteDetail', id],
        queryFn: () => fetchNoteById(id)
    });


    return <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteDetailsClient />
            </HydrationBoundary>
}

export default NoteDetails