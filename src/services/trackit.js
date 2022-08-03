import axios from 'axios'
const BaseURL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit'

function getLogin(body) {
    const promise = axios.post(`${BaseURL}/auth/login`, body);
    console.log(body)
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

    return promise 

}

function getToday (children) {
    console.log(children.token)
    const config = {
    	headers: {
		"Authorization": `Bearer ${children.token}`
	}
    }
    const promise = axios.get (`${BaseURL}/habits/today`, config)
    return promise
}

export { getLogin, getSignUp, getToday }