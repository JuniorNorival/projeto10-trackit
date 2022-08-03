import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../Login/Login"
import SingUp from "../Sign-up/SignUp"
import GlobalStyle from "../../styles/GlobalStyle"
import Today from "../Today/Today"
import Header from "../Header/Header"
import UserContext from "../../context/UserContext";
import { useState } from "react"

export default function App() {
const [userData, setUserData] = useState({})

    return (

        <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/cadastro' element={<SingUp />} />
                    <Route path='/hoje' element={<Today />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>

    )
}