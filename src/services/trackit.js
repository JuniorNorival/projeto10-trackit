import axios from 'axios'
const BaseURL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit'

const userData = JSON.parse(localStorage.getItem('trackIt'))


function getLogin(body) {
    const promise = axios.post(`${BaseURL}/auth/login`, body);
    console.log(userData)
   
    return promise

}

function getSignUp(children) {
    const user = {
        email: children.email,
        name: children.name,
        password: children.password,
        image: children.image
    }
    const promise = axios.post(`${BaseURL}/auth/sign-up`, user);

    return promise

}

function getTodayHabits() {

    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    }
    const promise = axios.get(`${BaseURL}/habits/today`, config)
    return promise

}

function getHabits() {
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    }
    const promise = axios.get(`${BaseURL}/habits`, config)
    return promise
}

function postHabits (body){
    
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    }
    const promise = axios.post (`${BaseURL}/habits`,body, config)
    return promise
}

export { getLogin, getSignUp, getTodayHabits, getHabits, postHabits }