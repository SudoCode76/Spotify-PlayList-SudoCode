"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function SetupGuide() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("¡Copiado al portapapeles!")
  }

  const openSpotifyDashboard = () => {
    window.open("https://developer.spotify.com/dashboard", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">🚀 Guía de Configuración de Spotify (2025)</CardTitle>
            <CardDescription>Configuración actualizada según las nuevas reglas de Spotify (Abril 2025)</CardDescription>
          </CardHeader>
        </Card>

        {/* Alerta sobre cambios */}
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>📅 Cambios importantes:</strong> Desde abril 2025, Spotify ya no permite <code>localhost</code> como
            Redirect URI. Ahora debes usar direcciones IP de loopback como <code>127.0.0.1</code>.
          </AlertDescription>
        </Alert>

        {/* Paso 1: Crear aplicación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span>Crear Aplicación en Spotify</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={openSpotifyDashboard} className="w-full bg-green-500 hover:bg-green-600">
              <ExternalLink className="w-4 h-4 mr-2" />
              Abrir Spotify Developer Dashboard
            </Button>

            <div className="space-y-2">
              <p>
                1. Haz clic en <strong>"Create app"</strong>
              </p>
              <p>2. Completa los campos:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <strong>App name:</strong> Spotify Playlist Manager
                </li>
                <li>
                  <strong>App description:</strong> Aplicación para exportar e importar playlists
                </li>
                <li>
                  <strong>Website:</strong> http://127.0.0.1:3000 (para desarrollo)
                </li>
                <li>
                  <strong>Redirect URI:</strong> <em>Lo configuraremos en el siguiente paso</em>
                </li>
              </ul>
              <p>
                3. Acepta los términos y haz clic en <strong>"Save"</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Paso 2: Configurar Redirect URI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span>Configurar Redirect URI</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                <strong>⚠️ Cambio importante:</strong> Ya NO uses <code>localhost</code>. Ahora debes usar{" "}
                <code>127.0.0.1</code>
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <p>
                1. En tu aplicación de Spotify, haz clic en <strong>"Settings"</strong>
              </p>
              <p>
                2. Busca la sección <strong>"Redirect URIs"</strong>
              </p>
              <p>
                3. Haz clic en <strong>"Add URI"</strong>
              </p>
              <p>4. Pega exactamente esta URL:</p>

              <div className="bg-gray-100 p-3 rounded border">
                <code className="text-sm">http://127.0.0.1:3000/callback</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("http://127.0.0.1:3000/callback")}
                  className="ml-2"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              <p>
                5. Haz clic en <strong>"Add"</strong>
              </p>
              <p>
                6. Haz clic en <strong>"Save"</strong> al final de la página
              </p>
            </div>

            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                <strong>✅ Correcto:</strong> Ahora deberías poder agregar la URL sin problemas. Spotify acepta
                direcciones IP de loopback como <code>127.0.0.1</code>.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Paso 3: Obtener Client ID */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span>Obtener Client ID</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p>1. En la página de Settings de tu aplicación</p>
              <p>
                2. Copia el <strong>"Client ID"</strong> (está en la parte superior)
              </p>
              <p>
                3. <strong>NO copies el Client Secret</strong> (no lo necesitamos)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Paso 4: Configurar variables de entorno */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                4
              </div>
              <span>Configurar Variables de Entorno</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p>
                1. En tu proyecto, abre el archivo <code>.env.local</code>
              </p>
              <p>
                2. Reemplaza <code>your_spotify_client_id_here</code> con tu Client ID real:
              </p>
            </div>

            <div className="bg-gray-100 p-3 rounded border">
              <code className="text-sm">NEXT_PUBLIC_SPOTIFY_CLIENT_ID=tu_client_id_aqui</code>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Ejemplo:</strong> Si tu Client ID es <code>abc123def456</code>, entonces sería:
                <br />
                <code>NEXT_PUBLIC_SPOTIFY_CLIENT_ID=abc123def456</code>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Paso 5: Acceder con la IP correcta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                5
              </div>
              <span>Acceder con la IP Correcta</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-orange-800">
                <strong>Importante:</strong> Debes acceder a tu aplicación usando <code>127.0.0.1</code> en lugar de{" "}
                <code>localhost</code>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <p>
                1. <strong>Reinicia</strong> tu servidor de desarrollo (Ctrl+C, luego <code>npm run dev</code>)
              </p>
              <p>
                2. En lugar de ir a <code>http://localhost:3000</code>
              </p>
              <p>
                3. <strong>Ve a:</strong> <code>http://127.0.0.1:3000</code>
              </p>
              <p>
                4. Haz clic en <strong>"Conectar con Spotify"</strong>
              </p>
              <p>5. ¡Ahora debería funcionar sin errores!</p>
            </div>

            <div className="bg-blue-100 p-3 rounded border">
              <p className="font-medium">🔗 URL correcta para desarrollo:</p>
              <code className="text-sm">http://127.0.0.1:3000</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard("http://127.0.0.1:3000")}
                className="ml-2"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* URLs para diferentes entornos */}
        <Card>
          <CardHeader>
            <CardTitle>🌐 URLs para Diferentes Entornos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium text-green-600">✅ Desarrollo (CORRECTO):</p>
                <code className="text-sm bg-green-100 p-2 rounded block">http://127.0.0.1:3000/callback</code>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard("http://127.0.0.1:3000/callback")}>
                  <Copy className="w-3 h-3 mr-1" />
                  Copiar
                </Button>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-green-600">✅ Producción (HTTPS):</p>
                <code className="text-sm bg-green-100 p-2 rounded block">https://tu-dominio.vercel.app/callback</code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard("https://tu-dominio.vercel.app/callback")}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copiar
                </Button>
              </div>
            </div>

            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                <strong>❌ Ya NO funcionan:</strong>
                <ul className="list-disc list-inside mt-2">
                  <li>
                    <code>http://localhost:3000/callback</code>
                  </li>
                  <li>
                    <code>https://localhost:3000/callback</code>
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Troubleshooting actualizado */}
        <Card>
          <CardHeader>
            <CardTitle>🔧 Solución de Problemas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-red-600">❌ "Invalid redirect URI"</p>
                <p className="text-sm">
                  Usa <code>http://127.0.0.1:3000/callback</code> en lugar de localhost
                </p>
              </div>

              <div>
                <p className="font-medium text-red-600">❌ "localhost is not allowed"</p>
                <p className="text-sm">
                  Cambio de abril 2025: reemplaza localhost por <code>127.0.0.1</code>
                </p>
              </div>

              <div>
                <p className="font-medium text-red-600">❌ No puedo agregar la URL en Spotify</p>
                <p className="text-sm">
                  Verifica que uses exactamente <code>http://127.0.0.1:3000/callback</code>
                </p>
              </div>

              <div>
                <p className="font-medium text-red-600">❌ La aplicación no carga</p>
                <p className="text-sm">
                  Accede a <code>http://127.0.0.1:3000</code> en lugar de localhost
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
