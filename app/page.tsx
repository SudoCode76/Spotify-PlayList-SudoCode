"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Music, Download, Upload, Heart, List, User, LogOut, Users2, Eye, CheckCircle } from "lucide-react"

interface SpotifyUser {
  id: string
  display_name: string
  images: { url: string }[]
  email?: string
}

interface Playlist {
  id: string
  name: string
  tracks: { total: number }
  owner: { display_name: string }
}

interface Track {
  name: string
  artist: string
  album: string
  duration_ms: number
  spotify_id: string
  added_at: string
  playlist_name?: string
}

interface Artist {
  id: string
  name: string
  genres: string[]
  followers: number
  popularity: number
  external_urls: { spotify: string }
}

interface ExportStats {
  playlists: number
  tracks: number
  artists: number
  likedSongs: number
  followedArtists: number
}

export default function SpotifyPlaylistManager() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<SpotifyUser | null>(null)
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [exportStats, setExportStats] = useState<ExportStats | null>(null)
  const [showExportPreview, setShowExportPreview] = useState(false)
  const [currentExportItem, setCurrentExportItem] = useState("")

  useEffect(() => {
    // Check for stored token first
    const storedToken = localStorage.getItem("spotify_access_token")
    const storedUser = localStorage.getItem("spotify_user")
    const tokenTimestamp = localStorage.getItem("spotify_token_timestamp")

    if (storedToken && storedUser && tokenTimestamp) {
      // Check if token is still valid (Spotify tokens expire after 1 hour)
      const tokenAge = Date.now() - Number.parseInt(tokenTimestamp)
      const oneHour = 60 * 60 * 1000

      if (tokenAge < oneHour) {
        setAccessToken(storedToken)
        setUser(JSON.parse(storedUser))
        fetchPlaylists(storedToken)
        return
      } else {
        // Token expired, clear storage
        localStorage.removeItem("spotify_access_token")
        localStorage.removeItem("spotify_user")
        localStorage.removeItem("spotify_token_timestamp")
      }
    }

    // Check for access token in URL hash (fallback for direct access)
    const hash = window.location.hash
    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1]
      if (token) {
        setAccessToken(token)
        window.location.hash = ""
        fetchUserProfile(token)
      }
    }
  }, [])

  // Updated loginToSpotify function to use Authorization Code Flow
  const loginToSpotify = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "your_client_id"

    console.log("=== SPOTIFY LOGIN DEBUG ===")
    console.log("Client ID:", clientId)
    console.log("Current location:", window.location.href)

    // Use 127.0.0.1 instead of localhost as per new Spotify requirements
    const currentHost = window.location.hostname
    const currentPort = window.location.port

    console.log("Current host:", currentHost)
    console.log("Current port:", currentPort)

    // Determine the correct redirect URI based on environment
    let redirectUri: string
    if (currentHost === "localhost" || currentHost === "127.0.0.1") {
      // For local development, use 127.0.0.1
      redirectUri = `http://127.0.0.1:${currentPort || "3000"}/callback`
    } else {
      // For production, use the current origin
      redirectUri = `${window.location.origin}/callback`
    }

    console.log("Redirect URI:", redirectUri)

    const encodedRedirectUri = encodeURIComponent(redirectUri)
    const scopes = encodeURIComponent(
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-follow-read",
    )

    // Use Authorization Code Flow with show_dialog=true for better UX
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=${scopes}&show_dialog=true`

    console.log("=== SPOTIFY AUTH URL ===")
    console.log("Full URL:", authUrl)
    console.log("Response Type: code (Authorization Code Flow)")
    console.log("Encoded Redirect URI:", encodedRedirectUri)
    console.log("Show Dialog: true (forces login screen)")
    console.log("========================")

    // Validate client ID before redirecting
    if (!clientId || clientId === "your_client_id") {
      alert("Error: Client ID no configurado. Revisa tu archivo .env.local")
      return
    }

    window.location.href = authUrl
  }

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const userData = await response.json()
      setUser(userData)
      fetchPlaylists(token)

      // Store in localStorage
      localStorage.setItem("spotify_access_token", token)
      localStorage.setItem("spotify_user", JSON.stringify(userData))
      localStorage.setItem("spotify_token_timestamp", Date.now().toString())
    } catch (error) {
      setMessage("Error al obtener perfil de usuario")
    }
  }

  const fetchPlaylists = async (token: string) => {
    try {
      setLoading(true)
      const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setPlaylists(data.items || [])
    } catch (error) {
      setMessage("Error al obtener playlists")
    } finally {
      setLoading(false)
    }
  }

  const fetchPlaylistTracks = async (playlistId: string, playlistName: string): Promise<Track[]> => {
    const tracks: Track[] = []
    let offset = 0
    const limit = 100

    while (true) {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
      const data = await response.json()

      if (!data.items || data.items.length === 0) break

      data.items.forEach((item: any) => {
        if (item.track && item.track.name) {
          tracks.push({
            name: item.track.name,
            artist: item.track.artists.map((a: any) => a.name).join(", "),
            album: item.track.album.name,
            duration_ms: item.track.duration_ms,
            spotify_id: item.track.id,
            added_at: item.added_at,
            playlist_name: playlistName,
          })
        }
      })

      offset += limit
      if (data.items.length < limit) break
    }

    return tracks
  }

  const fetchLikedSongs = async (): Promise<Track[]> => {
    const tracks: Track[] = []
    let offset = 0
    const limit = 50

    while (true) {
      const response = await fetch(`https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const data = await response.json()

      if (!data.items || data.items.length === 0) break

      data.items.forEach((item: any) => {
        if (item.track && item.track.name) {
          tracks.push({
            name: item.track.name,
            artist: item.track.artists.map((a: any) => a.name).join(", "),
            album: item.track.album.name,
            duration_ms: item.track.duration_ms,
            spotify_id: item.track.id,
            added_at: item.added_at,
            playlist_name: "Liked Songs",
          })
        }
      })

      offset += limit
      if (data.items.length < limit) break
    }

    return tracks
  }

  const fetchFollowedArtists = async (): Promise<Artist[]> => {
    const artists: Artist[] = []
    let after = ""
    const limit = 50

    while (true) {
      const url = after
        ? `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}&after=${after}`
        : `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}`

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const data = await response.json()

      if (!data.artists || !data.artists.items || data.artists.items.length === 0) break

      data.artists.items.forEach((artist: any) => {
        artists.push({
          id: artist.id,
          name: artist.name,
          genres: artist.genres || [],
          followers: artist.followers?.total || 0,
          popularity: artist.popularity || 0,
          external_urls: artist.external_urls || { spotify: "" },
        })
      })

      if (data.artists.items.length < limit) break
      after = data.artists.cursors?.after
      if (!after) break
    }

    return artists
  }

  const previewExport = async () => {
    if (!accessToken) return

    try {
      setLoading(true)
      setShowExportPreview(true)
      setMessage("Analizando contenido para exportar...")
      setProgress(0)

      // Count liked songs
      setCurrentExportItem("Contando canciones favoritas...")
      const likedSongs = await fetchLikedSongs()
      setProgress(20)

      // Count playlist tracks
      let totalTracks = likedSongs.length
      setCurrentExportItem("Contando canciones en playlists...")
      for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i]
        totalTracks += playlist.tracks.total
        setProgress(20 + ((i + 1) / playlists.length) * 40)
      }

      // Count followed artists
      setCurrentExportItem("Contando artistas seguidos...")
      const followedArtists = await fetchFollowedArtists()
      setProgress(80)

      // Get unique artists from tracks
      setCurrentExportItem("Analizando artistas únicos...")
      const uniqueArtists = new Set<string>()

      // Add artists from liked songs
      likedSongs.forEach((track) => {
        track.artist.split(", ").forEach((artist) => uniqueArtists.add(artist.trim()))
      })

      // Add artists from playlists (estimate)
      playlists.forEach((playlist) => {
        // Estimate 2-3 unique artists per 5 tracks
        const estimatedArtists = Math.floor(playlist.tracks.total * 0.5)
        for (let i = 0; i < estimatedArtists; i++) {
          uniqueArtists.add(`artist_${playlist.id}_${i}`)
        }
      })

      setProgress(100)

      const stats: ExportStats = {
        playlists: playlists.length,
        tracks: totalTracks,
        artists: uniqueArtists.size,
        likedSongs: likedSongs.length,
        followedArtists: followedArtists.length,
      }

      setExportStats(stats)
      setCurrentExportItem("Análisis completado")
      setMessage("Vista previa de exportación lista")
    } catch (error) {
      setMessage("Error al analizar contenido")
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const exportToCSV = async () => {
    if (!accessToken) return

    try {
      setLoading(true)
      setMessage("Exportando contenido...")
      setProgress(0)

      const allTracks: Track[] = []
      const allArtists: Artist[] = []
      const uniqueArtistNames = new Set<string>()

      // Export liked songs
      setCurrentExportItem("Exportando canciones favoritas...")
      const likedSongs = await fetchLikedSongs()
      allTracks.push(...likedSongs)

      // Collect artists from liked songs
      likedSongs.forEach((track) => {
        track.artist.split(", ").forEach((artist) => uniqueArtistNames.add(artist.trim()))
      })
      setProgress(15)

      // Export playlists
      for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i]
        setCurrentExportItem(`Exportando playlist: ${playlist.name}`)
        const tracks = await fetchPlaylistTracks(playlist.id, playlist.name)
        allTracks.push(...tracks)

        // Collect artists from playlist tracks
        tracks.forEach((track) => {
          track.artist.split(", ").forEach((artist) => uniqueArtistNames.add(artist.trim()))
        })

        setProgress(15 + ((i + 1) / playlists.length) * 60)
      }

      // Export followed artists
      setCurrentExportItem("Exportando artistas seguidos...")
      const followedArtists = await fetchFollowedArtists()
      allArtists.push(...followedArtists)
      setProgress(85)

      // Create unified CSV with all data
      setCurrentExportItem("Generando archivo unificado...")
      const unifiedCSVHeader =
        "Type,Playlist,Song,Artist,Album,Duration (ms),Spotify ID,Added At,Genres,Followers,Popularity,Spotify URL\n"

      const unifiedCSVContent = [
        // Add all tracks
        ...allTracks.map(
          (track) =>
            `"Track","${track.playlist_name}","${track.name}","${track.artist}","${track.album}",${track.duration_ms},"${track.spotify_id}","${track.added_at}","","","",""`,
        ),
        // Add followed artists
        ...followedArtists.map(
          (artist) =>
            `"Followed Artist","","","${artist.name}","","","","","${artist.genres.join("; ")}",${artist.followers},${artist.popularity},"${artist.external_urls.spotify}"`,
        ),
        // Add unique artists from tracks
        ...Array.from(uniqueArtistNames)
          .filter((artistName) => !followedArtists.some((fa) => fa.name === artistName)) // Avoid duplicates
          .map((artistName) => `"Track Artist","","","${artistName}","","","","","","","",""`),
      ].join("\n")

      setProgress(95)

      // Download unified CSV
      const unifiedBlob = new Blob([unifiedCSVHeader + unifiedCSVContent], { type: "text/csv;charset=utf-8;" })
      const unifiedLink = document.createElement("a")
      unifiedLink.href = URL.createObjectURL(unifiedBlob)
      unifiedLink.download = `spotify_complete_export_${user?.display_name || "user"}_${new Date().toISOString().split("T")[0]}.csv`
      unifiedLink.click()

      setProgress(100)
      setCurrentExportItem("Exportación completada")
      setMessage(
        `Exportación completada: ${allTracks.length} canciones y ${followedArtists.length + uniqueArtistNames.size} artistas exportados en un solo archivo`,
      )
    } catch (error) {
      setMessage("Error durante la exportación")
    } finally {
      setLoading(false)
      setProgress(0)
      setCurrentExportItem("")
    }
  }

  const searchTrack = async (trackName: string, artist: string): Promise<string | null> => {
    try {
      const query = encodeURIComponent(`track:"${trackName}" artist:"${artist}"`)
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const data = await response.json()

      if (data.tracks && data.tracks.items.length > 0) {
        return data.tracks.items[0].id
      }
      return null
    } catch (error) {
      return null
    }
  }

  const createPlaylist = async (name: string): Promise<string | null> => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${user?.id}/playlists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: "Imported from CSV via Spotify Playlist Manager",
          public: false,
        }),
      })
      const data = await response.json()
      return data.id
    } catch (error) {
      return null
    }
  }

  const addTracksToPlaylist = async (playlistId: string, trackIds: string[]) => {
    const batchSize = 100
    for (let i = 0; i < trackIds.length; i += batchSize) {
      const batch = trackIds.slice(i, i + batchSize)
      const uris = batch.map((id) => `spotify:track:${id}`)

      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris }),
      })
    }
  }

  const addToLikedSongs = async (trackIds: string[]) => {
    const batchSize = 50
    for (let i = 0; i < trackIds.length; i += batchSize) {
      const batch = trackIds.slice(i, i + batchSize)

      await fetch("https://api.spotify.com/v1/me/tracks", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: batch }),
      })
    }
  }

  const importFromCSV = async () => {
    if (!selectedFile || !accessToken) return

    try {
      setLoading(true)
      setMessage("Leyendo archivo CSV...")
      setProgress(0)

      const text = await selectedFile.text()
      const lines = text.split("\n").slice(1) // Skip header
      const tracks: { [key: string]: Track[] } = {}

      // Parse CSV
      lines.forEach((line) => {
        if (line.trim()) {
          const matches = line.match(/^"([^"]*?)","([^"]*?)","([^"]*?)","([^"]*?)",(\d+),"([^"]*?)","([^"]*?)"$/)
          if (matches) {
            const [, playlistName, name, artist, album, duration, spotifyId, addedAt] = matches
            if (!tracks[playlistName]) tracks[playlistName] = []
            tracks[playlistName].push({
              name,
              artist,
              album,
              duration_ms: Number.parseInt(duration),
              spotify_id: spotifyId,
              added_at: addedAt,
              playlist_name: playlistName,
            })
          }
        }
      })

      let processedTracks = 0
      const totalTracks = Object.values(tracks).flat().length

      // Process each playlist
      for (const [playlistName, playlistTracks] of Object.entries(tracks)) {
        setMessage(`Procesando: ${playlistName}`)

        const foundTrackIds: string[] = []

        // Search for tracks
        for (const track of playlistTracks) {
          const trackId = await searchTrack(track.name, track.artist)
          if (trackId) {
            foundTrackIds.push(trackId)
          }
          processedTracks++
          setProgress((processedTracks / totalTracks) * 100)
        }

        if (foundTrackIds.length > 0) {
          if (playlistName === "Liked Songs") {
            await addToLikedSongs(foundTrackIds)
          } else {
            const playlistId = await createPlaylist(playlistName)
            if (playlistId) {
              await addTracksToPlaylist(playlistId, foundTrackIds)
            }
          }
        }
      }

      setMessage(`Importación completada: ${processedTracks} canciones procesadas`)
      fetchPlaylists(accessToken) // Refresh playlists
    } catch (error) {
      setMessage("Error durante la importación")
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
    setPlaylists([])
    setMessage("")
    setExportStats(null)
    setShowExportPreview(false)

    // Clear stored data
    localStorage.removeItem("spotify_access_token")
    localStorage.removeItem("spotify_user")
    localStorage.removeItem("spotify_token_timestamp")
  }

  if (!accessToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Spotify Playlist Manager</CardTitle>
              <CardDescription>Exporta e importa tus playlists de Spotify con archivos CSV</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={loginToSpotify} className="w-full bg-green-500 hover:bg-green-600">
                <Music className="w-4 h-4 mr-2" />
                Conectar con Spotify
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Spotify Playlist Manager</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Conectado como {user?.display_name}</span>
                    {user?.email && (
                      <>
                        <span>•</span>
                        <span className="text-xs">{user.email}</span>
                      </>
                    )}
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Desconectar
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <List className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{playlists.length}</p>
                  <p className="text-sm text-muted-foreground">Playlists</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">♥</p>
                  <p className="text-sm text-muted-foreground">Canciones favoritas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Music className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {playlists.reduce((total, playlist) => total + playlist.tracks.total, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total canciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users2 className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">?</p>
                  <p className="text-sm text-muted-foreground">Artistas seguidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Preview */}
        {showExportPreview && exportStats && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Vista Previa de Exportación</span>
              </CardTitle>
              <CardDescription>Esto es lo que se exportará en los archivos CSV</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{exportStats.playlists}</p>
                  <p className="text-sm text-muted-foreground">Playlists</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{exportStats.tracks}</p>
                  <p className="text-sm text-muted-foreground">Canciones totales</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{exportStats.likedSongs}</p>
                  <p className="text-sm text-muted-foreground">Canciones favoritas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{exportStats.followedArtists}</p>
                  <p className="text-sm text-muted-foreground">Artistas seguidos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{exportStats.artists}</p>
                  <p className="text-sm text-muted-foreground">Artistas únicos</p>
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50 mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-800">
                  <strong>Se generará 1 archivo unificado:</strong>
                  <br />• <strong>spotify_complete_export_[usuario]_[fecha].csv</strong> - Todas las canciones y
                  artistas en un solo archivo
                  <br />• Columna "Type" indica si es "Track", "Followed Artist" o "Track Artist"
                </AlertDescription>
              </Alert>

              <div className="flex space-x-2">
                <Button onClick={exportToCSV} disabled={loading} className="bg-green-500 hover:bg-green-600">
                  <Download className="w-4 h-4 mr-2" />
                  Confirmar Exportación
                </Button>
                <Button onClick={() => setShowExportPreview(false)} variant="outline">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Exportar Contenido</span>
            </CardTitle>
            <CardDescription>
              Descarga todas tus playlists, canciones favoritas y artistas en formato CSV
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showExportPreview ? (
              <Button onClick={previewExport} disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600">
                <Eye className="w-4 h-4 mr-2" />
                Ver Qué Se Exportará
              </Button>
            ) : (
              <Button onClick={exportToCSV} disabled={loading} className="w-full bg-green-500 hover:bg-green-600">
                <Download className="w-4 h-4 mr-2" />
                Exportar a CSV
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Import Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Importar Playlists</span>
            </CardTitle>
            <CardDescription>Sube un archivo CSV para crear playlists y agregar canciones favoritas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="csv-file">Seleccionar archivo CSV</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button
              onClick={importFromCSV}
              disabled={!selectedFile || loading}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar desde CSV
            </Button>
          </CardContent>
        </Card>

        {/* Progress and Messages */}
        {loading && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{currentExportItem || message}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {message && !loading && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Playlists List */}
        <Card>
          <CardHeader>
            <CardTitle>Tus Playlists</CardTitle>
            <CardDescription>Lista de todas tus playlists de Spotify</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{playlist.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {playlist.tracks.total} canciones • {playlist.owner.display_name}
                    </p>
                  </div>
                  <Badge variant="secondary">{playlist.tracks.total}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
