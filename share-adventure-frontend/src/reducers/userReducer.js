import * as actionTypes from '../actions/actionTypes';

const intialState = {
     isUserLoggedIn: false,
     user: {}
}

export const userReducer = (state = intialState, action) => {
    
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            
            return {
                ...state,
                isUserLoggedIn: action.payload.isUserLoggedIn,
                user: action.payload.userInfo
            }

        default: return state;
    }
}
