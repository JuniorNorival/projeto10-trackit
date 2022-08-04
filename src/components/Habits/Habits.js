import { Container } from "../Today/Today"
import styled from 'styled-components'
import add from '../../assets/images/add.jpeg'
import { getHabits } from "../../services/trackit";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";

export default function Habits() {
    const [habits, setHabits] = useState({})
    const promise = getHabits()
    useEffect(() => {
        promise.then((res) => setHabits(res.data))

    }, [])
    const text = 'Você não tem nenhum hábito cadastrado ainda.Adicione um hábito para começar a trackear!'
    return (
        <Container>
            <Higher>
                <h2>Meus Hábitos</h2>
                <img src={add} alt="buttonAdd" />
            </Higher>
            <MyHabits>
            {habits.length > 0 ? 'OPAAA' : <p>{text}</p>}
            </MyHabits>
            
            <Footer />
        </Container>

    )
}

const Higher = styled.div`

display:flex;
justify-content:space-between;
margin: 100px 18px 30px 18px;
align-items:center;

h2{
    font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
}
img {
    width: 40px;
    height: 35px;
}
`

const MyHabits = styled.div`
margin:0 20px;
p{
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666
}
`