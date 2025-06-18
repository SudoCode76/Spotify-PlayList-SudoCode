"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Music, XCircle, Home } from "lucide-react"

export default function AuthError() {
  const [errorDetails, setErrorDetails] = useState<{
    error: string | null
    description: string | null
  }>({ error: null, description: null })

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")

    setErrorDetails({
      error: error,
      description: errorDescription,
    })
  }, [searchParams])

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

  const getErrorMessage = () => {
    switch (errorDetails.error) {
      case "access_denied":
        return "Has cancelado la autorización. Necesitamos permisos para acceder a tus playlists de Spotify."
      case "invalid_client":
        return "Error de configuración de la aplicación. Por favor contacta al administrador."
      case "invalid_request":
        return "Solicitud inválida. Por favor intenta de nuevo."
      case "unauthorized_client":
        return "Cliente no autorizado. Verifica la configuración de la aplicación."
      case "unsupported_response_type":
        return "Tipo de respuesta no soportado."
      case "invalid_scope":
        return "Permisos solicitados inválidos."
      default:
        return errorDetails.description || "Error desconocido durante la autenticación."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-white" />
          </div>

          <CardTitle className="text-2xl text-red-800">Error de Autenticación</CardTitle>

          <CardDescription>No se pudo completar la conexión con Spotify</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              <strong>Error:</strong> {errorDetails.error}
              <br />
              {getErrorMessage()}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button onClick={handleRetry} className="w-full bg-green-500 hover:bg-green-600">
              <Music className="w-4 h-4 mr-2" />
              Intentar Conectar de Nuevo
            </Button>
            <Button onClick={handleGoHome} variant="outline" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>¿Necesitas ayuda?</p>
            <p>Asegúrate de que:</p>
            <ul className="text-left mt-2 space-y-1">
              <li>• Aceptas todos los permisos solicitados</li>
              <li>• Tu cuenta de Spotify está activa</li>
              <li>• Tienes conexión a internet estable</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
