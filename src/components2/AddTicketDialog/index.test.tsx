import * as React from 'react';
import { shallow, configure } from 'enzyme';
import { AddTicketDialog } from '.';
import * as _ from 'lodash';
import { getAnyJestFn } from '../../utils/testUtils';


const mockActions = {
    onRequestClose: getAnyJestFn(),
    addTicket: getAnyJestFn(),
    onSubmit: getAnyJestFn()
};

function testShowAddTicketDialogValue(open: boolean) {
    describe(`open as ${open}`, () => {
        it(`AddTicketDialog should show the addTicketDialog open property as ${open}`, () => {
            const props = {
                open,
                onRequestClose: mockActions.onRequestClose,
                addTicket: mockActions.addTicket as any,
                reset: jest.fn() as any,
                setAddTicketState: jest.fn() as any,
                onSubmit: mockActions.onSubmit,
                storyPoint: 5,
                description: 'description',
                title: 'title',
                classes: {
                    drawerPaper: 'drawerPaper',
                    form: 'form'
                }
            };
            const result = shallow(<AddTicketDialog {...props} />);
            expect(result).toMatchSnapshot();
        });
    });
}

describe('describe when the AddTicketDialog Component is given', () => {
    testShowAddTicketDialogValue(true);
    testShowAddTicketDialogValue(false);
});

describe('when a user', () => {
    beforeEach(() => {
        _.forEach(mockActions, mockAction => {
            mockAction.mockClear();
        });
    });
    describe('requests to close addTicket', () => {
        it('setShowAddTicketDialog should be called with false', () => {
            const props = {
                open: true,
                onRequestClose: mockActions.onRequestClose,
                addTicket: mockActions.addTicket as any,
                reset: jest.fn() as any,
                setAddTicketState: jest.fn() as any,
                onSubmit: mockActions.onSubmit,
                storyPoint: 5,
                description: 'description',
                title: 'title',
                classes: {
                    drawerPaper: 'drawerPaper',
                    form: 'form'
                }
            };
            const result = shallow(<AddTicketDialog {...props} />);
        });
    });
});
