import { Container } from "../Today/Today"
import styled from 'styled-components'
import add from '../../assets/images/add.jpeg'
import { getHabits, postHabits } from "../../services/trackit";
import { useState, useEffect, useContext } from "react";
import Footer from "../Footer/Footer";
import { weekDays } from "../../WeekDays/weekday";
import UserContext from "../../context/UserContext";

export default function Habits() {
    const [habits, setHabits] = useState({})
    const [habitsAdd, setHabitsAdd] = useState(false)
    const { habitName, setHabitName } = useContext(UserContext)
    const [idDay, setIdDay] = useState([])
    const [day, setDay] = useState(weekDays)

    useEffect(() => {
        const promise = getHabits()
        promise.then((res) => setHabits(res.data))

    }, [])



    function selectDay(setIdDay, day) {

        if (idDay.includes(day.id)) {
            setIdDay(idDay.filter((item) => item !== day.id))
            day.selected = !day.selected
            return
        }

        setIdDay([...idDay, day.id])
        day.selected = !day.selected

    }

    function sendHabit() {

        setHabitsAdd(!setHabitsAdd)
        const body = { name: habitName, days: idDay }
        const promise = postHabits(body)
        promise.then(() => {
            setHabitName('')
            setIdDay('')
            {weekDays.map((day)=>day.selected=false)}
            
           const promise2=getHabits()
           promise2.then((res)=>setHabits(res.data))
        })
        
    }
    console.log(day)
    console.log(weekDays)
    return (
        <Container>
            <Higher>
                <h2>Meus Hábitos</h2>
                <img src={add} alt="buttonAdd"
                    onClick={() => setHabitsAdd(true)} />
            </Higher>
            <MyHabits>
                {!habitsAdd ? '' :
                    <Box>
                        <input
                            type='text'
                            placeholder="nome do hábito"
                            value={habitName}
                            onChange={(e) => setHabitName(e.target.value)} />
                        <BoxDay>
                            {weekDays.map((d) =>
                                <Days key={d.id} selected={d.selected}
                                    onClick={() => selectDay(setIdDay, d)}>
                                    {d.name}</Days>)}
                        </BoxDay>
                        <BoxButton>
                            <Button name={1}>Cancelar</Button>
                            <Button name={2} onClick={() => sendHabit()}>Salvar</Button>
                        </BoxButton>

                    </Box>}

                {habits.length > 0 ?
                    habits.map((item) =>
                        <BoxHabit key={item.id}>
                            <p>{item.name}</p>
                            <BoxDay>
                                {weekDays.map((d) =>
                                    <Days key={d.id} selected={item.days.includes(d.id) ?
                                        true : false}>
                                        {d.name}</Days>)}
                            </BoxDay>
                        </BoxHabit>) :
                    <p>{`Você não tem nenhum hábito cadastrado ainda.
                    Adicione um hábito para começar a trackear!`}</p>}
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
const Box = styled.div`
width: 340px;
height: 180px;
background: #FFFFFF;
border-radius: 5px;
display:flex;
flex-direction:column;
justify-content: center;
margin-bottom:20px;
position:relative;

input{
    margin:18px;
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
}
input::placeholder {
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
}


`
const BoxDay = styled.span`
display: flex;
margin:0px 20px;
`
const Days = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 30px;
height: 30px;
background: ${props => props.selected ? '#CFCFCF' : '#FFFFFF'} ;
border: 1px solid #D5D5D5;
border-radius: 5px;
display:flex;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: ${props => props.selected ? '#FFFFFF' : '#DBDBDB'} ;
`
const BoxButton =styled.div`
    display:flex;
    justify-content:flex-end;
`
const Button = styled.button` 
    margin:10px 5px;
    width: 84px;
    height: 35px;
    background-color: ${props => props.name === 1 ? '#FFFFFF' : '#52B6FF;'}; 
    border-radius: 4.63636px;
    border:none;
    color: ${props => props.name === 1 ? '#52B6FF' : '#FFFFFF'};
    
`
const BoxHabit = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin:10px;
    p{
        padding:10px 20px;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;

    }
`