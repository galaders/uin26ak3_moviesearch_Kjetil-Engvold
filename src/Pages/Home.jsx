import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import History from "../components/History"

export default function Home(){
    const navigate = useNavigate() 
    // Hook fra react-router-dom som lar deg navigere programmatisk til andre sider

    const [search, setSearch] = useState("james+bond")
    // Søketekst som brukes i API-kallet. Default er "james+bond"

    const storedHistory = localStorage.getItem("search")
    // Henter lagret søkehistorikk fra localStorage (hvis den finnes)

    const [focused, setFocused] = useState(false) 
    // Styrer om søkefeltet er i fokus (for å vise historikk-dropdown)

    const [data, setData] = useState();
    // Her lagres filmdataene som kommer fra API-et

    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    // Søkehistorikk. Hvis noe ligger i localStorage, bruk det. Hvis ikke, start med tom liste.

    console.log("Denne kommer fra storage", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?s=${search}&type=movie&apikey=`
     //`http://www.omdbapi.com/?s=${search}&apikey=`//
    // Grunn-URL for API-kall. Søketeksten settes inn dynamisk.

    const apiKey = import.meta.env.VITE_APP_API_KEY
    // API-nøkkel hentet fra .env-filen

    useEffect(() => {
        localStorage.setItem("search", JSON.stringify(history))
    }, [history])
    // Hver gang history endres, lagres den automatisk i localStorage

    useEffect(()=>{
         const getMovies = async()=>{
            try {
                const response = await fetch(`${baseUrl}${apiKey}`)
                // Henter filmdata basert på søket

                const data = await response.json()
                // Konverterer responsen til JSON

                console.log(data)
                setData(data.Search)
                // Lagrer listen av filmer i state
            }
            catch(err){
                console.error(err);
            }
        }
        getMovies()
    },[search])
    // Kjør API-kall hver gang søketeksten endres

    const handleChange = (e)=>{
        setSearch(e.target.value)
        // Oppdaterer søketeksten mens brukeren skriver
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // Hindrer at siden refresher

        setFocused(false)
        // Lukker historikk-dropdown

        setHistory((prev) => {
            const newHistory = [search, ...prev.filter(item => item !== search)]
            // Legger til nytt søk først i lista, og fjerner duplikater

            return newHistory.slice(0, 10) 
            // Beholder kun de 10 siste søkene
        })
    }

    console.log(data)

    return (
    <main>
        <a href="/">HOME</a>

        <form onSubmit={handleSubmit}>
            <label>
                Search for movies
                <input 
                    type="search" 
                    placeholder="Name" 
                    onChange={handleChange} 
                    onFocus={()=> setFocused(true)} 
                    // Når input får fokus → vis historikk
                />
            </label>

            {focused && history.length > 0 
                ? <History history={history} setSearch={setSearch} setFocused={setFocused} /> 
                : null 
            }
            {/* Viser History-komponenten hvis input er fokusert */}
            <button type="submit">Movie Search</button>


            <>
                {data?.filter((filmer, index, self) => 
                    self.findIndex(f => f.imdbID === filmer.imdbID) === index
                    // Fjerner duplikater basert på imdbID
                ).map((filmer) => (
                    <article 
                        key={filmer.imdbID} 
                        className="movie-card" 
                        onClick={() => navigate(`/${filmer.imdbID}`)}
                        // Klikk på film → gå til detaljside
                    >
                        <img src={filmer.Poster} alt={filmer.Title} /> 
                        <h3>{filmer.Title}</h3> 
                        <p className="year">{filmer.Year}</p>
                    </article>
                ))}
            </>
        </form>
    </main>
    )
}
