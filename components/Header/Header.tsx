import Link from "next/link"
import css from "./Header.module.css"
import AuthNavigation from "../AuthNavigation/AuthNavigation"
import { getMe } from "@/lib/api/serverApi"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export const Header = async () => {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey:['getMe'],
      queryFn: () => getMe()
    })

    return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthNavigation /> 
          </HydrationBoundary>              
        </ul>
        
      </nav>
    </header>
    )
}