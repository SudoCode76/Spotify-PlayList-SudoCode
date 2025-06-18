"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Music, Loader2, CheckCircle, XCircle, Copy } from "lucide-react"

export default function SpotifyCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const router = useRouter()

  const addDebug = (info: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setDebugInfo((prev) => [...prev, `[${timestamp}] ${info}`])
    console.log(`[CALLBACK DEBUG] ${info}`)
  }

  useEffect(() => {
    const handleCallback = async () => {
      try {
        addDebug("🚀 Callback iniciado")
        addDebug(`📍 URL actual: ${window.location.href}`)
        addDebug(`🔗 Hash completo: "${window.location.hash}"`)
        addDebug(`📊 Longitud del hash: ${window.location.hash.length}`)

        // Get the hash from URL
        const hash = window.location.hash.substring(1)
        addDebug(`🔍 Hash procesado: "${hash}"`)

        if (!hash) {
          addDebug("❌ No se encontró hash en la URL")
          addDebug("🔍 Verificando si hay parámetros en query string...")

          const urlParams = new URLSearchParams(window.location.search)
          const error = urlParams.get("error")
          const errorDescription = urlParams.get("error_description")

          if (error) {
            addDebug(`❌ Error en query params: ${error}`)
            addDebug(`📝 Descripción: ${errorDescription}`)
            setStatus("error")
            setMessage(`Error de Spotify: ${errorDescription || error}`)
            return
          }

          setStatus("error")
          setMessage(
            "No se encontraron parámetros de autenticación en la URL. Verifica la configuración de Redirect URI en Spotify.",
          )
          return
        }

        const params = new URLSearchParams(hash)
        addDebug(`📋 Parámetros encontrados: ${Array.from(params.keys()).join(", ")}`)

        const accessToken = params.get("access_token")
        const tokenType = params.get("token_type")
        const expiresIn = params.get("expires_in")
        const error = params.get("error")
        const errorDescription = params.get("error_description")

        addDebug(`🔑 Access token: ${accessToken ? "✅ Presente" : "❌ Ausente"}`)
        addDebug(`🏷️ Token type: ${tokenType || "No especificado"}`)
        addDebug(`⏰ Expires in: ${expiresIn || "No especificado"} segundos`)
        addDebug(`❌ Error: ${error || "Ninguno"}`)

        if (error) {
          addDebug(`❌ Error OAuth detectado: ${error}`)
          addDebug(`📝 Descripción del error: ${errorDescription}`)
          setStatus("error")
          setMessage(`Error de Spotify: ${errorDescription || error}`)
          return
        }

        if (!accessToken) {
          addDebug("❌ No se recibió access token")
          setStatus("error")
          setMessage("No se recibió el token de acceso de Spotify")
          return
        }

        addDebug(`✅ Token recibido: ${accessToken.substring(0, 20)}...`)
        addDebug("🔍 Validando token con Spotify API...")

        // Validate token by fetching user profile with timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => {
          addDebug("⏰ Timeout de 10 segundos alcanzado")
          controller.abort()
        }, 10000)

        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
        addDebug(`📡 Respuesta de Spotify API: ${response.status} ${response.statusText}`)

        if (!response.ok) {
          const errorText = await response.text()
          addDebug(`❌ Error de API: ${errorText}`)
          throw new Error(`Token inválido: ${response.status} - ${errorText}`)
        }

        const userData = await response.json()
        addDebug(`👤 Usuario obtenido: ${userData.display_name} (${userData.id})`)

        // Store token and user data in localStorage
        localStorage.setItem("spotify_access_token", accessToken)
        localStorage.setItem("spotify_user", JSON.stringify(userData))
        localStorage.setItem("spotify_token_timestamp", Date.now().toString())

        addDebug("💾 Datos guardados en localStorage")

        setStatus("success")
        setMessage(`¡Bienvenido, ${userData.display_name}!`)

        addDebug("✅ Autenticación completada exitosamente")
        addDebug("🔄 Redirigiendo en 3 segundos...")

        // Redirect to main page after 3 seconds
        setTimeout(() => {
          router.push("/")
        }, 3000)
      } catch (error) {
        addDebug(`💥 Error capturado: ${error.name}`)
        addDebug(`📝 Mensaje de error: ${error.message}`)
        addDebug(`📚 Stack trace: ${error.stack}`)

        setStatus("error")
        if (error.name === "AbortError") {
          setMessage("Timeout al validar con Spotify. La conexión tardó demasiado.")
        } else {
          setMessage(`Error al procesar la autenticación: ${error.message}`)
        }
      }
    }

    handleCallback()
  }, [router])

  const handleRetry = () => {
    addDebug("🔄 Reintentando autenticación...")
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const redirectUri = encodeURIComponent(`${window.location.origin}/callback`)
    const scopes = encodeURIComponent(
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify",
    )

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`
    addDebug(`🔗 Nueva URL de auth: ${authUrl}`)
    window.location.href = authUrl
  }

  const handleGoHome = () => {
    router.push("/")
  }

  const copyDebugInfo = () => {
    const debugText = debugInfo.join("\n")
    navigator.clipboard.writeText(debugText)
    alert("Información de debug copiada al portapapeles")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
              {status === "loading" && (
                <div className="bg-blue-500 w-full h-full rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
              {status === "success" && (
                <div className="bg-green-500 w-full h-full rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-500 w-full h-full rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
              )}
            </div>

            <CardTitle className="text-2xl">
              {status === "loading" && "Conectando con Spotify..."}
              {status === "success" && "¡Conexión Exitosa!"}
              {status === "error" && "Error de Conexión"}
            </CardTitle>

            <CardDescription>
              {status === "loading" && "Procesando tu autenticación"}
              {status === "success" && "Redirigiendo a la aplicación..."}
              {status === "error" && "Hubo un problema con la autenticación"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {message && (
              <Alert className={status === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                <AlertDescription className={status === "error" ? "text-red-800" : "text-green-800"}>
                  {message}
                </AlertDescription>
              </Alert>
            )}

            {status === "success" && (
              <div className="text-center">
                <div className="animate-pulse text-sm text-muted-foreground">Redirigiendo automáticamente...</div>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-2">
                <Button onClick={handleRetry} className="w-full bg-green-500 hover:bg-green-600">
                  <Music className="w-4 h-4 mr-2" />
                  Intentar de Nuevo
                </Button>
                <Button onClick={handleGoHome} variant="outline" className="w-full">
                  Volver al Inicio
                </Button>
              </div>
            )}

            {status === "loading" && (
              <div className="flex justify-center">
                <div className="animate-pulse text-sm text-muted-foreground">Por favor espera...</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Debug Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              🔍 Información de Debug
              <Button onClick={copyDebugInfo} size="sm" variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </CardTitle>
            <CardDescription>Información técnica del proceso de autenticación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
              {debugInfo.length === 0 ? (
                <div className="text-gray-500">Iniciando proceso...</div>
              ) : (
                debugInfo.map((info, index) => (
                  <div key={index} className="mb-1">
                    {info}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
