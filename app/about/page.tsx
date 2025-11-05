"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Code,
  User,
  Mail,
  ExternalLink,
  Heart,
  Coffee,
  Music,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const openLink = (url: string) => {
    window.open(url, "_blank")
  }

  const openWhatsApp = () => {
    // Reemplaza con tu número de WhatsApp (formato internacional sin + ni espacios)
    const phoneNumber = "1234567890" // Cambia por tu número
    const message = encodeURIComponent("Hola! Vi tu aplicación Spotify Playlist SudoCode y me gustaría contactarte.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const sendEmail = () => {
    // Reemplaza con tu email
    const email = "tu-email@gmail.com" // Cambia por tu email
    const subject = encodeURIComponent("Contacto desde Spotify Playlist SudoCode")
    const body = encodeURIComponent("Hola! Me gustaría contactarte sobre tu aplicación Spotify Playlist SudoCode.")
    window.open(`mailto:${email}?subject=${subject}&body=${body}`)
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-violet-900/20">
        <Navbar />

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
            {/* Header */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  Acerca del Desarrollador
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                  Creador de Spotify Playlist SudoCode
                </CardDescription>
              </CardHeader>
            </Card>

            {/* About the Project */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                  <Music className="w-5 h-5 text-emerald-500" />
                  <span>Sobre Spotify Playlist SudoCode</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                  <strong>Spotify Playlist SudoCode</strong> es una aplicación web desarrollada con Next.js que permite a
                  los usuarios exportar e importar sus playlists de Spotify en formato CSV.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">🚀 Características:</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400">
                      <li>Exportación completa de playlists</li>
                      <li>Exportación de canciones favoritas</li>
                      <li>Exportación de artistas seguidos</li>
                      <li>Importación desde archivos CSV</li>
                      <li>Interfaz moderna y responsive</li>
                      <li>Modo oscuro/claro</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">🛠️ Tecnologías:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        Next.js 15
                      </Badge>
                      <Badge
                          variant="secondary"
                          className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
                      >
                        React 19
                      </Badge>
                      <Badge
                          variant="secondary"
                          className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        TypeScript
                      </Badge>
                      <Badge
                          variant="secondary"
                          className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                      >
                        Tailwind CSS
                      </Badge>
                      <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      >
                        shadcn/ui
                      </Badge>
                      <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                      >
                        Spotify API
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Links */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span>Conecta Conmigo</span>
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  ¿Tienes preguntas, sugerencias o quieres colaborar? ¡Contáctame!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Botón de Acceso Público */}
                <div className="mb-6">
                  <Link href="/public-access">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg">
                      <Users className="w-4 h-4 mr-2" />
                      Configurar Acceso Público
                    </Button>
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                    Aprende cómo hacer que tu aplicación funcione para cualquier usuario
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* LinkedIn */}
                  <Button
                      onClick={() => openLink("https://linkedin.com/in/tu-perfil")} // Cambia por tu LinkedIn
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>

                  {/* GitHub */}
                  <Button
                      onClick={() => openLink("https://github.com/tu-usuario")} // Cambia por tu GitHub
                      variant="outline"
                      className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-lg"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>

                  {/* WhatsApp */}
                  <Button
                      onClick={openWhatsApp}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>

                  {/* Email */}
                  <Button
                      onClick={sendEmail}
                      variant="outline"
                      className="w-full border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 shadow-lg"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Source Code */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                  <Code className="w-5 h-5 text-orange-500" />
                  <span>Código Fuente</span>
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Este proyecto es de código abierto. Puedes ver, clonar y contribuir al código.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">Repositorio Principal</h4>
                    <Badge variant="outline" className="border-emerald-500 text-emerald-600 dark:text-emerald-400">
                      Open Source
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Código completo de la aplicación Spotify Playlist SudoCode
                  </p>
                  <Button
                      onClick={() => openLink("https://github.com/tu-usuario/spotify-playlist-sudocode")} // Cambia por tu repo
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Ver en GitHub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">🔧 Para Desarrolladores:</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400">
                      <li>Clona el repositorio</li>
                      <li>Instala dependencias con npm/yarn</li>
                      <li>Configura variables de entorno</li>
                      <li>Ejecuta en modo desarrollo</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">📝 Contribuciones:</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400">
                      <li>Issues y bug reports</li>
                      <li>Pull requests bienvenidos</li>
                      <li>Sugerencias de mejoras</li>
                      <li>Documentación</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span>Apoya el Proyecto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                  Si te gusta este proyecto y te ha sido útil, puedes apoyarlo de las siguientes maneras:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-700/50">
                    <Github className="w-8 h-8 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                    <h4 className="font-medium mb-1 text-slate-800 dark:text-slate-200">⭐ Star en GitHub</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Dale una estrella al repositorio</p>
                  </div>

                  <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-700/50">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium mb-1 text-slate-800 dark:text-slate-200">📢 Comparte</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Comparte con otros desarrolladores</p>
                  </div>

                  <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-700/50">
                    <Coffee className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <h4 className="font-medium mb-1 text-slate-800 dark:text-slate-200">☕ Invítame un café</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Apoya el desarrollo continuo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 dark:from-violet-500/5 dark:via-purple-500/5 dark:to-fuchsia-500/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Desarrollado con ❤️ usando Next.js y la API de Spotify
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                  © 2024 Spotify Playlist SudoCode - Proyecto de código abierto
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
