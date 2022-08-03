import logo from '../../assets/images/Group 8.svg'
import { useState } from 'react'
import { Form, Container } from '../Login/Login'
import { getSignUp } from '../../services/trackit';
import { useNavigate, Link } from 'react-router-dom';

export default function SingUp() {
    const [form, setForm] = useState({
        email: '',
        name: '',
        image: '',
        password: ''

    });

    const navigate = useNavigate();

    function handleForm({ name, value }) {
        console.log(name, value);
        setForm({
            ...form,
            [name]: value,
        });
        console.log(form)
    }
    function sendForm(e) {
        e.preventDefault();

        const promise = getSignUp(form);

        promise.then(() => {
            alert("Cadastro Realizado Com sucesso")
            navigate('/')
        })
    }
    return (
        <Container>
            <img src={logo} alt='logo' />
            <Form onSubmit={sendForm} >
                <input type="email"
                    name='email'
                    placeholder="email"
                    onChange={(e) =>
                        handleForm({
                            name: e.target.name,
                            value: e.target.value,
                        })
                    } />
                <input type="password"
                    name="password"
                    placeholder="senha"
                    onChange={(e) =>
                        handleForm({
                            name: e.target.name,
                            value: e.target.value,
                        })
                    } />
                <input type="name"
                    name="name"
                    placeholder="nome"
                    onChange={(e) =>
                        handleForm({
                            name: e.target.name,
                            value: e.target.value,
                        })
                    } />
                <input type="text"
                    name="image"
                    placeholder="foto"
                    onChange={(e) =>
                        handleForm({
                            name: e.target.name,
                            value: e.target.value,
                        })
                    } />

                <button type='submit'>Cadastrar</button>
            </Form>
            <Link to='/'>
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    )

}