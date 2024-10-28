import { useState, useEffect} from "react"
import axios from "axios"
import TicketCard from "./TicketCard"
import Modal from "./Modal"
import Return from "./Return"

export default function Tickets({userToken}){
    const [ticketsList, setTicketsList] = useState([])
    const [activeModalTicketCard, setActiveModalTicketCard] = useState(false)
    const [chosenTicket, setChosenTicket] = useState("")

    // useEffect(()=>{
    //     console.log(ticketsList)
    // }, [ticketsList])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://shift-backend.onrender.com/cinema/orders`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                const filteredTickets = res.data.orders.filter(ticket => ticket.status !== "CANCELED");

                setTicketsList(filteredTickets);
            } 
            catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [userToken])

    const ticketCardsRender = ()=>{
        return(
            <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                {ticketsList.slice().reverse().map((ticket, index) => (
                    <TicketCard key={index} ticket={ticket} setActiveModalTicketCard={setActiveModalTicketCard} setChosenTicket={setChosenTicket}></TicketCard>
                ))}
            </div>
        )
    }

    return(
        <>
        <section className="cardSection">
            <p className="login-title">Билеты</p>
            {ticketCardsRender()}
        </section>
        <Modal activeModal={activeModalTicketCard} setActiveModal={setActiveModalTicketCard}>
                <Return chosenTicket={chosenTicket} userToken={userToken} setTicketsList={setTicketsList} closeModal={() => setActiveModalTicketCard(false)}></Return>
        </Modal>
        </>
    )
}