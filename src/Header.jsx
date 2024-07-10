import logo1 from "./assets/logo1.svg"
import user from "./assets/user.svg"
import ticket from "./assets/ticket.svg"
import exit from "./assets/exit.svg"

import { Routes, Route, NavLink, Outlet } from "react-router-dom"
import Login from "./Login"
import MainPage from "./MainPage"



export default function Header({logIn}){
    return(
      <>
      <header className="header">
        <div className="header-inside">
          <div className="header-left">
            <div style={{display:"flex", alignIitems: "center"}}> 
              <div style={{display:"flex", flexDirection: "column", justifyContent: "flex-end"}}>
                <h5 className="logo-text">Шифт</h5>
                <h5 className="logo-text">Cinema</h5>
              </div>
              <img src={logo1} ></img>
            </div>
            {logIn && <>
              <div className="user">
                <img src={user}></img>
                <h3 className="header-text">Профиль</h3>
              </div>
              <div className="tickets">
                <img src={ticket}></img>
                <h3 className="header-text">Билеты</h3>
              </div>
            </>}
          </div>
          <div className="exit">
            <a href="#"><img src={exit} className="exit-img"></img> </a>
            {logIn?
              <h3 className="header-text"><a href="#">Выйти</a></h3>
            :
              <h3 className="header-text"><NavLink to="/login">Войти</NavLink></h3>
            }
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </main>
      <footer style={{width: "100%", height: "83.14px"}}></footer>
      
    </>  
    )
  }