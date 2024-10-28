import { useEffect, useState } from "react"
import axios from "axios"
import FilmCard from "./FilmCard"
import SelectedFilmCard from "./SelectedFilmCard"


export default function MainPage({selectedFilm, setSelectedFilm,  setPaidTicketInfo, userInfo}){
    const [filmList, setFilmList] = useState([])
    const [schedule, setSchedule] = useState([])
    
    useEffect(()=>{
      setSelectedFilm({})
    }, [])
    
    useEffect(()=>{
      axios.get('https://shift-backend.onrender.com/cinema/today').then(res=>{setFilmList(res.data.films)})
  
    }, [])
  
    function openCard(id){
      Promise.all([
        axios.get('https://shift-backend.onrender.com/cinema/film/' + id),
        axios.get('https://shift-backend.onrender.com/cinema/film/' + id + '/schedule')
      ]).then(([filmRes, scheduleRes]) => {
        setSelectedFilm(filmRes.data.film);
        setSchedule(scheduleRes.data.schedules);
        window.scrollTo({top: 0});
      });
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
            <SelectedFilmCard selectedFilm={selectedFilm} schedule={schedule} setPaidTicketInfo={setPaidTicketInfo} onClick={()=> setSelectedFilm({})} userInfo={userInfo}/>
            
          }
        </section>
    )
}