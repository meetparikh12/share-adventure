import * as actionTypes from './actionTypes';

export const setUserInfo = (userInfo) => {
    return {
        type: actionTypes.USER_LOGIN,
        payload: userInfo
        
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

export const deletePlace = (placeId) => {
    return {
        type: actionTypes.DELETE_PLACE,
        payload: placeId
    }
}