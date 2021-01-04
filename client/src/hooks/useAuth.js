import React from 'react';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

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
                    .post(BASE_URL + "/api/users/login", userData)
                const user = {
                    token: data.token,
                };
                await SecureStorage.setItem('user', JSON.stringify(user));
                dispatch(createAction('SET_USER', user));
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
                    .post(BASE_URL + "/api/users/signin", userData);
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