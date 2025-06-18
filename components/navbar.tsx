"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings, FileText, Home, HelpCircle, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="relative w-8 h-8 flex-shrink-0">
              {mounted ? (
                <Image
                  src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                  alt="Spotify SudoCode Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/logo-light.png"
                  alt="Spotify SudoCode Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent hidden sm:block">
              Playlist Spotify SudoCode
            </span>
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent sm:hidden">
              SC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-accent/50">
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
            </Link>
            <Link href="/request-extension">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-accent/50">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-accent/50">
                <FileText className="w-4 h-4 mr-2" />
                Privacidad
              </Button>
            </Link>
            <Link href="/debug">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-accent/50">
                <HelpCircle className="w-4 h-4 mr-2" />
                Debug
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-accent/50">
                <User className="w-4 h-4 mr-2" />
                Acerca de
              </Button>
            </Link>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur border-t border-border/40">
              <Link href="/" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground/80 hover:text-foreground hover:bg-accent/50"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Inicio
                </Button>
              </Link>
              <Link href="/request-extension" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground/80 hover:text-foreground hover:bg-accent/50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Button>
              </Link>
              <Link href="/privacy" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground/80 hover:text-foreground hover:bg-accent/50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Privacidad
                </Button>
              </Link>
              <Link href="/debug" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground/80 hover:text-foreground hover:bg-accent/50"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Debug
                </Button>
              </Link>
              <Link href="/about" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground/80 hover:text-foreground hover:bg-accent/50"
                >
                  <User className="w-4 h-4 mr-2" />
                  Acerca de
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
