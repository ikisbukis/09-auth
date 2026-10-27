import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import {Header} from "../components/Header/Header";
import {Footer} from "../components/Footer/Footer";
import {TanStackProvider} from "../components/TanStackProvider/TanStackProvider"
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Create and keep track of your notes",
  openGraph: {
    title: "NoteHub",
    description: "Create and keep track of your notes",
    url:`https://notehub.com/`,
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: `NoteHub`
    }]
  }
};

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
      <body className={` ${roboto.variable}`}>    
        <TanStackProvider>
          <AuthProvider>
          <Header />
          {children} 
          {modal}      
          <Footer />
          </AuthProvider>
        </TanStackProvider>      
      </body> 
    </html>
  );
}
