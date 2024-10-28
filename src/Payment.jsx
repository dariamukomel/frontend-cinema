import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import Modal from "./Modal"
import Success from "./Success"
import axios from "axios"

export default function Payment({filmName, paidTicketInfo, setPaidTicketInfo, logIn}){
    const [activeModalSuccess, setActiveModalSuccess] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [order, setOrder] = useState({})


    const onSubmit = async (data)=>{
        setPaidTicketInfo(prevState => ({
            ...prevState,
            debitCard:{
                ...prevState.debitCard,
                pan: data.pan,
                expireDate: data.expireDate,
                cvv: data.cvv
            }

        }))
        try{
            const order = await axios.post('https://shift-backend.onrender.com/cinema/payment', paidTicketInfo)
            setOrder(order.data.order)
        }
        catch (error) {
            setOrder({})
            console.error(error); // Обработка ошибки
        }
        finally{
            setActiveModalSuccess(true)
        }
          
    }

    return(
        <>
        <section className="cardSection">
            <p className="login-title">Введите данные карты для оплаты</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="pan" className="login-text">Номер карты</label>
                <input className={errors.pan ? "tel-input-error" : "tel-input"} style={{marginTop:"0"}} type="text" {...register("pan", { required: true})} placeholder="0000 0000"/>
                <label htmlFor="expireDate" className="login-text">Срок</label>
                <input className={errors.expireDate ? "tel-input-error" : "tel-input"} style={{marginTop:"0"}} type="text" {...register("expireDate", { required: true})} placeholder="00/00"/>
                <label htmlFor="cvv" className="login-text">CVV: </label>
                <input className={errors.cvv ? "tel-input-error" : "tel-input"} style={{marginTop:"0"}} type="text" {...register("cvv", { required: true})} placeholder="0000"/>
                <input className="button-more" style={{marginTop: "20px", width:"25%"}} type="submit" value="Отправить"/>
            </div>
            </form>

        </section>
        <Modal activeModal={activeModalSuccess} setActiveModal={setActiveModalSuccess}>
            <Success order={order} filmName={filmName} paidTicketInfo={paidTicketInfo} logIn={logIn}/>
        </Modal>
        </>
        
    )
}