"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Settings, FileText, ExternalLink, CheckCircle, Clock, Zap } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function PublicAccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-cyan-900/20 dark:to-blue-900/20">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center space-x-2 text-slate-800 dark:text-slate-200">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Haz que tu aplicación Spotify Playlist SudoCode funcione con cualquier cuenta de Spotify</span>
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                Haz que tu aplicación funcione con cualquier cuenta de Spotify
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Current Status */}
          <Alert className="border-orange-200 bg-orange-50">
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-orange-800">
              <strong>📊 Estado actual:</strong> Tu aplicación Spotify Playlist SudoCode está en "Modo de Desarrollo".
              Solo tú puedes usarla. Para que cualquier usuario pueda conectarse, necesitas solicitar la extensión a
              Spotify.
            </AlertDescription>
          </Alert>

          {/* Goal */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <Zap className="w-5 h-5" />
                <span>🎯 Objetivo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                Hacer que cualquier usuario de Spotify pueda simplemente hacer clic en "Conectar con Spotify" y usar la
                aplicación sin que tú tengas que configurar nada adicional.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600">❌ Estado Actual:</h4>
                  <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                    <li>• Solo funciona con tu cuenta</li>
                    <li>• Requiere agregar usuarios manualmente</li>
                    <li>• Máximo 25 usuarios en desarrollo</li>
                    <li>• Cada usuario debe ser autorizado por ti</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-green-600">✅ Después de la Aprobación:</h4>
                  <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                    <li>• Funciona con cualquier cuenta de Spotify</li>
                    <li>• Sin configuración adicional</li>
                    <li>• Sin límite de usuarios</li>
                    <li>• Completamente automático</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How it works */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">🔄 ¿Cómo Funciona?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-700 dark:text-slate-300">Solicitar Extensión de Cuota</p>
                    <p className="text-sm text-muted-foreground text-slate-700 dark:text-slate-300">
                      Completar el formulario en Spotify Developer Dashboard explicando tu aplicación
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-700 dark:text-slate-300">Esperar Aprobación</p>
                    <p className="text-sm text-muted-foreground text-slate-700 dark:text-slate-300">
                      Spotify revisa tu solicitud (puede tomar 1-4 semanas)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-700 dark:text-slate-300">¡Listo para Todos!</p>
                    <p className="text-sm text-muted-foreground text-slate-700 dark:text-slate-300">
                      Una vez aprobada, cualquier usuario puede conectarse automáticamente
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features after approval */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">✨ Funcionalidades Disponibles</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Lo que los usuarios podrán hacer una vez que sea pública
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">📤 Exportación:</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                    <li>Exportar todas las playlists a CSV</li>
                    <li>Exportar canciones favoritas</li>
                    <li>Incluir metadatos completos</li>
                    <li>Formato compatible con Excel</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">📥 Importación:</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                    <li>Importar playlists desde CSV</li>
                    <li>Crear nuevas playlists automáticamente</li>
                    <li>Buscar y agregar canciones</li>
                    <li>Agregar a canciones favoritas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={() => window.open("/request-extension", "_blank")}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
            >
              <Settings className="w-4 h-4 mr-2" />
              Guía de Solicitud
            </Button>

            <Button
              onClick={() => window.open("/privacy", "_blank")}
              variant="outline"
              className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-lg"
            >
              <FileText className="w-4 h-4 mr-2" />
              Política de Privacidad
            </Button>

            <Button
              onClick={() => window.open("https://developer.spotify.com/dashboard", "_blank")}
              variant="outline"
              className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-lg"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Spotify Dashboard
            </Button>
          </div>

          {/* FAQ */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">❓ Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">¿Es gratis solicitar la extensión?</h4>
                  <p className="text-sm text-muted-foreground text-slate-700 dark:text-slate-300">
                    Sí, es completamente gratis. Spotify no cobra por aprobar aplicaciones.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">
                    ¿Qué pasa si rechazan mi solicitud?
                  </h4>
                  <p className="text-sm text-muted-foreground text-slate-700 dark:text-slate-300">
                    Puedes solicitar feedback, hacer ajustes y volver a aplicar. También puedes usar el modo desarrollo
                    con hasta 25 usuarios.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">¿Cuánto tiempo toma la aprobación?</h4>
                  <p className="text-sm text-muted-foreground text-slate-700 dark:text-slate-300">
                    Generalmente entre 1-4 semanas, dependiendo de la complejidad de la aplicación y la carga de trabajo
                    de Spotify.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">
                    ¿Necesito cambiar algo en mi código?
                  </h4>
                  <p className="text-sm text-muted-foreground text-slate-700 dark:text-slate-300">
                    No, tu código ya está listo. Solo necesitas la aprobación de Spotify para que funcione públicamente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next steps */}
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-800">
              <strong>🚀 Siguiente paso:</strong> Haz clic en "Guía de Solicitud" para obtener el formulario
              pre-completado y las instrucciones paso a paso para solicitar la extensión en Spotify.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
