import { useLocation } from "react-router-dom"
import styled from 'styled-components'
import { getToday } from "../../services/trackit";
import UserContext from '../../context/UserContext';
import { useContext } from 'react';


export default function Today() {
    const { state } = useLocation();
    const { userData, setUserData } = useContext(UserContext);
    console.log(userData)
    setUserData(state.user)
    getToday(userData)
    return (
        null
    )
}

const HeadImg = styled.div`
img{
    width: 51px;
    height: 51px;
    left: calc(100% - 80px);
    top: 9px;
    position:fixed;
    border-radius: 98.5px;
    z-index: 3;
}
    
`