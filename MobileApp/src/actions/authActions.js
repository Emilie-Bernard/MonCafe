import axios from "axios";
import setAuthToken from "../components/setAuthToken";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    REFRESH_CURRENT_USER
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("http://ec2-35-180-98-159.eu-west-3.compute.amazonaws.com:5000/api/users/signin", userData)
        .then(res => history.push("/log-in")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("http://ec2-35-180-98-159.eu-west-3.compute.amazonaws.com:5000/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            AsyncStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            console.log("OK");
            () => this.props.navigation.navigate("Product");
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                dispatch({
                    type: GET_ERRORS,
                    payload: error.response.data
                });
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
};

// Login - get user token
export const refreshToken = userData => dispatch => {
    axios
        .post("ec2-35-180-98-159.eu-west-3.compute.amazonaws.com:5000/api/users/refresh", userData)
        .then(res => {
            const { token } = res.data;
            AsyncStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(refreshUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const refreshUser = decoded => {
    return {
        type: REFRESH_CURRENT_USER,
        payload: decoded
    };
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    AsyncStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

//useless for now NEED TO BE IMPLEMENTED
export const uploadPicture = (file, userData) => dispatch => {
    var ret = "";
    axios
        .post("ec2-35-180-98-159.eu-west-3.compute.amazonaws.com:5000/api/users/uploadPicture", file)
        .then(res => {
            loginUser(userData)
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
    return (ret);
}