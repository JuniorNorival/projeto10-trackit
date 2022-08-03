import logo from '../../assets/images/Group 8.svg'
import { useState } from 'react'
import styled from 'styled-components'
import { getLogin } from '../../services/trackit'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleForm(e) {
        e.preventDefault();
        const promise = getLogin(user);
        promise.then((res) => console.log(res.data))

    }
    const user = { email: email, password: password }
    return (
        <Container>
            <img src={logo} alt='logo' />
            <Form onSubmit={handleForm}>
                <input type="email"
                    value={email}
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)} />
                <input type="password"
                    value={password}
                    placeholder="senha"
                    onChange={e => setPassword(e.target.value)} />

                <button type='submit'>
                    Entrar
                    {/* <ThreeDots color="#f9fcfd" height={80} width={80} /> */}
                </button>

            </Form>
            <Link to='/cadastro'>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100vh;
    width: 100vw;
    margin:0 auto;

p{
        font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
    }
`
const Form = styled.form`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:25px auto;

input{
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin:5px auto;
}
button {
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.64px;
    border:none;
    display:flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    color: #FFFFFF;
}
`
export { Container, Form }