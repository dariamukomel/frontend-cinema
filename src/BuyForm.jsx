import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'

export default function BuyForm({setPaidTicketInfo, filmid, date, time, tickets, userInfo}){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit =(data) =>{
        const updatedTickets = tickets.map(ticket => {
            return {
              row: Number(ticket.index1),
              column: Number(ticket.index2)  
            };
        });

        setPaidTicketInfo(prevState => ({
            ...prevState,
            filmId: filmid, 
            seance: {
                ...prevState.seance,
                date: date,  
                time: time   
            },
            tickets:updatedTickets,
            person:{
                ...prevState.phone,
                firstname: data.firstname,
                lastname: data.lastname,
                middlename: data.middlename,
                phone: data.phone
            }

        }));
        navigate("/payment")
    }

    return(
        <>
        <p>Введите ваши данные</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className="tel-input" type="text" {...register("firstname", { required: true })} placeholder="Имя"/>
            <input className="tel-input" type="text" {...register("lastname", { required: true })} placeholder="Фамилия"/>
            <input className="tel-input" type="text" {...register("middlename", { required: true })} placeholder="Отчество"/>
            <input className={errors.phone ? "tel-input-error" : "tel-input"} type="tel" {...register("phone", { required: true, pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ })} placeholder="Телефон" defaultValue={userInfo.phone ? userInfo.phone : ''} /> 
            {errors.phone && <p className="login-text" style={{color: "red"}}>Введите корректный номер телефона</p>}
            <input className={errors.email ? "tel-input-error" : "tel-input"} type="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Email"/>
            {errors.email && <p className="login-text" style={{color: "red"}}>Введите корректный email</p>}
            <input className="tel-input" type="text" {...register("city", { required: true })} placeholder="Город"/>
            <input className="button-more" style={{marginTop: "20px"}} type="submit" value="Продолжить" />
            
        </form>
        </>

    )
}