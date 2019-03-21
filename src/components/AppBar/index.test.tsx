import { AppBar, mapStateToProps } from './';
import { shallow } from 'enzyme';
import * as React from 'react';
import { AppState } from '../../headless/store';

describe('test snapshot of Loading component', () => {
    it('should render the loading screen when loading is true', () => {
        const props = {
            classes: {
                appBar: 'appBar'
            },
            loading: true,
            openAddTicketDialog: jest.fn()
        };
        const result = shallow(<AppBar {...props} />);
        expect(result).toMatchSnapshot();
    });
    it('should render the app when loading is false', () => {
        const props = {
            classes: {
                appBar: 'appBar'
            },
            loading: false,
            openAddTicketDialog: jest.fn()
        };
        const result = shallow(<AppBar {...props} />);
        expect(result).toMatchSnapshot();
    });
});

describe('mapStateToProps', () => {
    const state: Partial<AppState> = {
        loading: {
            value: true
        }
    };
    const props = mapStateToProps(state);
    it('should have valid props', () => {
        expect(props).toEqual({
            loading: true
        })
    })
})
