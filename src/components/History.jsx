export default function History({history, setSearch, setFocused}){

    const handleClick = (searchTerm) => {
        setSearch(searchTerm)
        setFocused(false)
    }

    return (
        <div className="history-list">
            <h4>Tidligere søk:</h4>
            <ul>
                {history?.map((item, i) => (
                    <li key={i} onClick={() => handleClick(item)} className="history-item">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}