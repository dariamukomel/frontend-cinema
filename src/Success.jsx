import { useEffect } from "react"
import success from "./assets/success.svg"
import { NavLink } from "react-router-dom";

export default function Success({order, filmName, paidTicketInfo, logIn}){
    useEffect(() => {
        console.log(order)
    }, [order])

    const renderTicketPlaces = (tickets) => {
        const groupedTickets = tickets.reduce((acc, ticket) => {
            const { row, column } = ticket;
            if (!acc[row]) {
                acc[row] = [];
            }
            acc[row].push(column);
            return acc;
        }, {});

        return Object.keys(groupedTickets).map(row => (
            <p className="text" key={row}>
                {row} ряд &nbsp;{groupedTickets[row].join(", ")} место
            </p>
        ));
    };


    return(
        <>
            {!Object.keys(order).length ?
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <p className="text" style={{padding:"0"}}>Эти места уже куплены.</p>
                </div>
            :
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <img src={success} ></img>
                    <p className="login-title" style={{padding:"20px 0 20px 0"}}>Оплата прошла успешно!</p>
                </div>
                
                <div style={{display: "flex", flexDirection: "column", gap:"5px"}}>
                    <div>
                        <p className="secondary-text">Номер билета</p>
                        <p className="text">{order.orderNumber}</p>
                    </div>
                    <div>
                        <p className="secondary-text">Фильм</p>
                        <p className="text">{filmName}</p>
                    </div>
                    <div>
                        <p className="secondary-text">Дата</p>
                        <p className="text">{paidTicketInfo.seance.date}</p>
                    </div>
                    <div>
                        <p className="secondary-text">Время</p>
                        <p className="text">{paidTicketInfo.seance.time}</p>
                    </div>
                    <div>
                        <p className="secondary-text">Места</p>
                        {renderTicketPlaces(order.tickets)}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h3 className="link-text" style={{paddingTop:"20px"}}><NavLink to={logIn ? "/tickets" : "/login"}><u>Перейти в личный кабинет</u></NavLink></h3>
                </div>
            </div>
            }
        </>
    )
}