import * as actionTypes from './actionTypes';

export const setIsUserLoggedIn = (isUserLoggedIn) => {
    return {
        type: actionTypes.USER_LOGIN,
        payload: isUserLoggedIn
    }
}
export const userCreationError = (error) => {
    return {
        type: actionTypes.USER_CREATION_ERROR,
        payload: error
    }
}