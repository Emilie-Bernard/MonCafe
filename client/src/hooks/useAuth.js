import React from 'react';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';
import jwt_decode from "jwt-decode";

import { BASE_URL } from '../config';
import { createAction } from '../utils/createAction';
import { sleep } from '../utils/sleep';

export function useAuth() {
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case 'SET_USER':
                    return {
                        ...state,
                        loading: false,
                        user: { ...action.payload },
                    };
                case 'REMOVE_USER':
                    return {
                        ...state,
                        user: undefined,
                    };
                case 'SET_LOADING':
                    return {
                        ...state,
                        loading: action.payload,
                    }; 
                case 'REFRESH_USER':
                    return {
                        ...state,
                        user: { ...action.payload },
                    };
                default:
                    return state;
            }
        },
        {
            user: undefined,
            loading: true,
        },
    );
    const auth = React.useMemo(
        () => ({
            login: async (email, password) => {
                const userData = {
                    email,
                    password
                };
                const { data } = await axios
                    .post(BASE_URL + "/api/users/login", userData).catch(function (error) {
                        console.log(error);
                    });
                const user = {
                    token: data.token,
                };
                const decoded = jwt_decode(user.token);
                await SecureStorage.setItem('user', JSON.stringify(decoded));
                dispatch(createAction('SET_USER', decoded));
            },
            logout: async () => {
                await SecureStorage.removeItem('user');
                dispatch(createAction('REMOVE_USER'));
            },
            register: async (name, email, password, password2) => {
                await sleep(2000);
                const userData = {
                    name,
                    email,
                    password,
                    password2
                };
                const response = await axios
                    .post(BASE_URL + "/api/users/signin", userData).catch(function (error) {
                        console.log(error);
                    });
            },
            refresh: async (id) => {
                const userData = {
                    id,
                };
                const { data } = await axios
                    .post(BASE_URL + "/api/users/refresh", userData).catch(function (error) {
                        console.log(error);
                    });
                const user = {
                    token: data.token,
                };
                const decoded = jwt_decode(user.token);
                await SecureStorage.setItem('user', JSON.stringify(decoded));
                dispatch(createAction('REFRESH_USER', decoded));
            },
        }),
        []
    );
    React.useEffect(() => {
        SecureStorage.getItem('user').then(user => {
            if (user) {
                dispatch(createAction('SET_USER', JSON.parse(user)));
            }
            dispatch(createAction('SET_LOADING', false));
        });
    }, []);
    return { auth, state };
}