import { useLocation, Link } from "react-router-dom"
import styled from 'styled-components'
import { getTodayHabits } from "../../services/trackit";
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";

export default function Today() {
    dayjs.locale('br')
    const { state } = useLocation();
    const [habits, setHabits] = useState({})
    localStorage.setItem('trackIt', JSON.stringify(state.user))
    const promise = getTodayHabits()
    const dia = dayjs().locale('pt-br').format('dddd, DD/MM')
    useEffect(() => {
        promise.then((res) => setHabits(res.data))
        
    }, [])
    
   

    return (
        <Container>
            <h1>{dia[0].toUpperCase() + dia.substring(1)}</h1>
            <Footer/>
        </Container>

    )
}


const Container = styled.div`
    width:100vw;
    height:100vh;
    margin: 80px auto;

    h1{
        margin-top:28px;
        margin-left:18px;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

`

export { Container}