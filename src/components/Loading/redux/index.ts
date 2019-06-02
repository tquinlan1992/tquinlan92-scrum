import  { loadingThunkActions } from './thunkActions';
import { storeActions } from '../../../headless/store/index';
import { LoadingState } from '@headless/store/types';
import { mergeStateWithActions } from 'tquinlan92-typescript-redux-utils';

export const initialState: LoadingState = {
    value: true
};

export const loadingInitialState = mergeStateWithActions(initialState);

export const redux = {
    initialState: loadingInitialState
}

export { loadingThunkActions };
