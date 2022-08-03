import headerLogo from '../../assets/images/TrackIt.svg'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import UserContext from '../../context/UserContext';
import { useState, useContext } from 'react';

export default function Header() {
    const location = useLocation();
    const { userData, setUserdata } = useContext(UserContext);

    console.log(location)
    if (location.pathname === '/' || location.pathname === '/cadastro') {
        return ''
    } else {
        return (
            <Head>
                <img src={headerLogo} alt="logoHeader" />
                <ImgUser>
                    <img src={userData.image} alt="UserIMG" />
                </ImgUser>
            </Head>
        )
    }

}

const Head = styled.div`
    width: 100vw;
    height: 70px;
    left: 0px;
    top: 0px;
    position:fixed;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display:flex;
    align-items: center;
    justify-content: space-between;
img {
    margin:10px 18px;
}
`
const ImgUser = styled.div`
img{
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
    object-fit: cover;
}
    
    
`