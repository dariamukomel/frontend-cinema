import axios from "axios"
import { useState, useEffect } from "react"



export default function TicketCard({ticket, setActiveModalTicketCard, setChosenTicket}){
    const [filmName, setFilmName] = useState("")
    

    useEffect(() => {
        const getFilmName = async () => {
            try {
                const res = await axios.get(`https://shift-backend.onrender.com/cinema/film/${ticket.tickets[0].filmId}`);
                setFilmName(res.data.film.name)
            } 
            catch (error) {}
        }
        getFilmName()
    }, [ticket])

    function renderTicketPlaces(tickets) {
        const groupedTickets = tickets.reduce((acc, ticket) => {
            const row = ticket.row
            if (!acc[row]) {
                acc[row] = []
            }
            acc[row].push(ticket.column)
            return acc
        }, {})
    
        return (
            <div style={{display:"flex", flexWrap: "wrap", gap: "0 15px", justifyContent: "center"}}>
                {Object.keys(groupedTickets).map((row, index) => (
                    <p key={index} className="ticket-main-text">
                        {row} ряд {groupedTickets[row].join(", ")} место
                    </p>
                ))}
            </div>
        )
    }

    function returnTicket (){
        setActiveModalTicketCard(true)
        setChosenTicket(ticket._id)
    }
    

    return(
        <>
        <div className="ticket">
            <div className="first-line">
                <p className="ticket-secondary-text">{ticket.tickets[0].seance.date}</p>
                <p className="ticket-secondary-text">{ticket.tickets[0].seance.time}</p>
            </div>
            <div className="second-line">
                <p className="ticket-title">{filmName}</p>
                {renderTicketPlaces(ticket.tickets)}
            </div>
            <div className="first-line"> 
                <div className="label">
                    <p className="lable-text">Оплачен</p>
                </div>
                <p className="ticket-secondary-text">код билета &nbsp;{ticket.orderNumber}</p>
            </div>
            <button className="ticket-button" onClick={returnTicket}>Вернуть билет</button>  
        </div>
        
        </>
    )
}