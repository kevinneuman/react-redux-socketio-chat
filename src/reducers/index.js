import { combineReducers } from 'redux';

import user from './userReducer';
import userlist from './userlistReducer';
import chat from './chatReducer';

export default combineReducers({
    user,
    userlist,
    chat
});
