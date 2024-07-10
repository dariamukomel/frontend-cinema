import { useEffect, useState } from "react"
import axios from "axios"
import FilmCard from "./FilmCard"
import SelectedFilmCard from "./SelectedFilmCard"


export default function MainPage(){
    const [filmList, setFilmList] = useState([])
    const [selectedFilm, setSelectedFilm] = useState({})
    const [schedule, setSchedule] = useState([])
    
    
    useEffect(()=>{
      axios.get('https://shift-backend.onrender.com/cinema/today').then(res=>{setFilmList(res.data.films)})
  
    }, [])
  
    function openCard(id){
      axios.get('https://shift-backend.onrender.com/cinema/film/'+id).then(res=>{setSelectedFilm(res.data.film)})
      axios.get(`https://shift-backend.onrender.com/cinema/film/${id}/schedule`).then(res=>{setSchedule(res.data.schedules)})
    }

    return(
        <section className="cardSection">
          {!Object.keys(selectedFilm).length ?
            <>
              <h2 className="menu-title">Афиша</h2>
              <div className="cardList">
                {filmList.map(film =>{
                  return(
                    <FilmCard key ={film.id} {...film} onClick={() => openCard(film.id)}/>
                  )
                })}
              </div>
            </>
          : schedule.length > 0 &&
            <SelectedFilmCard selectedFilm={selectedFilm} schedule={schedule} onClick={()=> setSelectedFilm({})}/>
            
          }
        </section>
    )
}