import { SelectCode } from './';
import { shallow } from 'enzyme';
import * as React from 'react';
import { AppState } from '@headless/store';
import { mapStateToProps } from '../EditCode/mapProps';
import { getPartialState } from '@utils/testUtils';

describe('test snapshot of SelectCode', () => {
    it.only('should render', () => {
        const props = {

        };
        const result = shallow(<SelectCode {...props} />);
        expect(result).toMatchSnapshot();
    });
});

describe('mapStateToProps', () => {
    const state = getPartialState({
        closeSprintDialog: {
            sprintName: 'sprintName'
        }
    });
    const ownProps = {
        onRequestClose: jest.fn(),
        open: false,
        onSubmit: jest.fn()
    }
    const props = mapStateToProps(state)
    it('should return valid props', () => {
        expect(props).toEqual({
            sprintName: 'sprintName',
            ...ownProps
        })
    })
})