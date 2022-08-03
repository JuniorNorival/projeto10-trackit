import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../Login/Login"
import SingUp from "../Sign-up/SignUp"
import GlobalStyle from "../../styles/GlobalStyle"

export default function App() {


    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path='/' element={<Login />} />  
                <Route path='/cadastro' element={<SingUp />} />
            </Routes>
        </BrowserRouter>

    )
}