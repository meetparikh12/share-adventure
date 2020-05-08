import * as actionTypes from '../actions/actionTypes';
const initialState = {
    places: [],
}
const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PLACES:
            return {
                ...state,
                places: action.payload
            }

            default:
                return {
                    ...state
                }
    }
}

export default placeReducer;