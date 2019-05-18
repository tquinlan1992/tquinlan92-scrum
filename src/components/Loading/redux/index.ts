import  { loadingThunkActions } from './thunkActions';
import { storeActions } from '../../../headless/store/index';
import { LoadingState } from '@headless/store/types';

export const loadingInitialState: LoadingState = {
    value: true
};

export const redux = {
    initialState: loadingInitialState
}

export { loadingThunkActions };
