"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Music, Loader2, CheckCircle, XCircle } from "lucide-react"

export default function SpotifyCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("Callback started")
        console.log("Current URL:", window.location.href)
        console.log("Hash:", window.location.hash)

        // Get the hash from URL
        const hash = window.location.hash.substring(1)
        console.log("Parsed hash:", hash)

        if (!hash) {
          console.log("No hash found in URL")
          setStatus("error")
          setMessage("No se encontraron parámetros de autenticación en la URL")
          return
        }

        const params = new URLSearchParams(hash)
        console.log("Parsed params:", Object.fromEntries(params))

        const accessToken = params.get("access_token")
        const error = params.get("error")
        const errorDescription = params.get("error_description")

        console.log("Access token:", accessToken ? "Present" : "Missing")
        console.log("Error:", error)
        console.log("Error description:", errorDescription)

        if (error) {
          console.log("OAuth error detected:", error, errorDescription)
          setStatus("error")
          setMessage(errorDescription || "Error de autenticación con Spotify")
          return
        }

        if (!accessToken) {
          console.log("No access token found")
          setStatus("error")
          setMessage("No se recibió el token de acceso")
          return
        }

        console.log("Validating token with Spotify API...")

        // Validate token by fetching user profile with timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        console.log("Spotify API response status:", response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.log("Spotify API error:", errorText)
          throw new Error(`Token inválido: ${response.status}`)
        }

        const userData = await response.json()

        // Store token and user data in localStorage
        localStorage.setItem("spotify_access_token", accessToken)
        localStorage.setItem("spotify_user", JSON.stringify(userData))
        localStorage.setItem("spotify_token_timestamp", Date.now().toString())

        setStatus("success")
        setMessage(`¡Bienvenido, ${userData.display_name}!`)

        // Redirect to main page after 2 seconds
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } catch (error) {
        console.error("Callback error details:", error)
        setStatus("error")
        if (error.name === "AbortError") {
          setMessage("Timeout al validar con Spotify. Intenta de nuevo.")
        } else {
          setMessage(`Error al procesar la autenticación: ${error.message}`)
        }
      }
    }

    handleCallback()
  }, [router])

  const handleRetry = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const redirectUri = encodeURIComponent(`${window.location.origin}/callback`)
    const scopes = encodeURIComponent(
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify",
    )

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`
    window.location.href = authUrl
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
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
    </div>
  )
}
