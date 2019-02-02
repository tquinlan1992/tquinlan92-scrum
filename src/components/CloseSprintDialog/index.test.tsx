import { CloseSprintDialog } from './';
import { shallow } from 'enzyme';
import * as React from 'react';
import { getAnyJestFn } from '../utils/testUtils';
import { mapStateToProps } from './';
import { AppState } from '../../headless/store';

describe('test snapshot of component', () => {
    it('should render', () => {
        const props = {
            onRequestClose: jest.fn(),
            open: true,
            onSubmit: jest.fn(),
            sprintName: 'sprintName',
            closeSprint: getAnyJestFn(),
            setCloseSprintDialogState: getAnyJestFn(),
            setAddTicketState: getAnyJestFn(),
            reset: getAnyJestFn()
        };
        const result = shallow(<CloseSprintDialog {...props} />);
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
