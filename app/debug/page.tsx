"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function DebugPage() {
  const currentHost = typeof window !== "undefined" ? window.location.hostname : "127.0.0.1"
  const currentPort = typeof window !== "undefined" ? window.location.port : "3000"
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000"

  // Determine correct redirect URI based on current environment
  let redirectUri: string
  if (currentHost === "localhost" || currentHost === "127.0.0.1") {
    redirectUri = `http://127.0.0.1:${currentPort || "3000"}/callback`
  } else {
    redirectUri = `${currentOrigin}/callback`
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const isLocalhost = currentHost === "localhost"
  const isCorrectIP = currentHost === "127.0.0.1"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("¡Copiado al portapapeles!")
  }

  const openSpotifyDashboard = () => {
    window.open("https://developer.spotify.com/dashboard", "_blank")
  }

  const openCorrectURL = () => {
    window.open("http://127.0.0.1:3000", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-slate-800 dark:text-slate-200">
                🔧 Debug de Configuración (2025)
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Diagnóstico actualizado según las nuevas reglas de Spotify
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Estado actual del acceso */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">🌐 Estado Actual del Acceso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">URL actual:</p>
                    <code className="text-sm">{currentOrigin}</code>
                  </div>
                  <div>
                    {isCorrectIP ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>

                {isLocalhost && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-red-800">
                      <strong>⚠️ Problema detectado:</strong> Estás usando <code>localhost</code>. Desde abril 2025,
                      Spotify requiere que uses <code>127.0.0.1</code> para desarrollo local.
                      <div className="mt-2">
                        <Button
                          size="sm"
                          onClick={openCorrectURL}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
                        >
                          Abrir URL Correcta
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {isCorrectIP && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-green-800">
                      <strong>✅ Perfecto:</strong> Estás usando la IP correcta para desarrollo local.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* URL de Redirección */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">📍 URL de Redirección Correcta</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Esta es la URL que debes configurar en Spotify Developer Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  <div className="font-mono text-sm bg-gray-100 p-2 rounded border">{redirectUri}</div>
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => copyToClipboard(redirectUri)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar URL de Redirección
              </Button>
            </CardContent>
          </Card>

          {/* Client ID */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">🔑 Estado del Client ID</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert
                className={
                  clientId && clientId !== "your_client_id"
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }
              >
                <AlertDescription
                  className={clientId && clientId !== "your_client_id" ? "text-green-800" : "text-red-800"}
                >
                  {clientId && clientId !== "your_client_id" ? (
                    <>
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      <strong>Client ID configurado:</strong>
                      <div className="font-mono text-sm mt-1 bg-white p-2 rounded">{clientId}</div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 inline mr-2" />
                      <strong>Client ID no configurado</strong>
                      <p className="mt-1 text-slate-700 dark:text-slate-300">
                        Necesitas configurar tu Client ID en el archivo .env.local
                      </p>
                    </>
                  )}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Instrucciones rápidas */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">⚡ Configuración Rápida</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div className="flex-1 text-slate-700 dark:text-slate-300">
                    <p className="font-medium">Abre Spotify Developer Dashboard</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={openSpotifyDashboard}
                      className="mt-1 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir Dashboard
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div className="flex-1 text-slate-700 dark:text-slate-300">
                    <p className="font-medium">Agrega esta Redirect URI:</p>
                    <div className="bg-gray-100 p-2 rounded mt-1">
                      <code className="text-sm">{redirectUri}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(redirectUri)}
                        className="ml-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div className="flex-1 text-slate-700 dark:text-slate-300">
                    <p className="font-medium">Copia tu Client ID al archivo .env.local</p>
                    <code className="text-sm bg-gray-100 p-1 rounded">NEXT_PUBLIC_SPOTIFY_CLIENT_ID=tu_client_id</code>
                  </div>
                </div>

                {isLocalhost && (
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div className="flex-1 text-slate-700 dark:text-slate-300">
                      <p className="font-medium">Accede usando la IP correcta:</p>
                      <Button
                        size="sm"
                        onClick={openCorrectURL}
                        className="mt-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
                      >
                        Ir a http://127.0.0.1:3000
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comparación de URLs */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">📊 Comparación de URLs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 border rounded bg-red-50 border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-800">❌ Ya NO funciona (2025):</p>
                      <code className="text-sm">http://localhost:3000/callback</code>
                    </div>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                </div>

                <div className="p-3 border rounded bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">✅ Correcto (2025):</p>
                      <code className="text-sm">http://127.0.0.1:3000/callback</code>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>

                <div className="p-3 border rounded bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">✅ Producción:</p>
                      <code className="text-sm">https://tu-dominio.com/callback</code>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
