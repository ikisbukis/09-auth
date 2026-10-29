import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-in page",
  description: "Sign-in to your account",
  openGraph: {
    title: "Sign-in page",
    description: "Sign-in to your account",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
