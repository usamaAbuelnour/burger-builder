import axios from "axios";

export const signUp = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6ouy9d-w1Z7F6VpEUEGgluL1LW8S0M7Q'
});

export const signIn = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6ouy9d-w1Z7F6VpEUEGgluL1LW8S0M7Q'
});