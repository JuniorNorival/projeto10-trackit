import { Container } from "../Today/Today"
import styled from 'styled-components'
import add from '../../assets/images/add.jpeg'
import { getHabits, postHabits, deleteHabit } from "../../services/trackit";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import { weekDays } from "../../WeekDays/weekday";

import { TrashOutline } from 'react-ionicons'


export default function Habits() {
    const [ habits, setHabits ] =  useState({})
    const [habitsAdd, setHabitsAdd] = useState({
        visible: false,
        disabled: false
    })
    const [habitName, setHabitName] = useState('')
    const [idDay, setIdDay] = useState([])

    useEffect(() => {
        const promise = getHabits()
        promise.then((res) => setHabits(res.data))
        // eslint-disable-next-line
    }, [])

    function selectDay(setIdDay, day) {

        if (idDay.includes(day.id)) {
            setIdDay(idDay.filter((id) => id !== day.id))
            day.selected = !day.selected
            return
        }

        setIdDay([...idDay, day.id])
        day.selected = !day.selected

    }

    function sendHabit() {

        const body = { name: habitName, days: idDay }
        const promise = postHabits(body)
        promise.then(() => {
            setHabitName('')
            setIdDay('')
            weekDays.map((day) => day.selected = false)
            setHabitsAdd({
                visible: false,
                disabled: true
            })
            const promise2 = getHabits()
            promise2.then((res) => setHabits(res.data))
        })
        promise.catch(() => {
            alert('Erro ao Salvar Habito')
            setHabitsAdd({
                visible: true,
                disabled: false
            })
        })

    }
    function delHabit(id) {

        const confirm = window.confirm('Tem Certeza ?');
        if (confirm) {
            deleteHabit(id)
            const promise = getHabits()
            promise.then((res) => setHabits(res.data))
        }
        return

    }


    return (
        <Container>
            <Higher>
                <h2>Meus Hábitos</h2>
                <img src={add} alt="buttonAdd"
                    onClick={() => setHabitsAdd({ visible: true, disabled: false })} />
            </Higher>
            <MyHabits>
                {!habitsAdd.visible ? '' :
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
                            <Button
                                name={1}
                                onClick={() => {
                                    setHabitsAdd({
                                        visible: false,
                                        disabled: false
                                    })
                                }}
                                disabled={habitsAdd.disabled}>Cancelar</Button>
                            <Button
                                name={2}
                                onClick={() => sendHabit()}
                                disabled={habitsAdd.disabled}>Salvar</Button>
                        </BoxButton>

                    </Box>}

                {habits.length > 0 ?
                    habits.map((habit) =>
                        <BoxHabit key={habit.id} direction={'column'}>
                            <h2>{habit.name}</h2>
                            <BoxDay>
                                {weekDays.map((d) =>
                                    <Days key={d.id} selected={habit.days.includes(d.id) ?
                                        true : false}>
                                        {d.name}</Days>)}
                            </BoxDay>
                            <Trash onClick={() => delHabit(habit.id)}>
                                <TrashOutline
                                    color={'#00000'}
                                    height="15px"
                                    width="13px"
                                />
                            </Trash>
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
    cursor: pointer;
}

`

const MyHabits = styled.div`

width: 100%;
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
margin:20px auto;
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
margin: 0 2px;
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
cursor: pointer;
`
const BoxButton = styled.div`
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
    margin:10px auto;
    position: relative;
    display:flex;
    flex-direction: ${props => props.direction === 'column' ? 'column' : 'row'};

    h2{
        padding:10px 20px;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;

    }
`

const Trash = styled.span`
        position:absolute;
        top:5px;
        right:5px;
        cursor: pointer;
`

export { BoxHabit }