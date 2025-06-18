// Este componente se puede usar para generar imágenes dinámicas de Open Graph
export function OGImage() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        backgroundImage: "linear-gradient(45deg, #000 0%, #1a1a1a 50%, #000 100%)",
        fontSize: 60,
        fontWeight: 700,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(45deg, #1DB954, #1ed760)",
            marginRight: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
          }}
        >
          🎵
        </div>
        <div style={{ color: "white" }}>Spotify Playlist</div>
      </div>
      <div
        style={{
          color: "#1DB954",
          fontSize: 48,
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        SudoCode
      </div>
      <div
        style={{
          color: "#888",
          fontSize: 24,
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Exporta e importa tus playlists de Spotify con archivos CSV
      </div>
    </div>
  )
}
