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

        case actionTypes.DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((place)=> place._id !== action.payload)
            }

            default:
                return {
                    ...state
                }
    }
}

export default placeReducer;