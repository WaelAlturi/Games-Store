import { 
    GET_USER_CART
} from './actions';


const intialState = {
    Cart: null
}

// eslint-disable-next-line
export default (state = intialState, action) => {
    switch(action.type) {
        case GET_USER_CART:
            return {
                ...state,
                Cart: action.cart
            }
        default:
            return state
    }
}