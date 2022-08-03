import axios from 'axios'
const BaseURL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit'

function getLogin(user) {
    const promise = axios.post(`${BaseURL}/auth/login`, user);
    console.log(user)
    return promise

}

function getSignUp(children) {
    const user = {
        email: children.email,
        name: children.name,
        password:children.password,
        image:children.image
    }
    const promise = axios.post (`${BaseURL}/auth/sign-up`, user);
    console.log(user)
    return promise 

}

export { getLogin, getSignUp }