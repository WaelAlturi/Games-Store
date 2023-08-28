import axios from "axios";
import serverUrl from "../serverUrl";

export const GET_USER_CART = "GET_USER_CART";



export const getUserCartDispatch = (cart) => {
    return dispatch => {
        dispatch({ type: GET_USER_CART, cart })
    }
}

export const getUserCartAction = (cart) => {
    return dispatch => {
        axios.get(serverUrl.baseUrl + "/account/getAccountCart", {headers: { 'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")) }})
        .then(results => {
            dispatch(getUserCartDispatch(results.data.cart));
        })
        .catch(() => {
            throw new Error("Something went wrong");
        })
    }
}


export const removeFromCartAction = (itemId) => {
    return dispatch => {
        axios.get(`${serverUrl.baseUrl}/account/removeItemFromCart/${itemId}` , {headers: { 'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")) }})
        .then(results => {
            console.log(results.data.cart);
            dispatch(getUserCartDispatch(results.data.cart));
        })
        .catch(() => {
            throw new Error("Something went wrong");
        })
    }
}

export const removeAllFromCartAction = (itemId) => {
    return dispatch => {
        axios.get(`${serverUrl.baseUrl}/account/removeAllCart` , {headers: { 'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")) }})
        .then(results => {
            console.log(results.data.cart);
            dispatch(getUserCartDispatch(results.data.cart));
        })
        .catch(() => {
            throw new Error("Something went wrong");
        })
    }
}