import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function Movie(){
    const { movie } = useParams()
    const navigate = useNavigate()
    const [movieData, setMovieData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const response = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`)
                const data = await response.json()
                setMovieData(data)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        getMovieDetails()
    }, [movie, apiKey])

    if (loading) return <h1>Laster film...</h1>
    if (!movieData || movieData.Response === "False") return <h1>Film ikke funnet</h1>

    return (
        <main className="movie-detail">
            <button onClick={() => navigate("/")} className="back-btn">← Tilbake</button>
            <div className="detail-content">
                <img src={movieData.Poster} alt={movieData.Title} className="detail-poster" />
                <div className="detail-info">
                    <h1>{movieData.Title}</h1>
                    <p><strong>År:</strong> {movieData.Year}</p>
                    <p><strong>Sjanger:</strong> {movieData.Genre}</p>
                    <p><strong>Instruktør:</strong> {movieData.Director}</p>
                    <p><strong>Skuespillere:</strong> {movieData.Actors}</p>
                    <p><strong>Rating:</strong> {movieData.imdbRating}/10</p>
                    <p><strong>Plot:</strong> {movieData.Plot}</p>
                </div>
            </div>
        </main>
    )
}