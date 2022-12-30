import axios, { type AxiosResponse } from 'axios';

const API_URL = "http://localhost:3000/";

// service qui va nous permettre de nous authentifier
class AuthService {
    // method login 
    login(user: { email: string, password: string }) {
        return axios.post(API_URL + "login", {
            email: user.email,
            password: user.password
        })
            .then((resp: AxiosResponse<{ token: string }, any>) => {
                if (resp.data.token) {
                    localStorage.setItem('token', resp.data.token)
                    return { token: resp.data.token }
                } else {
                    throw new Error("no token");

                }
            })
    }

    logout() {
        localStorage.removeItem('token');
    }

    register(user: { email: string, password: string, password2: string, username: string }) {
        return axios.post(API_URL + "register", {
            email: user.email,
            password: user.password,
            password2: user.password2,
            username: user.username,
        }).then((resp: AxiosResponse<{ token: string }, any>) => {
            if (resp.data.token) {
                localStorage.setItem('token', resp.data.token)
                return { token: resp.data.token }
            } else {
                throw new Error("no token");
            }
        })
    }
}

export default new AuthService();