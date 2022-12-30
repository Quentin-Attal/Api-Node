import AuthService from '../services/auth.service';
import { defineStore } from 'pinia'

export type AuthState = {
    status: { loggedIn: boolean }, token: string
};

const token = localStorage.getItem('token');
const initialState: AuthState = !!token
    ? { status: { loggedIn: true }, token: token }
    : { status: { loggedIn: false }, token: "" };

export const authStore = defineStore({
    id: "authStore",
    state: () => {
        return initialState
    },
    actions: {
        login(user: { email: string, password: string }) {
            return AuthService.login(user).then(
                res => {
                    this.status.loggedIn = true;
                    this.token = res.token;
                    return Promise.resolve(token);
                },
                error => {
                    this.status.loggedIn = false;
                    return Promise.reject(error);
                })
        },
        logout() {
            this.status.loggedIn = false;
            this.token = "";
            AuthService.logout();
        },
        register(user: { email: string, password: string, password2: string, username: string }) {
            return AuthService.register(user).then(
                response => {
                    this.token = response.token
                    this.status.loggedIn = true;
                    return Promise.resolve(response.token);
                },
                error => {
                    this.token = "";
                    this.status.loggedIn = false;
                    return Promise.reject(error);
                }
            );
        }
    },

});