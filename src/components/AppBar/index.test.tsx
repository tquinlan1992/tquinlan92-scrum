import { AppBar, mapStateToProps } from './';
import { shallow } from 'enzyme';
import * as React from 'react';
import { AppState } from '../../headless/store';
import { DeepPartial } from 'ts-essentials';
import { getMockState } from '@src/utils/testUtils';

describe('test snapshot of Loading component', () => {
    it('should render the loading screen when loading is true', () => {
        const props = {
            classes: {
                appBar: 'appBar',
                center: 'center'
            },
            loading: true,
            openAddTicketDialog: jest.fn(),
            history: {} as any,
            location: {
                path: '/feed'
            } as any,
            match: {} as any
        };
        const result = shallow(<AppBar {...props} />);
        expect(result).toMatchSnapshot();
    });
    it('should render the app when loading is false', () => {
        const props = {
            classes: {
                appBar: 'appBar',
                center: 'center'
            },
            loading: false,
            openAddTicketDialog: jest.fn(),
            history: {} as any,
            location: {
                path: '/feed'
            } as any,
            match: {} as any
        };
        const result = shallow(<AppBar {...props} />);
        expect(result).toMatchSnapshot();
    });
});

describe('mapStateToProps', () => {
    const state = getMockState({
        loading: {
            value: true
        }
    });
    const props = mapStateToProps(state);
    it('should have valid props', () => {
        expect(props).toEqual({
            loading: true
        })
    })
})
