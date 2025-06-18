"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, RefreshCw } from "lucide-react"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🧪 Test de Autenticación Spotify</CardTitle>
            <CardDescription>
              Herramienta de diagnóstico para verificar la configuración antes de autenticar
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>🔧 Controles de Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={testSpotifyAuth} disabled={testing} className="w-full bg-blue-500 hover:bg-blue-600">
                {testing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : "🔍"}
                Test Configuración
              </Button>

              <Button onClick={testSpotifyConnection} variant="outline" className="w-full">
                🔗 Test Conexión API
              </Button>

              <Button onClick={clearLogs} variant="outline" className="w-full">
                🗑️ Limpiar Logs
              </Button>

              <Button onClick={copyLogs} variant="outline" className="w-full" disabled={logs.length === 0}>
                <Copy className="w-4 h-4 mr-2" />
                Copiar Logs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚡ Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={proceedToAuth} className="w-full bg-green-500 hover:bg-green-600">
                🚀 Proceder a Autenticación
              </Button>

              <Button
                onClick={() => window.open("http://127.0.0.1:3000", "_blank")}
                variant="outline"
                className="w-full"
              >
                🌐 Abrir en 127.0.0.1
              </Button>

              <Button onClick={() => window.open("/debug", "_blank")} variant="outline" className="w-full">
                🔧 Ver Debug Completo
              </Button>

              <Button onClick={() => window.open("/setup-guide", "_blank")} variant="outline" className="w-full">
                📖 Ver Guía de Setup
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>📋 Logs de Diagnóstico</CardTitle>
            <CardDescription>
              {logs.length === 0 ? "Ejecuta un test para ver los resultados" : `${logs.length} entradas`}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          <AlertDescription>
            <strong>💡 Consejo:</strong> Si encuentras errores, usa esta información para configurar correctamente tu
            aplicación de Spotify. Los logs te ayudarán a identificar exactamente qué está fallando.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
