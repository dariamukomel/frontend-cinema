import logo1 from "./assets/logo1.svg"
import user from "./assets/user.svg"
import ticket from "./assets/ticket.svg"
import exit from "./assets/exit.svg"

import { Routes, Route, NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Login from "./Login"
import MainPage from "./MainPage"
import Payment from "./Payment"
import Profile from "./Profile"
import Tickets from "./Tickets"
import { useEffect, useState } from "react"




export default function Header(){
  const [selectedFilm, setSelectedFilm] = useState({})
  const [logIn, setLogIn] = useState(JSON.parse(sessionStorage.getItem("logIn")) || false)
  const [userToken, setUserToken] =useState(JSON.parse(sessionStorage.getItem("userToken")) || '')
  const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")) || {})
  const navigate = useNavigate()
  const [paidTicketInfo, setPaidTicketInfo] = useState({
    "filmId": "string",
    "person": {
      "firstname": "firstname",
      "lastname": "lastname",
      "middlename": "middlename",
      "phone": "89990009999"
    },
    "debitCard": {
      "pan": "1111 1111",
      "expireDate": "11/11",
      "cvv": "111"
    },
    "seance": {
      "date": "29.06.23",
      "time": "10:00"
    },
    "tickets": [
      {
        "row": 1,
        "column": 1
      }
    ]
  })

  useEffect(()=>{
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
  }, [userInfo])

  useEffect(()=>{
    sessionStorage.setItem("logIn", JSON.stringify(logIn))
  }, [logIn])

  useEffect(() => {
    sessionStorage.setItem("userToken", JSON.stringify(userToken))
  }, [userToken]);

  const exit_Login = () => {
    navigate("/")
    setLogIn(false)
    setUserToken('')
    setUserInfo({})
  };

  return(
    <>
    <header className="header">
      <div className="header-inside">
        <div className="header-left">
          <div style={{display:"flex", alignIitems: "center"}}> 
            <div style={{display:"flex", flexDirection: "column", justifyContent: "center"}}>
              <NavLink to="/"><h5 className="logo-text">Шифт</h5></NavLink>
              <NavLink to="/"><h5 className="logo-text">Cinema</h5></NavLink>
            </div>
            <NavLink to="/"><img src={logo1}></img></NavLink>
          </div>
          {logIn && <>
            <div className="user">
              <img src={user}></img>
              <h3 className="header-text"><NavLink to="/profile">Профиль</NavLink></h3>
            </div>
            <div className="tickets">
              <img src={ticket}></img>
              <h3 className="header-text"><NavLink to="/tickets">Билеты</NavLink></h3>
            </div>
          </>}
        </div>
        <div className="exit">
          <a href="#"><img src={exit} className="exit-img"></img> </a>
          {logIn?
            <h3 className="header-text"><a href="#" onClick={exit_Login} >Выйти</a></h3>
          :
            <h3 className="header-text"><NavLink to="/login">Войти</NavLink></h3>
          }
        </div>
      </div>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<MainPage selectedFilm={selectedFilm} setSelectedFilm={setSelectedFilm} setPaidTicketInfo={setPaidTicketInfo} userInfo={userInfo}/>}></Route>
        <Route path="/login" element={<Login setLogIn={setLogIn} setUserToken={setUserToken} setUserInfo={setUserInfo}/>}></Route>
        <Route path="/payment" element={<Payment filmName={selectedFilm.name} paidTicketInfo={paidTicketInfo} setPaidTicketInfo={setPaidTicketInfo} logIn={logIn}/>}></Route> 
        <Route path="/profile" element={<Profile userToken={userToken} userInfo={userInfo} setUserInfo={setUserInfo}/>}></Route>
        <Route path="/tickets" element={<Tickets userToken={userToken}/>}></Route>
      </Routes>
    </main>
    <footer style={{width: "100%", height: "83.14px"}}></footer>
    
  </>  
  )
}