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

export const getAllUsers = (users) => {
    return {
        type: actionTypes.GET_ALL_USERS,
        payload: users
    }
}

export const getAllPlaces = (places) => {
    return {
        type: actionTypes.GET_ALL_PLACES,
        payload: places
    }
}