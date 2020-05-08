import * as actionTypes from '../actions/actionTypes';
const initialState = {
    userCreationErros : [],
}
const errorReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.USER_CREATION_ERROR:
            return {
                ...state,
                userCreationErros: action.payload
            }

        default: 
            return {
            ...state
            }
    }
}

export default errorReducer;