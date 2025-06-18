"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("spotify_access_token")
      const tokenTimestamp = localStorage.getItem("spotify_token_timestamp")

      if (token && tokenTimestamp) {
        const tokenAge = Date.now() - Number.parseInt(tokenTimestamp)
        const oneHour = 60 * 60 * 1000

        if (tokenAge < oneHour) {
          setIsAuthenticated(true)
        } else {
          // Token expired
          localStorage.removeItem("spotify_access_token")
          localStorage.removeItem("spotify_user")
          localStorage.removeItem("spotify_token_timestamp")
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [])

  if (isChecking) {
    return (
      fallback || (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
              <CardTitle>Verificando autenticación...</CardTitle>
              <CardDescription>Por favor espera</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
