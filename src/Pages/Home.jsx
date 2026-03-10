import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import History from "../components/History"

export default function Home(){
    const navigate = useNavigate()
    const [search, setSearch] = useState("james+bond")
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false) 
    const [data, setData] = useState();
    
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    console.log("Denne kommer fra storage", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?s=${search}&type=movie&apikey=`
    //GJØR SÅNN!!!!!
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        localStorage.setItem("search", JSON.stringify(history))
    }, [history])

    useEffect(()=>{
         const getMovies = async()=>{
            try
            {
                const response = await fetch(`${baseUrl}${apiKey}`)
                const data = await response.json()
                
                console.log(data)
                setData(data.Search)

            }
            catch(err){
                console.error(err);
            }

        }
        getMovies()
    },[search])

   

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setFocused(false)
        setHistory((prev) => {
            const newHistory = [search, ...prev.filter(item => item !== search)]
            return newHistory.slice(0, 10) 
        })
    }
    console.log(data)

    return (
    <main>
        <h1>Forside</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Søk etter film
                <input type="search" placeholder="Name" onChange={handleChange} onFocus={()=> setFocused(true)} /*onBlur={()=> setFocused(false)}*/></input>
            </label>
            {focused && history.length > 0 ? <History history={history} setSearch={setSearch} setFocused={setFocused} /> : null }
            <button>Søk</button>
            <div className="movies-grid">
                {data?.filter((filmer, index, self) => self.findIndex(f => f.imdbID === filmer.imdbID) === index).map((filmer) => (
                    <article key={filmer.imdbID} className="movie-card" onClick={() => navigate(`/${filmer.imdbID}`)}>
                        <img src={filmer.Poster} alt={filmer.Title} />
                        <h3>{filmer.Title}</h3>
                        <p className="year">{filmer.Year}</p>
                    </article>
                ))}
            </div>
            
        </form>

    </main>
        
    )

    
}