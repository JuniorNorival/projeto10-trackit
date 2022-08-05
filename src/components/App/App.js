import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../Login/Login"
import SingUp from "../Sign-up/SignUp"
import GlobalStyle from "../../styles/GlobalStyle"
import Today from "../Today/Today"
import Header from "../Header/Header"
import Habits from "../Habits/Habits"
import UserContext from "../../context/UserContext"
import { useState } from "react"

export default function App() {

    
    const [progress, setProgress] = useState(0)
    const [check, setCheck] = useState(0)
    return (

        <BrowserRouter>
            <UserContext.Provider value={{progress, setProgress, check, setCheck}} >
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/cadastro' element={<SingUp />} />
                    <Route path='/hoje' element={<Today />} />
                    <Route path='/habitos' element={<Habits />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>

    )
}