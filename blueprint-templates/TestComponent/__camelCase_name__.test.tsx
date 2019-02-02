import { Component } from './';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('test snapshot of component', () => {
    it('should render', () => {
        const props = {

        };
        const result = shallow(<Component {...props} />);
        expect(result).toMatchSnapshot();
    });
});

describe('mapStateToProps', () => {
    const state: Partial<AppState> = ({
        closeSprintDialog: {
            sprintName: 'sprintName'
        }
    });
    const ownProps = {
        onRequestClose: jest.fn(),
        open: false,
        onSubmit: jest.fn()
    }
    const props = mapStateToProps(state, ownProps)
    it('should return valid props', () => {
        expect(props).toEqual({
            sprintName: 'sprintName',
            ...ownProps
        })
    })
})