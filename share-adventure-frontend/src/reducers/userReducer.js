import * as actionTypes from '../actions/actionTypes';

const intialState = {
     isUserLoggedIn: false,
     loginUserInfo: {},
     allUsers : []
}

export const userReducer = (state = intialState, action) => {
    
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            
            return {
                ...state,
                isUserLoggedIn: action.payload.isUserLoggedIn,
                loginUserInfo: action.payload.userInfo
            }
        
        case actionTypes.GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }

        default: return state;
    }
}
