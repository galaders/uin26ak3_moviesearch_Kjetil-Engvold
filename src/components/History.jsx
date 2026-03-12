export default function History({history, setSearch, setFocused}){

    // Når brukeren klikker på et tidligere søk:
    // - Oppdater søkefeltet med valgt søkeord
    // - Lukk historikk-listen
    const handleClick = (searchTerm) => {
        setSearch(searchTerm)
        setFocused(false)
    }

    return (
        <>
            <h4 style={{margin: "0 10px 5px 10px", fontSize: "0.9em", color: "#888"}}>Previous search:</h4>

            <ul style={{listStyle: "none", padding: "0", margin: "0", border: "1px solid #444", borderRadius: "8px", marginTop: "10px", maxHeight: "300px", overflowY: "auto"}}>
                {history?.map((item, i) => (
                    <li 
                        key={i} 
                        onClick={() => handleClick(item)} 
                        className="history-item"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    )
}
