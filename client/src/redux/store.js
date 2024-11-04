import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import statement
import rootReducer from '../reducer/index'; // Adjust the path as necessary

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
