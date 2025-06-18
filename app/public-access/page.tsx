"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Settings, FileText, ExternalLink, CheckCircle, Clock, Zap } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function PublicAccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center space-x-2">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Acceso Público</span>
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Haz que tu aplicación funcione con cualquier cuenta de Spotify
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Current Status */}
          <Alert className="border-orange-200 bg-orange-50">
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-orange-800">
              <strong>📊 Estado actual:</strong> Tu aplicación está en "Modo de Desarrollo". Solo tú puedes usarla. Para
              que cualquier usuario pueda conectarse, necesitas solicitar la extensión a Spotify.
            </AlertDescription>
          </Alert>

          {/* Goal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>🎯 Objetivo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm sm:text-base">
                Hacer que cualquier usuario de Spotify pueda simplemente hacer clic en "Conectar con Spotify" y usar la
                aplicación sin que tú tengas que configurar nada adicional.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600">❌ Estado Actual:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Solo funciona con tu cuenta</li>
                    <li>• Requiere agregar usuarios manualmente</li>
                    <li>• Máximo 25 usuarios en desarrollo</li>
                    <li>• Cada usuario debe ser autorizado por ti</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-green-600">✅ Después de la Aprobación:</h4>
                  <ul className="text-sm space-y-1">
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
          <Card>
            <CardHeader>
              <CardTitle>🔄 ¿Cómo Funciona?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Solicitar Extensión de Cuota</p>
                    <p className="text-sm text-muted-foreground">
                      Completar el formulario en Spotify Developer Dashboard explicando tu aplicación
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Esperar Aprobación</p>
                    <p className="text-sm text-muted-foreground">
                      Spotify revisa tu solicitud (puede tomar 1-4 semanas)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">¡Listo para Todos!</p>
                    <p className="text-sm text-muted-foreground">
                      Una vez aprobada, cualquier usuario puede conectarse automáticamente
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features after approval */}
          <Card>
            <CardHeader>
              <CardTitle>✨ Funcionalidades Disponibles</CardTitle>
              <CardDescription>Lo que los usuarios podrán hacer una vez que sea pública</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">📤 Exportación:</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Exportar todas las playlists a CSV</li>
                    <li>Exportar canciones favoritas</li>
                    <li>Incluir metadatos completos</li>
                    <li>Formato compatible con Excel</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">📥 Importación:</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
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
              className="w-full bg-green-500 hover:bg-green-600"
            >
              <Settings className="w-4 h-4 mr-2" />
              Guía de Solicitud
            </Button>

            <Button onClick={() => window.open("/privacy", "_blank")} variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Política de Privacidad
            </Button>

            <Button
              onClick={() => window.open("https://developer.spotify.com/dashboard", "_blank")}
              variant="outline"
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Spotify Dashboard
            </Button>
          </div>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>❓ Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">¿Es gratis solicitar la extensión?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sí, es completamente gratis. Spotify no cobra por aprobar aplicaciones.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">¿Qué pasa si rechazan mi solicitud?</h4>
                  <p className="text-sm text-muted-foreground">
                    Puedes solicitar feedback, hacer ajustes y volver a aplicar. También puedes usar el modo desarrollo
                    con hasta 25 usuarios.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">¿Cuánto tiempo toma la aprobación?</h4>
                  <p className="text-sm text-muted-foreground">
                    Generalmente entre 1-4 semanas, dependiendo de la complejidad de la aplicación y la carga de trabajo
                    de Spotify.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">¿Necesito cambiar algo en mi código?</h4>
                  <p className="text-sm text-muted-foreground">
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
