import axios from "axios";
import React, {useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'

export default function Login({setLogIn, setUserToken, setUserInfo}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [codeRequested, setcodeRequested] = useState(false);

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try{
            await axios.post('https://shift-backend.onrender.com/auth/otp', {phone:data.phone})
            setcodeRequested(true)  
        }
        catch (error) {}
        
    }

    const onSubmitCode = async (data) => {
        try{
            const res =  await axios.post('https://shift-backend.onrender.com/users/signin', {phone:data.phone, code:data.code})
            setLogIn(true)
            setUserToken(res.data.token)
            navigate("/")
            try{
                const sessionResponse = await axios.get(`https://shift-backend.onrender.com/users/session`, {
                    headers: {
                        Authorization: `Bearer ${res.data.token}`
                    }
                })
                setUserInfo(sessionResponse.data.user)
            }
            catch(error){}
        }
        catch (error) {}
    }

    return (
        <section className="cardSection">
            <p className="login-title">Авторизация</p>
            

            <form onSubmit={codeRequested ? handleSubmit(onSubmitCode) : handleSubmit(onSubmit)}>
                {codeRequested ?
                    <p className="login-text">Введите проверочный код для входа в личный кабинет</p>
                : 
                    <p className="login-text">Введите номер телефона для входа в личный кабинет</p>
                }
                    <div style={{display: "flex", flexDirection: "column"}}>
                    <input className={errors.phone ? "tel-input-error" : "tel-input"} type="tel" {...register("phone", { required: true, pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ })} placeholder="Телефон" disabled={codeRequested}/>
                    {errors.phone && <p className="login-text" style={{color: "red"}}>Введите корректный номер телефона</p>} 
                    {codeRequested &&
                        <>
                        <input className={errors.code ? "tel-input-error" : "tel-input"} type="text" {...register("code", { required: true })} placeholder="Введите полученный код"/>
                        {/* {errors.code && <p className="login-text" style={{color: "red"}}>Неправильный код</p>} */}
                        </>
                    }
                    </div> 
                    <input className="button-more" style={{width:"25%", marginTop: "20px"}} type="submit" value={codeRequested? "Войти":"Продолжить"} />
            </form>
        </section>
    );
}
