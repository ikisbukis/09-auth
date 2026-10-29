import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import {fetchNoteById} from "@/lib/api/serverApi"
import NotePreviewClient from "./NotePreview.client"

interface NoteDetailsModalProps {
    params: Promise<{ id: string}>
}

const NoteDetailsModal = async ({params} : NoteDetailsModalProps) => {
    const {id} = await params;
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient />
        </HydrationBoundary>
    )
}

export default NoteDetailsModal