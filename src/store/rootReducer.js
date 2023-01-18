import { combineReducers } from 'redux';

import loginReducer from './loginReducer'

const rootReducer = combineReducers({
    loginUser: loginReducer
});

export default rootReducer;