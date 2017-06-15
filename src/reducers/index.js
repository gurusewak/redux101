import { combineReducers } from 'redux';
import BooksReducer from './reducers_books';
import ActiveBook from './reducers_active_book';

const rootReducer = combineReducers({
    books: BooksReducer,
    activebook: ActiveBook
});

export default rootReducer;
