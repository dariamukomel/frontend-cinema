import MainPage from "./MainPage"
import Header from "./Header"
import { useEffect, useState } from "react"


export default function App(){
  const [logIn, setLogIn] = useState(false)
  return(
    <>
      <Header logIn={logIn}/>
    </>
    
  )
}