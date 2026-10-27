import { Metadata } from "next"
import css from "./page.module.css"

export const metadata: Metadata = {
    title: "04 - Page not found | NoteHub",
    description: "Sorry, the page you are looking for does not exist"
}

const NotFoundPage = () => {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>        
    )
}

export default NotFoundPage