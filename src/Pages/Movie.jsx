import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function Movie(){
    const { movie } = useParams()
    // Henter URL-parameteren ":movie" fra ruten, f.eks. /tt123456 → movie = "tt123456"

    const navigate = useNavigate()
    // Hook for å navigere programmatisk tilbake til forsiden

    const [movieData, setMovieData] = useState(null)
    // Her lagres all informasjon om filmen som hentes fra API-et

    const [loading, setLoading] = useState(true)
    // Viser en "laster..."-tekst mens API-kallet pågår

    const apiKey = import.meta.env.VITE_APP_API_KEY
    // API-nøkkel hentet fra .env-filen

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const response = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`)
                // Henter detaljer om én spesifikk film basert på imdbID

                const data = await response.json()
                // Konverterer responsen til JSON

                setMovieData(data)
                // Lagrer filmdata i state

                setLoading(false)
                // Slutter å vise "laster..."
            } catch (err) {
                console.error(err)
                setLoading(false)
                // Selv ved feil må loading settes til false
            }
        }

        getMovieDetails()
        // Kaller funksjonen når komponenten lastes eller når movie/apiKey endres
    }, [movie, apiKey])

    if (loading) return <h1>Loading movie...</h1>
    // Vises mens API-kallet pågår

    if (!movieData || movieData.Response === "False") return <h1>Movie not found</h1>
    // Hvis API-et ikke finner filmen eller data mangler

    return (
        <main className="movie-detail">

            <img 
                src={movieData.Poster} 
                alt={movieData.Title} 
                className="detail-poster" 
            />

            <h1>{movieData.Title}</h1>

            <p><strong>År:</strong> {movieData.Year}</p>
            <p><strong>Sjanger:</strong> {movieData.Genre}</p>
            <p><strong>Instruktør:</strong> {movieData.Director}</p>
            <p><strong>Skuespillere:</strong> {movieData.Actors}</p>
            <p><strong>Rating:</strong> {movieData.imdbRating}/10</p>
            <p><strong>Plot:</strong> {movieData.Plot}</p>
            <button onClick={() => navigate("/")} className="back-btn">
                ← Back
            </button>
        </main>
    )
}
