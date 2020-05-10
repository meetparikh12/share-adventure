import * as actionTypes from '../actions/actionTypes';

const intialState = {
     loginUserInfo: {},
     allUsers : []
}

export const userReducer = (state = intialState, action) => {
    
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            
            return {
                ...state,
                loginUserInfo: action.payload
            }
        
        case actionTypes.GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }

        default: return state;
    }
}
