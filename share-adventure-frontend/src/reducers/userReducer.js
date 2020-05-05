import * as actionTypes from '../actions/actionTypes';

const intialState = {
     isUserLoggedIn: false
}

export const userReducer = (state = intialState, action) => {
    
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            
            return {
                ...state,
                isUserLoggedIn: action.payload
            }

        default: return state;
    }
}
