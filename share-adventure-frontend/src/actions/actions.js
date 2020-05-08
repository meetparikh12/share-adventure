import * as actionTypes from './actionTypes';

export const setUserInfo = (isUserLoggedIn, userInfo) => {
    return {
        type: actionTypes.USER_LOGIN,
        payload: {
            isUserLoggedIn,
            userInfo
        }
    }
}
export const userCreationError = (error) => {
    return {
        type: actionTypes.USER_CREATION_ERROR,
        payload: error
    }
}
