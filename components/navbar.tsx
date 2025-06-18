"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Music, Menu, X, Users, Settings, FileText, Home, HelpCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">Spotify Manager</span>
            <span className="font-bold text-lg text-foreground sm:hidden">SM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
            </Link>
            <Link href="/public-access">
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Acceso Público
              </Button>
            </Link>
            <Link href="/request-extension">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="ghost" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Privacidad
              </Button>
            </Link>
            <Link href="/debug">
              <Button variant="ghost" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                Debug
              </Button>
            </Link>
            <ThemeToggle />
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <Link href="/" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="w-4 h-4 mr-2" />
                  Inicio
                </Button>
              </Link>
              <Link href="/public-access" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Acceso Público
                </Button>
              </Link>
              <Link href="/request-extension" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Button>
              </Link>
              <Link href="/privacy" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Privacidad
                </Button>
              </Link>
              <Link href="/debug" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Debug
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
