import { useEffect, useState } from "react"
import back from "./assets/back.svg"
import kinopoisk from "./assets/kinopoisk.svg"
import imdb from "./assets/imdb.svg"
import Modal from "./Modal"
import BuyForm from "./BuyForm"

export default function SelectedFilmCard({ selectedFilm, schedule, setPaidTicketInfo, onClick, userInfo }) {
    const [activeDate, setActiveDate] = useState(schedule[0])
    const [activeTime, setActiveTime] = useState(activeDate.seances[0])
    const [selectedTickets, setSelectedTickets] = useState([])
    const [summ, setSumm] = useState(0)
    const [activeModal, setActiveModal] = useState(false)


    useEffect(() => {
        setActiveTime(activeDate.seances[0])
    }, [activeDate])

    useEffect(() => {
        {
            activeTime.hall.places.map((row, index1) => {
                {
                    row.map((place, index2) => {
                        place.index1 = String(Number(index1) + 1)
                        place.index2 = String(Number(index2) + 1)
                    })
                }
            })
        }
    }, [activeTime])

    function changeDate(date) {
        setActiveDate(date)
        setSelectedTickets([])
        setSumm(0)
    }
    function changeTime(seance) {
        setActiveTime(seance)
        setSelectedTickets([])
        setSumm(0)
    }

    function tickets(place, selected) {
        if (place.type !== "BLOCKED" ) {
            if (selected) {
                setSumm(summ - place.price)
                setSelectedTickets(selectedTickets => selectedTickets.filter(ticket => !(ticket.index1 === place.index1 && ticket.index2 === place.index2)));
            }
            else if(selectedTickets.length<5) {
                setSumm(summ + place.price)
                setSelectedTickets(selectedTickets => [...selectedTickets, place])
            }
        }
    }

    let genres = 'Жанры: '
    let genres_len = selectedFilm.genres.length
    {
        selectedFilm.genres.map((genre, index) => {
            genres += genre
            if (index + 1 != genres_len) {
                genres += ', '
            }
        })
    }

    let actors = 'Актеры: '
    let actors_len = selectedFilm.actors.length
    {
        selectedFilm.actors.map((actor, index) => {
            actors += actor.fullName
            if (index + 1 != actors_len) {
                actors += ', '
            }
        })
    }
    let directors = 'Режиссеры: '
    let directors_len = selectedFilm.directors.length
    {
        selectedFilm.directors.map((director, index) => {
            directors += director.fullName
            if (index + 1 != directors_len) {
                directors += ', '
            }
        })
    }

    return (
        <>
            <div className="back-block">
                <a href="#" onClick={onClick}><img src={back}></img></a>
                <h3 className="back"><a href="#" onClick={onClick}>Назад</a></h3>
            </div>

            <div style={{ display: "flex", height: "400px" }}>
                <img src={'https://shift-backend.onrender.com' + selectedFilm.img} className="selectedCardimg"></img>
                <div className="filmInfo">
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                        <div style={{ gap: "10px" }}>
                            <p className="selected-film-title">{selectedFilm.name}<sup className="card-subtitle">&#40;{selectedFilm.ageRating}&#41;</sup></p>
                            <p className="card-subtitle">{selectedFilm.originalName} &#40;{selectedFilm.releaseDate}&#41;</p>
                        </div>
                        <p className="card-subtitle">{selectedFilm.description}</p>
                    </div>
                    <div className="selected-descriptoin">
                        <div style={{ display: "flex", gap: "0 10%" }}>
                            <p className="card-subtitle">Оценки:</p>
                            <div style={{ display: "inline-flex", gap: "0 10px" }}>
                                <img src={kinopoisk}></img>
                                <p className="card-subtitle">{selectedFilm.userRatings.kinopoisk}</p>
                            </div>
                            <div style={{ display: "inline-flex", gap: "0 10px" }}>
                                <img src={imdb}></img>
                                <p className="card-subtitle">{selectedFilm.userRatings.imdb}</p>
                            </div>
                        </div>

                        <p className="card-subtitle">{genres}</p>
                        <p className="card-subtitle">Страна: {selectedFilm.country.name}</p>
                        <p className="card-subtitle">{actors}</p>
                        <p className="card-subtitle"></p>
                        <p className="card-subtitle">{directors}</p>
                    </div>


                </div>
            </div>


            <div>
                <p className="schedule-title">Расписание</p>
                <div className="button-container">
                    {schedule.map((date, index) => {
                        let dateButType = "button-date"
                        if (date.date === activeDate.date) { dateButType = "active-button-date" }
                        return (
                            <>
                                <button key={date.date} className={dateButType} onClick={() => changeDate(date)}>{date.date}</button>

                            </>
                        )
                    })}
                </div>

                <div style={{display:"flex", flexDirection: "column", gap:"10px", marginTop:"20px"}}>
                    <p className="halls-title">Красный зал</p>
                    <div style={{ display: "inline-flex", gap: "10px" }}>
                        {activeDate.seances.map(seance => {
                            let timeButType = "button-time"
                            if (seance.time === activeTime.time && seance.hall.name === activeTime.hall.name) { timeButType = "active-button-time" }
                            return (
                                seance.hall.name === 'Red' && <button key={seance.time} className={timeButType} onClick={() => changeTime(seance)}>{seance.time}</button>
                            )
                        })}
                    </div>
                    <p className="halls-title">Зеленый зал</p>
                    <div style={{ display: "inline-flex", gap: "10px" }}>
                        {activeDate.seances.map(seance => {
                            let timeButType = "button-time"
                            if (seance.time === activeTime.time && seance.hall.name === activeTime.hall.name) { timeButType = "active-button-time" }
                            return (
                                seance.hall.name === 'Green' && <button key={seance.time} className={timeButType} onClick={() => changeTime(seance)}>{seance.time}</button>
                            )
                        })}
                    </div>
                    <p className="halls-title">Синий зал</p>
                    <div style={{ display: "inline-flex", gap: "10px" }}>
                        {activeDate.seances.map(seance => {
                            let timeButType = "button-time"
                            if (seance.time === activeTime.time && seance.hall.name === activeTime.hall.name) { timeButType = "active-button-time" }
                            return (
                                seance.hall.name === 'Blue' && <button key={seance.time} className={timeButType} onClick={() => changeTime(seance)}>{seance.time}</button>
                            )
                        })}
                    </div>
                </div>


                <div style={{ display: "flex", gap: "20%" , marginTop:"20px"}}>
                    <div>
                        <p className="schedule-title">Выбор места</p>
                        <div style={{display:"flex", gap: "40px"}}>
                            <div>
                            <p className="halls-title" style={{ textAlign: "center", marginLeft: "20px" }}>Экран</p>
                            <div className="screen"></div>
                            <div style={{display:"flex",gap: "2px", flexWrap:"nowrap", flexDirection:"column"}}>
                                {activeTime.hall.places.map((row, index) => {
                                    return (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "20px", display: "flex", justifyContent: "flex-end" }}><h5 className="halls-title">{Number(index) + 1}</h5></div>
                                            <div style={{ display: "flex", flexDirection: "row", gap: "2px" }}>
                                                {row.map(place => {
                                                    let color = "#DCDCDC"
                                                    let selected = false
                                                    if (selectedTickets.some(ticket => ticket.index1 === place.index1 && ticket.index2 === place.index2)) {
                                                        color = "#c48be8"
                                                        selected = true
                                                    }
                                                    else if (place.type === "BLOCKED") { color = "#9534D2" }
                                                    else if (place.type === "COMFORT") { color = "#87CEFA" }
                                                    return (
                                                        <button className="place" style={{ background: color }} onClick={() => tickets(place, selected)}></button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            </div>
                            
                            <div style={{display:"flex", flexDirection: "column", width: "200px", gap: "10px"}}>
                                <div>
                                    <p className="halls-title">Зал</p>
                                    <p className="totals">{activeTime.hall.name}</p>
                                </div>
                                <div>
                                    <p className="halls-title">Дата и Время</p>
                                    <p className="totals">{activeDate.date}&nbsp;&nbsp;{activeTime.time}</p>
                                </div>
                                <div>
                                    <p className="halls-title">Место</p>
                                    <div style={{ display: "flex", flexDirection:"column" }}>
                                        {selectedTickets.map(ticket => {
                                            return (
                                                <h5 className="totals">{ticket.index1} ряд {ticket.index2} место</h5>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <p className="schedule-title" style={{marginBottom:"0", fontSize:"20px"}}>Сумма: {summ} &#8381;</p>
                                </div>
                                    
                                <button className={selectedTickets.length>0 ? "button-more" : "button-buy"} onClick={()=>selectedTickets.length > 0 ? setActiveModal(true) : null}>Купить</button>
                                
                            </div>

                        </div>
                    </div>  
                </div>
            </div>
            <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                <BuyForm  setPaidTicketInfo={setPaidTicketInfo} filmid={selectedFilm.id} date={activeDate.date} time={activeTime.time} tickets={selectedTickets} userInfo={userInfo}/>
            </Modal>
        </>
    )
}