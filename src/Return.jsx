import question from "./assets/return.svg"
import axios from "axios"

export default function Return({chosenTicket, userToken, setTicketsList, closeModal}){

    const returnTicket = async () => {
        try {
            const res = await axios.put(`https://shift-backend.onrender.com/cinema/orders/cancel`, {orderId:chosenTicket},
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
                
            })
            setTicketsList(prevTickets => prevTickets.filter(ticket => ticket._id !== chosenTicket))
            closeModal()
        } 
        catch (error) {
            console.error(error)
        }
    }


    return(
        <div>
            <div>
                <img src={question}></img>
                <p>Вернуть билет?</p>
            </div>
            <div>
                <button onClick={returnTicket}>Вернуть</button>
                <button onClick={()=>closeModal()}>Отменить</button>
            </div>
        </div>
    )
        

    
}