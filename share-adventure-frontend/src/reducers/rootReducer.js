import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import placeReducer from './placeReducer';

const rootReducer = combineReducers({
    user: userReducer,
    place: placeReducer
});

export default rootReducer;