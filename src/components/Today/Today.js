import styled from 'styled-components'
import { getTodayHabits } from "../../services/trackit";
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import updateLocale from 'dayjs/plugin/updateLocale'
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { BoxHabit } from '../Habits/Habits';
import { CheckboxSharp } from 'react-ionicons'

export default function Today() {
    console.log('oi')
    const [habitsToday, setHabitsToday] = useState('')
    const promise = getTodayHabits();

    useEffect(() => {
        promise.then((res) => setHabitsToday(res.data))
        // eslint-disable-next-line
    }, [1])

    dayjs.extend(updateLocale)
    dayjs.updateLocale('pt-br', {
        weekdays: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
    })
    const dia = dayjs().locale('pt-br').format('dddd, DD/MM')


    console.log(habitsToday)
    return (

        <Container>
            <h1>{dia}</h1>
            {habitsToday === '' ? '' :
                habitsToday.map((habit) =>
                    <BoxHabit key={habit.id} direction={'row'}>
                        <div>
                        <h2>{habit.name}</h2>
                        
                            <p>Sequência atual:{habit.currentSequence}</p>
                            <p>Seu Recorde:{habit.highestSequence}</p>
                        </div>

                        <Check>

                            <CheckboxSharp
                                color={habit.done === false ? '#EBEBEB' : '#8FC549'}
                                height="69px"
                                width="69px"
                            />
                        </Check>
                    </BoxHabit>)}
            <Footer />
        </Container>

    )
}


const Container = styled.div`
    width:100%;
    height:100%;
    margin: 80px auto 120px auto;
    
    h1{
        margin-top:28px;
        margin-left:18px;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

`
const Check = styled.div`
width: 69px;
height: 69px;
right: 13px;
top: 13px;
position: absolute;
border-radius: 5px;
`

export { Container }