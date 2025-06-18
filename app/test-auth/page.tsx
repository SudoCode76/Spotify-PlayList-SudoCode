"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, RefreshCw, ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function TestAuth() {
  const [logs, setLogs] = useState<string[]>([])
  const [testing, setTesting] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`])
  }

  const clearLogs = () => {
    setLogs([])
  }

  const testSpotifyAuth = () => {
    setTesting(true)
    clearLogs()

    addLog("🔍 Iniciando test de autenticación...")

    // Test 1: Check environment
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    addLog(
      `📋 Client ID: ${clientId ? (clientId.length > 10 ? clientId.substring(0, 10) + "..." : clientId) : "❌ NO CONFIGURADO"}`,
    )

    // Test 2: Check current URL
    const currentUrl = window.location.href
    const currentHost = window.location.hostname
    const currentPort = window.location.port

    addLog(`🌐 URL actual: ${currentUrl}`)
    addLog(`🏠 Host: ${currentHost}`)
    addLog(`🔌 Puerto: ${currentPort}`)

    // Test 3: Generate redirect URI
    let redirectUri: string
    if (currentHost === "localhost" || currentHost === "127.0.0.1") {
      redirectUri = `http://127.0.0.1:${currentPort || "3000"}/callback`
    } else {
      redirectUri = `${window.location.origin}/callback`
    }

    addLog(`📍 Redirect URI generada: ${redirectUri}`)

    // Test 4: Check if using correct IP
    if (currentHost === "localhost") {
      addLog("⚠️ ADVERTENCIA: Usando localhost. Spotify requiere 127.0.0.1")
    } else if (currentHost === "127.0.0.1") {
      addLog("✅ Usando IP correcta (127.0.0.1)")
    } else {
      addLog(`🌍 Entorno de producción detectado: ${currentHost}`)
    }

    // Test 5: Generate auth URL
    const encodedRedirectUri = encodeURIComponent(redirectUri)
    const scopes = encodeURIComponent(
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify",
    )

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodedRedirectUri}&scope=${scopes}`

    addLog(`🔗 URL de autenticación generada`)
    addLog(`📝 Longitud de URL: ${authUrl.length} caracteres`)

    // Test 6: Validate configuration
    if (!clientId || clientId === "your_client_id") {
      addLog("❌ ERROR: Client ID no configurado correctamente")
    } else {
      addLog("✅ Client ID configurado")
    }

    if (currentHost === "localhost") {
      addLog("❌ ERROR: Debes usar 127.0.0.1 en lugar de localhost")
    } else {
      addLog("✅ Host correcto")
    }

    addLog("🏁 Test completado")
    setTesting(false)
  }

  const testSpotifyConnection = async () => {
    addLog("🔗 Probando conexión con Spotify API...")

    try {
      const response = await fetch("https://api.spotify.com/v1/", {
        method: "GET",
      })

      addLog(`📡 Respuesta de Spotify API: ${response.status}`)

      if (response.status === 401) {
        addLog("✅ Spotify API responde correctamente (401 esperado sin token)")
      } else {
        addLog(`ℹ️ Respuesta inesperada: ${response.status}`)
      }
    } catch (error) {
      addLog(`❌ Error de conexión: ${error.message}`)
    }
  }

  const testFullAuthFlow = () => {
    addLog("🚀 Iniciando test completo de autenticación...")

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const currentHost = window.location.hostname
    const currentPort = window.location.port

    if (!clientId || clientId === "your_client_id") {
      addLog("❌ ERROR: Client ID no configurado")
      return
    }

    if (currentHost === "localhost") {
      addLog("❌ ERROR: Debes usar 127.0.0.1")
      return
    }

    // Generate the exact same URL as the main app
    const redirectUri = `http://127.0.0.1:${currentPort || "3000"}/callback`
    const encodedRedirectUri = encodeURIComponent(redirectUri)
    const scopes = encodeURIComponent(
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify",
    )

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodedRedirectUri}&scope=${scopes}`

    addLog(`🔗 Redirigiendo a Spotify...`)
    addLog(`📍 Redirect URI: ${redirectUri}`)
    addLog(`🆔 Client ID: ${clientId}`)

    // Open in same window to test the full flow
    window.location.href = authUrl
  }

  const proceedToAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const currentHost = window.location.hostname
    const currentPort = window.location.port

    if (!clientId || clientId === "your_client_id") {
      alert("❌ Configura tu Client ID primero")
      return
    }

    if (currentHost === "localhost") {
      alert("❌ Debes acceder desde http://127.0.0.1:3000")
      return
    }

    // Redirect to main page to start auth
    window.location.href = "/"
  }

  const copyLogs = () => {
    const logText = logs.join("\n")
    navigator.clipboard.writeText(logText)
    alert("Logs copiados al portapapeles")
  }

  const openSpotifyDashboard = () => {
    window.open("https://developer.spotify.com/dashboard", "_blank")
  }

  const checkSpotifySettings = () => {
    addLog("🔍 Verificando configuración de Spotify Dashboard...")

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const redirectUri = `http://127.0.0.1:3000/callback`

    addLog(`📋 Tu Client ID: ${clientId}`)
    addLog(`📍 Redirect URI que debe estar en Spotify: ${redirectUri}`)
    addLog(`🌐 Ve a: https://developer.spotify.com/dashboard`)
    addLog(`📝 En tu app → Settings → Redirect URIs`)
    addLog(`✅ Debe contener exactamente: ${redirectUri}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-violet-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-slate-800 dark:text-slate-200">
                🧪 Test de Autenticación Spotify
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Herramienta de diagnóstico para verificar la configuración antes de autenticar
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-200">🔧 Tests de Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
                <Button
                  onClick={testSpotifyAuth}
                  disabled={testing}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
                >
                  {testing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : "🔍"}
                  Test Configuración
                </Button>

                <Button
                  onClick={testSpotifyConnection}
                  variant="outline"
                  className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  🔗 Test Conexión API
                </Button>

                <Button
                  onClick={checkSpotifySettings}
                  variant="outline"
                  className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  🔍 Verificar Settings Spotify
                </Button>

                <Button
                  onClick={clearLogs}
                  variant="outline"
                  className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  🗑️ Limpiar Logs
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-200">🚀 Tests de Autenticación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
                <Button
                  onClick={testFullAuthFlow}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
                >
                  🧪 Test Flujo Completo
                </Button>

                <Button
                  onClick={proceedToAuth}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
                >
                  🚀 Ir a App Principal
                </Button>

                <Button
                  onClick={openSpotifyDashboard}
                  variant="outline"
                  className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Spotify Dashboard
                </Button>

                <Button
                  onClick={copyLogs}
                  variant="outline"
                  className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  disabled={logs.length === 0}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Logs
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-200">📋 Logs de Diagnóstico</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                {logs.length === 0 ? "Ejecuta un test para ver los resultados" : `${logs.length} entradas`}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-700 dark:text-slate-300">
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="text-gray-500">Esperando resultados del test...</div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="mb-1">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription className="text-slate-700 dark:text-slate-300">
              <strong>💡 Siguiente paso:</strong> Haz clic en "Test Flujo Completo" para probar la autenticación real
              con Spotify. Esto te llevará directamente al proceso de OAuth.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
