import { combineReducers } from 'redux';

// Reducers
import loginReducer from './login-reducer';
import userReducer from './user-reducer';
import documentReducer from './document-reducer';
import searchLayoutReducer from './search-layout-reducer';
import filterReducer from './filter-reducer';
import shoeReducer from './shoe-reducer';

// Combine Reducers
var reducers = combineReducers({
    loginState: loginReducer,
    userState: userReducer,
    documentState: documentReducer,
    searchLayoutState: searchLayoutReducer,
    filterState: filterReducer,
    shoeState: shoeReducer
});

export default reducers;
