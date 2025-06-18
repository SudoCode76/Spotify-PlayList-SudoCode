"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, CheckCircle, Clock, Users, Zap } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function RequestExtension() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("¡Copiado al portapapeles!")
  }

  const openSpotifyDashboard = () => {
    window.open("https://developer.spotify.com/dashboard", "_blank")
  }

  const appDescription = `Spotify Playlist SudoCode es una aplicación web que permite a los usuarios exportar e importar sus playlists de Spotify en formato CSV. 

FUNCIONALIDADES:
- Exportar todas las playlists del usuario a un archivo CSV
- Exportar canciones favoritas (Liked Songs) 
- Importar playlists desde archivos CSV
- Crear nuevas playlists automáticamente
- Buscar y agregar canciones a playlists existentes

USO DE DATOS:
- Solo accedemos a la información necesaria para mostrar y gestionar las playlists del usuario
- No almacenamos datos del usuario en nuestros servidores
- Los datos se procesan localmente en el navegador del usuario
- No compartimos información con terceros

JUSTIFICACIÓN COMERCIAL:
- Aplicación gratuita sin fines de lucro
- Herramienta de utilidad para gestión de música personal
- No hay monetización ni publicidad
- Código abierto y transparente

La aplicación mejora la experiencia del usuario al permitir hacer respaldos de sus playlists y migrar música entre cuentas de manera sencilla.`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-slate-800 dark:text-slate-200">
                🚀 Solicitar Extensión de Spotify
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                Guía paso a paso para hacer tu aplicación Spotify Playlist SudoCode pública y que funcione con cualquier
                cuenta de Spotify
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Estado actual */}
          <Alert className="border-orange-200 bg-orange-50">
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-orange-800">
              <strong>📊 Estado actual:</strong> Tu aplicación está en "Modo de Desarrollo". Solo tú puedes usarla. Para
              que cualquier usuario pueda conectarse, necesitas solicitar la extensión a Spotify.
            </AlertDescription>
          </Alert>

          {/* Paso 1: Acceder a Spotify Dashboard */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span>Acceder a Spotify Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <Button
                onClick={openSpotifyDashboard}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir Spotify Developer Dashboard
              </Button>
              <p>1. Ve a tu aplicación en el dashboard</p>
              <p>2. Busca el botón "Request Extension" o "Quota Extension"</p>
            </CardContent>
          </Card>

          {/* Paso 2: Completar el formulario */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span>Completar Formulario de Extensión</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">📝 Descripción de la aplicación:</h4>
                  <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 rounded border border-slate-200 dark:border-slate-700 text-sm">
                    <pre className="whitespace-pre-wrap">{appDescription}</pre>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(appDescription)}
                    className="mt-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copiar descripción
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">🎯 Respuestas sugeridas para preguntas comunes:</h4>
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 p-3 rounded">
                      <p className="font-medium text-blue-900 dark:text-blue-100">¿Es comercial tu aplicación?</p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        No, es una herramienta gratuita sin fines de lucro
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 p-3 rounded">
                      <p className="font-medium text-blue-900 dark:text-blue-100">¿Qué datos recopilas?</p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Solo información de playlists y perfil básico. No almacenamos datos en servidores.
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 p-3 rounded">
                      <p className="font-medium text-blue-900 dark:text-blue-100">¿Cuántos usuarios esperás?</p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Inicialmente 100-500 usuarios, principalmente para uso personal y familiar
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 p-3 rounded">
                      <p className="font-medium text-blue-900 dark:text-blue-100">¿Cómo usas la API de Spotify?</p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Para leer playlists, canciones favoritas, crear playlists y buscar canciones. Todo procesado
                        localmente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paso 3: Documentación requerida */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span>Documentación Requerida</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Screenshots de la aplicación funcionando</p>
                    <p className="text-sm text-muted-foreground">
                      Toma capturas de pantalla de la página principal, proceso de login, exportación e importación
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">URL de la aplicación en funcionamiento</p>
                    <p className="text-sm text-muted-foreground">
                      Despliega tu app en Vercel y proporciona la URL (ej: https://tu-app.vercel.app)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Política de privacidad (opcional pero recomendada)</p>
                    <p className="text-sm text-muted-foreground">
                      Una página simple explicando que no almacenas datos de usuarios
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paso 4: Información técnica */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <span>Información Técnica</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium">🔧 Scopes utilizados:</p>
                  <div className="text-sm bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-2 rounded border border-slate-200 dark:border-slate-700">
                    <code>
                      user-read-private
                      <br />
                      user-read-email
                      <br />
                      playlist-read-private
                      <br />
                      playlist-read-collaborative
                      <br />
                      playlist-modify-public
                      <br />
                      playlist-modify-private
                      <br />
                      user-library-read
                      <br />
                      user-library-modify
                    </code>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">📊 Límites de API esperados:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Lectura de playlists: ~50 requests/usuario</li>
                    <li>• Búsqueda de canciones: ~100 requests/importación</li>
                    <li>• Creación de playlists: ~5 requests/usuario</li>
                    <li>• Uso total estimado: 1000 requests/día</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paso 5: Envío y seguimiento */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <span>Envío y Seguimiento</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <p>Completa todos los campos del formulario con la información proporcionada</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <p>Adjunta screenshots y documentación</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <p>Envía la solicitud</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <p>Espera respuesta (puede tomar de 1-4 semanas)</p>
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <Zap className="h-4 w-4" />
                <AlertDescription className="text-green-800">
                  <strong>💡 Consejo:</strong> Sé honesto y detallado en tu solicitud. Spotify aprecia la transparencia
                  sobre el uso de su API.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Qué esperar después */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">⏰ ¿Qué Esperar Después?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium text-green-600">✅ Si es aprobada:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Cualquier usuario puede conectarse</li>
                    <li>• Sin límite de usuarios</li>
                    <li>• Aplicación completamente pública</li>
                    <li>• Mayor límite de requests de API</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-red-600">❌ Si es rechazada:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Puedes solicitar feedback</li>
                    <li>• Hacer ajustes y volver a solicitar</li>
                    <li>• Usar modo desarrollo (25 usuarios max)</li>
                    <li>• Considerar alternativas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botón de acción */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-slate-700 dark:text-slate-300">
              <Button
                onClick={openSpotifyDashboard}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
              >
                <Users className="w-5 h-5 mr-2" />
                Solicitar Extensión Ahora
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Una vez aprobada, tu aplicación funcionará con cualquier cuenta de Spotify
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
