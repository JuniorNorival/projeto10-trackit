import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../Login/Login"
import SingUp from "../Sign-up/SignUp"
import GlobalStyle from "../../styles/GlobalStyle"
import Today from "../Today/Today"
import Header from "../Header/Header"
import Habits from "../Habits/Habits"
import UserContext from "../../context/UserContext"
import { useState } from "react"
import Historic from "../Historic/Historic"

export default function App() {

    
    const [progress, setProgress] = useState(0)
    
  
    return (

        <BrowserRouter>
            <UserContext.Provider value={{progress, setProgress}} >
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/cadastro' element={<SingUp />} />
                    <Route path='/hoje' element={<Today />} />
                    <Route path='/habitos' element={<Habits />} />
                    <Route path='/historico' element={<Historic />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>

    )
}