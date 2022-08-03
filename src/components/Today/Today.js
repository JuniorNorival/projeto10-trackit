import { useLocation } from "react-router-dom"
import styled from 'styled-components'
import { getToday } from "../../services/trackit";
import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";

export default function Today() {
    dayjs.locale('br')
    const { state } = useLocation();
    const { userData, setUserData } = useContext(UserContext);
    console.log(userData)
    setUserData(state.user)
    if (userData.length > 0) {
        getToday(userData)
    }

    const dia = dayjs().locale('pt-br').format('dddd, DD/MM')
    const percentage = 66
    return (
        <Container>
            <h1>{dia[0].toUpperCase() + dia.substring(1)}</h1>
            <Footer>
                <p>Hábitos</p>
                <div>
                    <CircularProgressbar value={0.66} maxValue={1}
                        text={'Hoje'}
                        background
                        backgroundPadding={6} 
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })} />;
                </div>
                <p>Histórico</p>
            </Footer>
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
const Footer = styled.div`
    width: 100vw;
    height: 70px;
    left: 0px;
    bottom: 0px;
    position: fixed;
    background: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
        width: 90px;
        margin-bottom:40px;
        }

    div h2{
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #FFFFFF;

    }
    p{
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #52B6FF;
    }
`