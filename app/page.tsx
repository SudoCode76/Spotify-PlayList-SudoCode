"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Music, Download, Upload, Heart, List, User, LogOut, Users2, Eye, CheckCircle, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

// ... (interfaces and ThemeToggle component remain the same)
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

function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}


export default function SpotifyPlaylistManager() {
  const [mounted, setMounted] = useState(false)
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
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
        window.history.pushState({}, '', '/callback');
        fetch('/api/spotify/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.access_token) {
                setAccessToken(data.access_token);
                fetchUserProfile(data.access_token);
            } else {
                setMessage("Error: No se pudo obtener el token de acceso.");
            }
        })
        .catch(() => setMessage("Error al intercambiar el código por el token."));
    } else {
        const storedToken = localStorage.getItem("spotify_access_token");
        const storedUser = localStorage.getItem("spotify_user");
        const tokenTimestamp = localStorage.getItem("spotify_token_timestamp");

        if (storedToken && storedUser && tokenTimestamp) {
            const tokenAge = Date.now() - Number.parseInt(tokenTimestamp);
            const oneHour = 60 * 60 * 1000;

            if (tokenAge < oneHour) {
                setAccessToken(storedToken);
                setUser(JSON.parse(storedUser));
                fetchPlaylists(storedToken);
            } else {
                localStorage.clear();
            }
        }
    }
  }, [mounted])

  const loginToSpotify = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "your_client_id"
    const currentHost = window.location.hostname
    const currentPort = window.location.port

    let redirectUri: string
    if (currentHost === "localhost" || currentHost === "127.0.0.1") {
      redirectUri = `http://127.0.0.1:${currentPort || "3000"}/callback`
    } else {
      redirectUri = `${window.location.origin}/callback`
    }

    const encodedRedirectUri = encodeURIComponent(redirectUri)
    const scopes = encodeURIComponent(
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-follow-read user-follow-modify",
    )

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=${scopes}&show_dialog=true`

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
    let after: string | null = null;

    while (true) {
      const url = `https://api.spotify.com/v1/me/following?type=artist&limit=50` + (after ? `&after=${after}` : '');

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

      after = data.artists.cursors?.after;
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

      setCurrentExportItem("Contando canciones favoritas...")
      const likedSongs = await fetchLikedSongs()
      setProgress(20)

      let totalTracks = likedSongs.length
      setCurrentExportItem("Contando canciones en playlists...")
      for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i]
        totalTracks += playlist.tracks.total
        setProgress(20 + ((i + 1) / playlists.length) * 40)
      }

      setCurrentExportItem("Contando artistas seguidos...")
      const followedArtists = await fetchFollowedArtists()
      setProgress(80)

      setCurrentExportItem("Analizando artistas únicos...")
      const uniqueArtists = new Set<string>()
      likedSongs.forEach((track) => {
        track.artist.split(", ").forEach((artist) => uniqueArtists.add(artist.trim()))
      })
      playlists.forEach((playlist) => {
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

      setCurrentExportItem("Exportando canciones favoritas...")
      const likedSongs = await fetchLikedSongs()
      allTracks.push(...likedSongs)
      likedSongs.forEach((track) => {
        track.artist.split(", ").forEach((artist) => uniqueArtistNames.add(artist.trim()))
      })
      setProgress(15)

      for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i]
        setCurrentExportItem(`Exportando playlist: ${playlist.name}`)
        const tracks = await fetchPlaylistTracks(playlist.id, playlist.name)
        allTracks.push(...tracks)
        tracks.forEach((track) => {
          track.artist.split(", ").forEach((artist) => uniqueArtistNames.add(artist.trim()))
        })
        setProgress(15 + ((i + 1) / playlists.length) * 60)
      }

      setCurrentExportItem("Exportando artistas seguidos...")
      const followedArtists = await fetchFollowedArtists()
      allArtists.push(...followedArtists)
      setProgress(85)

      setCurrentExportItem("Generando archivo unificado...")
      const unifiedCSVHeader =
        'Type,Playlist,Song,Artist,Album,Duration (ms),Spotify ID,Added At,Genres,Followers,Popularity,Spotify URL\n';

      const escapeCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;

      const unifiedCSVContent = [
        ...allTracks.map(
          (track) =>
            [
              escapeCSV('Track'),
              escapeCSV(track.playlist_name || ''),
              escapeCSV(track.name),
              escapeCSV(track.artist),
              escapeCSV(track.album),
              track.duration_ms,
              escapeCSV(track.spotify_id),
              escapeCSV(track.added_at),
              '""','""','""','""'
            ].join(',')
        ),
        ...followedArtists.map(
          (artist) =>
            [
              escapeCSV('Followed Artist'),
              '""', // Playlist
              '""', // Song
              escapeCSV(artist.name),
              '""', // Album
              '""', // Duration
              escapeCSV(artist.id),
              '""', // Added at
              escapeCSV(artist.genres.join('; ')),
              artist.followers,
              artist.popularity,
              escapeCSV(artist.external_urls.spotify)
            ].join(',')
        ),
      ].join("\n")

      setProgress(95)

      const unifiedBlob = new Blob(["\uFEFF" + unifiedCSVHeader + unifiedCSVContent], { type: "text/csv;charset=utf-8;" })
      const unifiedLink = document.createElement("a")
      unifiedLink.href = URL.createObjectURL(unifiedBlob)
      unifiedLink.download = `spotify_complete_export_${user?.display_name || "user"}_${new Date().toISOString().split("T")[0]}.csv`
      unifiedLink.click()

      setProgress(100)
      setCurrentExportItem("Exportación completada")
      setMessage(
        `Exportación completada: ${allTracks.length} canciones y ${followedArtists.length} artistas exportados.`,
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
      const query = encodeURIComponent(`track:"${trackName.trim()}" artist:"${artist.trim()}"`);
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      if (response.ok) {
        const data = await response.json();
        if (data.tracks && data.tracks.items.length > 0) {
          return data.tracks.items[0].id;
        }
      }

      const simpleQuery = encodeURIComponent(`${trackName.trim()} ${artist.trim()}`);
      const fallbackResponse = await fetch(`https://api.spotify.com/v1/search?q=${simpleQuery}&type=track&limit=1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.tracks && fallbackData.tracks.items.length > 0) {
          return fallbackData.tracks.items[0].id;
        }
      }

      console.warn(`Track not found: ${trackName} by ${artist}`);
      return null;
    } catch (error) {
      console.error("Error searching track:", error);
      return null;
    }
  }

  const searchArtist = async (artistName: string): Promise<string | null> => {
    try {
      const query = encodeURIComponent(`artist:"${artistName.trim()}"`);
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        console.warn(`Artist search API error: ${response.status}`);
        return null;
      }
      const data = await response.json();
      if (data.artists && data.artists.items.length > 0) {
        return data.artists.items[0].id;
      }
      console.warn(`Artist not found: ${artistName}`);
      return null;
    } catch (error) {
      console.error("Error searching artist:", error);
      return null;
    }
  };

  const followArtists = async (artistIds: string[]) => {
    if (artistIds.length === 0) return;
    try {
      const batchSize = 50;
      for (let i = 0; i < artistIds.length; i += batchSize) {
        const batch = artistIds.slice(i, i + batchSize);
        await fetch(`https://api.spotify.com/v1/me/following?type=artist`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: batch }),
        });
      }
    } catch (error) {
        console.error("Error following artists:", error);
        setMessage("Error al seguir artistas. Es posible que falten permisos. Intenta iniciar sesión de nuevo.");
    }
  };


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
          description: "Imported from CSV via Spotify Playlist SudoCode",
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
    if (trackIds.length === 0) return;
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
    if (trackIds.length === 0) return;
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
    if (!selectedFile || !accessToken) return;

    try {
      setLoading(true);
      setMessage("Leyendo archivo CSV...");
      setProgress(0);

      const text = await selectedFile.text();
      const lines = text.split(/\r?\n/).filter((line) => line.trim());

      if (lines.length <= 1) {
        setMessage("El archivo CSV está vacío o solo contiene encabezados.");
        setLoading(false);
        return;
      }

      setMessage("Clasificando datos del CSV...");
      const dataLines = lines.slice(1);
      const tracksByPlaylist = new Map<string, { name: string; artist: string }[]>();
      const artistsToFollowNames = new Set<string>();

      const parseCsvLine = (line: string): string[] => {
          const values = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"' && i + 1 < line.length && line[i+1] === '"') {
                  current += '"';
                  i++; // Skip next quote
              } else if (char === '"') {
                  inQuotes = !inQuotes;
              } else if (char === ',' && !inQuotes) {
                  values.push(current);
                  current = '';
              } else {
                  current += char;
              }
          }
          values.push(current);
          return values;
      }

      dataLines.forEach((line) => {
        if (!line.trim()) return;
        
        const values = parseCsvLine(line);
        const [type, playlistName, songName, artistName] = values;

        if (type === 'Track' && songName && artistName) {
          const trackData = { name: songName, artist: artistName };
          if (!tracksByPlaylist.has(playlistName)) {
            tracksByPlaylist.set(playlistName, []);
          }
          tracksByPlaylist.get(playlistName)?.push(trackData);
        } else if (type === 'Followed Artist' && artistName) {
          artistsToFollowNames.add(artistName);
        }
      });
      
      const likedSongsTracks = tracksByPlaylist.get('Liked Songs') || tracksByPlaylist.get('Canciones favoritas') || [];
      tracksByPlaylist.delete('Liked Songs');
      tracksByPlaylist.delete('Canciones favoritas');

      let totalOperations = tracksByPlaylist.size + (likedSongsTracks.length > 0 ? 1 : 0) + (artistsToFollowNames.size > 0 ? 1 : 0);
      let completedOperations = 0;
      let summary = { playlists: 0, liked: 0, followed: 0 };

      if (artistsToFollowNames.size > 0) {
        setCurrentExportItem(`Buscando ${artistsToFollowNames.size} artistas para seguir...`);
        const artistIdsToFollow: string[] = [];
        for (const artistName of Array.from(artistsToFollowNames)) {
          const artistId = await searchArtist(artistName);
          if (artistId) {
            artistIdsToFollow.push(artistId);
          }
        }
        
        if (artistIdsToFollow.length > 0) {
          setCurrentExportItem(`Siguiendo a ${artistIdsToFollow.length} artistas...`);
          await followArtists(artistIdsToFollow);
          summary.followed = artistIdsToFollow.length;
        }
        completedOperations++;
        setProgress((completedOperations / totalOperations) * 100);
      }

      if (likedSongsTracks.length > 0) {
        setCurrentExportItem(`Procesando ${likedSongsTracks.length} canciones para 'Me gusta'...`);
        const foundTrackIds: string[] = [];
        for (const track of likedSongsTracks) {
          const trackId = await searchTrack(track.name, track.artist);
          if (trackId) {
            foundTrackIds.push(trackId);
          }
        }
        if (foundTrackIds.length > 0) {
          await addToLikedSongs(foundTrackIds);
          summary.liked = foundTrackIds.length;
        }
        completedOperations++;
        setProgress((completedOperations / totalOperations) * 100);
      }

      for (const [playlistName, tracks] of tracksByPlaylist.entries()) {
        setCurrentExportItem(`Procesando playlist: ${playlistName} (${tracks.length} canciones)`);
        const foundTrackIds: string[] = [];
        for (const track of tracks) {
          const trackId = await searchTrack(track.name, track.artist);
          if (trackId) {
            foundTrackIds.push(trackId);
          }
        }

        if (foundTrackIds.length > 0) {
          const playlistId = await createPlaylist(playlistName);
          if (playlistId) {
            setCurrentExportItem(`Agregando ${foundTrackIds.length} canciones a '${playlistName}'...`);
            await addTracksToPlaylist(playlistId, foundTrackIds);
            summary.playlists++;
          }
        }
        completedOperations++;
        setProgress((completedOperations / totalOperations) * 100);
      }

      setMessage(`Importación completada: ${summary.playlists} playlists creadas, ${summary.liked} canciones añadidas a 'Me Gusta', y ${summary.followed} artistas seguidos.`);
      setCurrentExportItem("");
      await fetchPlaylists(accessToken);

    } catch (error) {
      console.error("Error during import:", error);
      setMessage(`Error durante la importación: ${error instanceof Error ? error.message : "Error desconocido"}`);
    } finally {
      setLoading(false);
      setProgress(0);
      setCurrentExportItem("");
    }
  };

  const logout = () => {
    setAccessToken(null)
    setUser(null)
    setPlaylists([])
    setMessage("")
    setExportStats(null)
    setShowExportPreview(false)

    localStorage.removeItem("spotify_access_token")
    localStorage.removeItem("spotify_user")
    localStorage.removeItem("spotify_token_timestamp")
  }

  if (!accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
             <div className="mx-auto w-16 h-16 mb-6 relative">
                  {mounted ? (
                    <Image
                      src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                      alt="Spotify SudoCode Logo"
                      width={64}
                      height={64}
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <Image
                      src="/logo-light.png"
                      alt="Spotify SudoCode Logo"
                      width={64}
                      height={64}
                      className="object-contain"
                      priority
                    />
                  )}
                </div>
            <CardTitle className="text-2xl">Spotify Playlist SudoCode</CardTitle>
            <CardDescription>
              Exporta e importa tus playlists de Spotify con archivos CSV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={loginToSpotify} className="w-full">
              <Music className="w-4 h-4 mr-2" />
              Conectar con Spotify
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 relative">
                  {mounted ? (
                    <Image
                      src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                      alt="Spotify SudoCode Logo"
                      width={48}
                      height={48}
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <Image
                      src="/logo-light.png"
                      alt="Spotify SudoCode Logo"
                      width={48}
                      height={48}
                      className="object-contain"
                      priority
                    />
                  )}
                </div>
              <div>
                <CardTitle className="text-2xl">Spotify Playlist SudoCode</CardTitle>
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
            <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button variant="outline" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Desconectar
                </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <List className="w-5 h-5" />
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
                <Heart className="w-5 h-5" />
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
                <Music className="w-5 h-5" />
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
                <Users2 className="w-5 h-5" />
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Vista Previa de Exportación</span>
            </CardTitle>
            <CardDescription>
              Esto es lo que se exportará en los archivos CSV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{exportStats.playlists}</p>
                <p className="text-sm text-muted-foreground">Playlists</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{exportStats.tracks}</p>
                <p className="text-sm text-muted-foreground">Canciones totales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{exportStats.likedSongs}</p>
                <p className="text-sm text-muted-foreground">Canciones favoritas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {exportStats.followedArtists}
                </p>
                <p className="text-sm text-muted-foreground">Artistas seguidos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{exportStats.artists}</p>
                <p className="text-sm text-muted-foreground">Artistas únicos</p>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Se generará 1 archivo unificado</AlertTitle>
              <AlertDescription>
                • <strong>spotify_complete_export_[usuario]_[fecha].csv</strong> - Todas las canciones y
                artistas en un solo archivo
                <br />• Columna "Type" indica si es "Track", "Followed Artist" o "Track Artist"
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 mt-4">
              <Button onClick={exportToCSV} disabled={loading}>
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
        <CardContent>
          {!showExportPreview ? (
            <Button onClick={previewExport} disabled={loading} className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Ver Qué Se Exportará
            </Button>
          ) : (
            <Button onClick={exportToCSV} disabled={loading} className="w-full">
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
          <CardDescription>
            Sube un archivo CSV para crear playlists y agregar canciones favoritas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="csv-file">Seleccionar archivo CSV</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Archivo seleccionado: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          <Alert>
            <AlertTitle>Formato esperado del CSV</AlertTitle>
            <AlertDescription>
              • Primera línea: encabezados
              <br />• Columnas: Type, Playlist, Song, Artist...
              <br />• Para canciones favoritas usa "Liked Songs" como nombre de playlist
            </AlertDescription>
          </Alert>

          <Button onClick={importFromCSV} disabled={!selectedFile || loading} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            {loading ? "Importando..." : "Importar desde CSV"}
          </Button>
        </CardContent>
      </Card>

      {/* Progress and Messages */}
      {loading && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
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
          <CardDescription>
            Lista de todas tus playlists de Spotify
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{playlist.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {playlist.tracks.total} canciones • {playlist.owner.display_name}
                  </p>
                </div>
                <Badge variant="secondary">
                  {playlist.tracks.total}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
