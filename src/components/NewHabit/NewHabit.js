import styled from 'styled-components'
import { weekDays } from "../../helpers/WeekDays/weekday";
import { useState } from 'react';
import { postHabits } from '../../services/trackit';

export default function NewHabit({ habitName, setHabitName, habitsAdd, setHabitsAdd }) {
    const [idDay, setIdDay] = useState([])

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

        })
        promise.catch(() => {
            alert('Erro ao Salvar Habito')
            setHabitsAdd({
                visible: true,
                disabled: false
            })
        })

    }

    function selectDay(setIdDay, day) {
        if (idDay.includes(day.id)) {
            setIdDay(idDay.filter((id) => id !== day.id))
            day.selected = !day.selected
            return
        }

        setIdDay([...idDay, day.id])
        day.selected = !day.selected

    }
    return (
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

        </Box>
    )
}

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
    cursor: pointer;
    
`