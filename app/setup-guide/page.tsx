"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, CheckCircle, AlertTriangle, Info, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function SetupGuide() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("¡Copiado al portapapeles!")
  }

  const openSpotifyDashboard = () => {
    window.open("https://developer.spotify.com/dashboard", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-teal-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-slate-800 dark:text-slate-200">
                🚀 Configuración para Uso Público
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                Cómo hacer que tu aplicación funcione para cualquier usuario de Spotify
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Alerta importante sobre uso público */}
          <Alert className="border-blue-200 bg-blue-50">
            <Users className="h-4 w-4" />
            <AlertDescription className="text-blue-800">
              <strong>📢 Importante:</strong> Para que otros usuarios puedan usar tu aplicación, necesitas configurar tu
              app de Spotify en "Modo de Desarrollo Extendido" o solicitar aprobación para producción.
            </AlertDescription>
          </Alert>

          {/* Paso 1: Configurar para desarrollo extendido */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span>Configurar Modo de Desarrollo Extendido</span>
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

              <div className="space-y-2">
                <p>1. Ve a tu aplicación en Spotify Dashboard</p>
                <p>
                  2. Haz clic en <strong>"Settings"</strong>
                </p>
                <p>
                  3. Busca la sección <strong>"Users and Access"</strong>
                </p>
                <p>4. Agrega usuarios de prueba:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    Haz clic en <strong>"Add New User"</strong>
                  </li>
                  <li>
                    Ingresa el <strong>nombre</strong> y <strong>email</strong> de cada usuario
                  </li>
                  <li>
                    Puedes agregar hasta <strong>25 usuarios</strong> en modo desarrollo
                  </li>
                </ul>
              </div>

              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-orange-800">
                  <strong>⚠️ Limitación:</strong> En modo desarrollo, solo los usuarios que agregues manualmente podrán
                  usar la aplicación.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Paso 2: Solicitar aprobación para producción */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span>Solicitar Aprobación para Producción (Recomendado)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="space-y-2">
                <p>Para uso público sin limitaciones:</p>
                <p>
                  1. En tu aplicación de Spotify, ve a <strong>"App Status"</strong>
                </p>
                <p>
                  2. Haz clic en <strong>"Request Extension"</strong>
                </p>
                <p>3. Completa el formulario con:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>Descripción:</strong> "Aplicación para exportar e importar playlists de Spotify en formato
                    CSV"
                  </li>
                  <li>
                    <strong>Uso comercial:</strong> No (a menos que planees monetizar)
                  </li>
                  <li>
                    <strong>Datos que recopilas:</strong> "Solo información básica del perfil y playlists del usuario"
                  </li>
                  <li>
                    <strong>Cómo usas los datos:</strong> "Para mostrar y exportar las playlists del usuario"
                  </li>
                </ul>
                <p>4. Adjunta capturas de pantalla de tu aplicación funcionando</p>
                <p>5. Envía la solicitud</p>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-800">
                  <strong>✅ Ventajas:</strong> Una vez aprobada, cualquier usuario de Spotify podrá usar tu aplicación
                  sin restricciones.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Paso 3: Configurar URLs de producción */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span>Configurar URLs de Producción</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="space-y-2">
                <p>1. Despliega tu aplicación en Vercel, Netlify, o tu plataforma preferida</p>
                <p>2. En Spotify Dashboard → Settings → Redirect URIs</p>
                <p>3. Agrega tu URL de producción:</p>
              </div>

              <div className="bg-gray-100 p-3 rounded border">
                <code className="text-sm">https://tu-dominio.vercel.app/callback</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("https://tu-dominio.vercel.app/callback")}
                  className="ml-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              <div className="space-y-2">
                <p>4. Mantén también la URL de desarrollo:</p>
              </div>

              <div className="bg-gray-100 p-3 rounded border">
                <code className="text-sm">http://127.0.0.1:3000/callback</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("http://127.0.0.1:3000/callback")}
                  className="ml-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Paso 4: Información sobre permisos */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <span>Permisos y Scopes Necesarios</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="space-y-2">
                <p>Tu aplicación solicita estos permisos:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>user-read-private:</strong> Leer información básica del perfil
                  </li>
                  <li>
                    <strong>user-read-email:</strong> Leer email del usuario
                  </li>
                  <li>
                    <strong>playlist-read-private:</strong> Leer playlists privadas
                  </li>
                  <li>
                    <strong>playlist-read-collaborative:</strong> Leer playlists colaborativas
                  </li>
                  <li>
                    <strong>playlist-modify-public:</strong> Crear/modificar playlists públicas
                  </li>
                  <li>
                    <strong>playlist-modify-private:</strong> Crear/modificar playlists privadas
                  </li>
                  <li>
                    <strong>user-library-read:</strong> Leer canciones favoritas
                  </li>
                  <li>
                    <strong>user-library-modify:</strong> Agregar canciones favoritas
                  </li>
                </ul>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>💡 Nota:</strong> Estos permisos son necesarios para la funcionalidad completa de exportar e
                  importar playlists.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Alternativa temporal */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">🔄 Alternativa Temporal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 dark:text-slate-300">
              <Alert className="border-yellow-200 bg-yellow-50">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-yellow-800">
                  <strong>💡 Mientras esperas la aprobación:</strong>
                  <br />
                  Puedes agregar manualmente hasta 25 usuarios en el modo de desarrollo. Esto te permite probar la
                  aplicación con amigos y familiares.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <p>
                  <strong>Para agregar usuarios temporalmente:</strong>
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Ve a Spotify Dashboard → Tu App → Settings</li>
                  <li>Busca "Users and Access"</li>
                  <li>Haz clic en "Add New User"</li>
                  <li>Ingresa nombre y email del usuario</li>
                  <li>El usuario podrá usar la aplicación inmediatamente</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Checklist final */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">✅ Checklist Final</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 dark:text-slate-300">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="app-type" />
                  <label htmlFor="app-type">Aplicación configurada como "Web App"</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="redirect-uris" />
                  <label htmlFor="redirect-uris">Redirect URIs configuradas (desarrollo y producción)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="users-added" />
                  <label htmlFor="users-added">Usuarios de prueba agregados (modo desarrollo)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="extension-requested" />
                  <label htmlFor="extension-requested">Solicitud de extensión enviada (para uso público)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="app-deployed" />
                  <label htmlFor="app-deployed">Aplicación desplegada en producción</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
