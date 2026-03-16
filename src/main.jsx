// bruk firefox for å se åsen jeg laget siden 
// den ser grei ut på brave også men vet ikke om flere en de 2
// fik hjelp av thor me å få started den opp etter første søking bit 
// "finne navn på filmer på startsiden" på tirsdag 
// og fik se over det jeg lurte på torsdag med han igjen.
// det jeg fikk hjelp var at startsiden viste navn på 10 
// james bond filmer og spill etter det klarte jeg å fikse det selv bedre
// med litt Ai hjelp for vanskelig bitene jeg trengte hjelp med

// Ai chaten er på Visual Studio Code så jeg lager en mappe i 
// src som hetter AiBildemappe hvor jeg vise bilde av chatten som jeg brukte
// assets hvor bilde for ingen bilde og logoen til siden ligger



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)