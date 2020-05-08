import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import errorReducer from './errorReducer';
import placeReducer from './placeReducer';

const rootReducer = combineReducers({
    user: userReducer,
    error: errorReducer,
    place: placeReducer
});

export default rootReducer;