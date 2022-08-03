import logo from '../../assets/images/Group 8.svg'
import { useState } from 'react'
import { Form, Container } from '../Login/Login'
import { getSignUp } from '../../services/trackit';
import { useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Input from '../Input/Input';

export default function SingUp() {

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        image: '',


    });
    const [button, setButton] = useState({
        text: 'Cadastrar',
        disabled: false,
        isSelected: false
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

        const promise = getSignUp(form);

        setTimeout(() => promise.then(() => {
            alert("Cadastro Realizado Com sucesso")
            navigate('/')
        }), 2000)


        promise.catch((res) => {
            alert(res.response.data.message)
            setButton({
                text: "Cadastrar",
                disabled: false,
                isSelected: false
            })
        })


    }

    return (
        <Container>
            <img src={logo} alt='logo' />
            <Form onSubmit={sendForm} button={button.disabled} >
                {Object.keys(form).map((name) =>
                    <Input
                        key={name}
                        name={name}
                        button={button.disabled}
                        handleForm={handleForm} />)}
                <button type='submit'>{button.text}</button>
            </Form>
            <Link to='/'>
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    )

}