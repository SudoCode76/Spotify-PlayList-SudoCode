"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Database, Users, Lock } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">🔒 Política de Privacidad</CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Spotify Playlist Manager - Última actualización: {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Información que Recopilamos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Datos de Spotify:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Información básica del perfil (nombre, email)</li>
                    <li>Lista de playlists y sus canciones</li>
                    <li>Canciones favoritas (Liked Songs)</li>
                    <li>Información de canciones (título, artista, álbum)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Datos técnicos:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Token de acceso temporal de Spotify</li>
                    <li>Información de sesión (almacenada localmente)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Cómo Usamos tu Información</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Exportación de datos</p>
                    <p className="text-sm text-muted-foreground">
                      Para generar archivos CSV con tus playlists y canciones favoritas
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Importación de datos</p>
                    <p className="text-sm text-muted-foreground">
                      Para crear playlists y agregar canciones desde archivos CSV
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Búsqueda de canciones</p>
                    <p className="text-sm text-muted-foreground">
                      Para encontrar canciones en Spotify al importar desde CSV
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Almacenamiento y Seguridad</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-600">✅ Lo que SÍ hacemos:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Procesamos datos localmente en tu navegador</li>
                    <li>• Almacenamos tokens temporalmente en tu dispositivo</li>
                    <li>• Usamos conexiones seguras (HTTPS)</li>
                    <li>• Respetamos los límites de la API de Spotify</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600">❌ Lo que NO hacemos:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• No almacenamos tus datos en nuestros servidores</li>
                    <li>• No compartimos información con terceros</li>
                    <li>• No vendemos ni monetizamos tus datos</li>
                    <li>• No accedemos a datos innecesarios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Tus Derechos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Control total:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Puedes desconectar tu cuenta en cualquier momento</li>
                    <li>Puedes revocar permisos desde tu cuenta de Spotify</li>
                    <li>Los datos locales se eliminan al cerrar sesión</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Transparencia:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Código fuente abierto y auditable</li>
                    <li>Solo solicitamos permisos necesarios</li>
                    <li>Proceso de autenticación estándar de Spotify</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📞 Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tus datos, puedes
                contactarnos a través de:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-4">
                <li>GitHub: [Tu repositorio]</li>
                <li>Email: [Tu email de contacto]</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔄 Cambios a esta Política</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Nos reservamos el derecho de actualizar esta política de privacidad. Los cambios importantes serán
                notificados en la aplicación. El uso continuado de la aplicación después de los cambios constituye la
                aceptación de la nueva política.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
