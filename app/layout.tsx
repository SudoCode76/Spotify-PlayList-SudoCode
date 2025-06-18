import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spotify Playlist SudoCode",
  description: "Exporta e importa tus playlists de Spotify con archivos CSV de forma fácil y rápida",
  generator: "v0.dev",
  keywords: ["Spotify", "playlist", "CSV", "export", "import", "music", "SudoCode"],
  authors: [{ name: "SudoCode" }],
  creator: "SudoCode",
  publisher: "SudoCode",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://spotify-play-list-sudo-code.vercel.app/",
    title: "🎵 Spotify Playlist SudoCode",
    description:
      "✨ Exporta e importa tus playlists de Spotify con archivos CSV de forma fácil y rápida. Gestiona tu música como un profesional.",
    siteName: "Spotify Playlist SudoCode",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spotify Playlist SudoCode - Gestiona tus playlists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🎵 Spotify Playlist SudoCode",
    description: "✨ Exporta e importa tus playlists de Spotify con archivos CSV",
    images: ["/og-image.png"],
    creator: "@SudoCode76",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
