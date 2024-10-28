import axios from "axios";
import { useEffect } from "react";
import { set, useForm } from "react-hook-form"

export default function Profile({userToken, userInfo, setUserInfo}){
    const { register, handleSubmit, formState: { errors } } = useForm();

    // useEffect(()=>{
    //     console.log(userInfo)
    // }, [])

    const onSubmit = async (data)=>{
        const profile = {
                firstname : data.name,
                middlename : data.middlename,
                lastname : data.lastname,
                email : data.email,
                city : data.city
        }
        try{
            const response= await axios.patch('https://shift-backend.onrender.com/users/profile', {profile : profile , phone : data.phone},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                    
                })
            try{
                const newUserInfo = await axios.get(`https://shift-backend.onrender.com/users/session`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                setUserInfo(newUserInfo.data.user)
            }
            catch(error){}
        }
        catch(error){}
        
    }



    return(
        <section className="cardSection">
            <p className="login-title">Профиль</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="lastname">Фамилия</label>
                        <input type="text" {...register("lastname", { required: false})} defaultValue={userInfo.lastname ? userInfo.lastname : ''}></input>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="name">Имя</label>
                        <input type="text" {...register("name", { required: false})} defaultValue={userInfo.firstname ? userInfo.firstname : ''}></input>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="middlename">Отчество</label>
                        <input type="text" {...register("middlename", { required: false})} defaultValue={userInfo.middlename ? userInfo.middlename : ''}></input>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="phone">Номер телефона</label>
                        <input type="tel" {...register("phone")} defaultValue={userInfo.phone} readOnly/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="email">Email</label>
                        <input type="email" {...register("email", { required: false, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} defaultValue={userInfo.email ? userInfo.email : ''}/>
                        {errors.email && <p>Введите корректный email</p>}
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="city">Город</label>
                        <input  type="text" {...register("city", { required: false })} defaultValue={userInfo.city ? userInfo.city : ''}/>
                    </div>
                    <input type="submit" value="Обновить данные"/>
                </div>
            </form>

        </section>
        
    )
}