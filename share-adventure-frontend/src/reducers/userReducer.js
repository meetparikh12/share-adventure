import * as actionTypes from '../actions/actionTypes';

const intialState = {
     isUserLoggedIn: false
}

export const userReducer = (state = intialState, action) => {
    
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            
            return {
                ...state,
                isUserLoggedIn: true
            }

        default: return state;
    }
}
