import logo from '../../assets/images/Group 8.svg'
import { useState } from 'react'
import styled from 'styled-components'
import { getLogin } from '../../services/trackit'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import Input from '../Input/Input'


export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [button, setButton] = useState({
        text: 'Entrar',
        disabled: false,
        isSelected: false,
    })

    const navigate = useNavigate();

    function handleForm({ name, value }) {
        setForm({
            ...form,
            [name]: value,
        });

    }

    function sendForm(e) {
        if (button.isSelected) {
            e.preventDefault();
            return
        }
        e.preventDefault();

        setButton({
            text: <ThreeDots color="#f9fcfd" height={80} width={80} />,
            disabled: true,
            isSelected: true
        })
        const promise = getLogin(body);
        promise.then((res) => {
            const user = res.data
            localStorage.setItem('trackIt', JSON.stringify(user))
            navigate('/hoje', { state: { user } })
        })
        promise.catch((res) => {
            alert(res.response.data.message)
            setButton({
                text: "Entrar",
                disabled: false,
                isSelected: false
            })
        })

    }
    const body = { email: form.email, password: form.password }

    return (
        <Container>

            <img src={logo} alt='logo' />
            <Form onSubmit={sendForm} button={button.disabled}>
                {Object.keys(form).map((name) =>
                    <Input
                        key={name}
                        name={name}
                        button={button.disabled}
                        handleForm={handleForm} />)}

                <button type='submit'>
                    {button.text}
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
    background-color:${props => props.button.disabled ? '#F2F2F2' : "#FFFFFF "};
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
    cursor:pointer;
    
}
`
export { Container, Form }