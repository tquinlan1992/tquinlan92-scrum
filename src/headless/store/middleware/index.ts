// import saveToLocalStorageState from './saveToLocalStorageState';
import thunk from 'redux-thunk';
import { router } from './router';
import logger from 'redux-logger';

export const middleware = [
    // saveToLocalStorageState,
    router,
    thunk,
    logger
];
