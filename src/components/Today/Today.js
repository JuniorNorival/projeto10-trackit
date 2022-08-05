import styled from 'styled-components'
import { getTodayHabits, checkHabit, unCheckHabit } from "../../services/trackit";
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import updateLocale from 'dayjs/plugin/updateLocale'
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { BoxHabit } from '../Habits/Habits';
import { CheckboxSharp } from 'react-ionicons'
import UserContext from "../../context/UserContext";
import { useContext } from 'react';

export default function Today() {

    const [habitsToday, setHabitsToday] = useState('')
    const promise = getTodayHabits();
    const { check, setCheck } = useContext(UserContext)
    const { setProgress } = useContext(UserContext);
    let cont=0;

    useEffect(() => {
        promise.then((res) => setHabitsToday(res.data))

        // eslint-disable-next-line
    }, [])

    dayjs.extend(updateLocale)
    dayjs.updateLocale('pt-br', {
        weekdays: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
    })
    const dia = dayjs().locale('pt-br').format('dddd, DD/MM');

    function markHabit(id, done) {
        console.log(done)
        if (!done) {
            checkHabit(id)
            if (check === habitsToday.length) {
                return
            }
            setCheck(check + 1)
        } else {
            unCheckHabit(id)
            if (check !== 0) {
                setCheck(check - 1)
            }
        }
        const promise = getTodayHabits();
        promise.then((res) => setHabitsToday(res.data))
        console.log('opa')
    }

    if (habitsToday.length > 0) {
        habitsToday.map((habit)=>{
            if(habit.done){
                cont++
                setCheck(cont)
            }
        })
        setProgress(check / habitsToday.length)

    }

    return (
        <Container>
            <h1>{dia}</h1>
            {habitsToday === '' ? '' :
                habitsToday.map((habit, index) =>
                    <BoxHabit key={habit.id} direction={'row'} >
                        <div>
                            <h2>{habit.name}</h2>
                            <Sequence check={habit.done}>Sequência atual:
                                <p>{habit.currentSequence} dias</p>
                            </Sequence>
                            <Sequence check={habit.currentSequence === habit.highestSequence &&
                                habit.highestSequence !== 0 ? true : false}
                            >Seu Recorde:
                                <p>{habit.highestSequence} dias</p>
                            </Sequence>
                        </div>
                        <Check >
                            <CheckboxSharp
                                color={habit.done === false ? '#EBEBEB' : '#8FC549'}
                                height="69px"
                                width="69px"
                                onClick={() => { markHabit(habit.id, habit.done) }}
                            />
                        </Check>
                    </BoxHabit>
                )}
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
    cursor:pointer;
`
const Sequence = styled.div`
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    display:flex;
    padding:0 20px;
    color: #666666;
    p{
        color: ${props => props.check ? '#8FC549' : '#666666'};
    }
    `

export { Container }