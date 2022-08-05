import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
import styled from 'styled-components'
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <Foot>
            <Link to='/habitos'>
                <p>Hábitos</p>
            </Link>
            <div>
                <Link to='/hoje'>
                    <CircularProgressbar value={0.66} maxValue={1}
                        text={'Hoje'}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })} />
                </Link>
            </div>
            <p>Histórico</p>
        </Foot>
    )
}

const Foot = styled.div`
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