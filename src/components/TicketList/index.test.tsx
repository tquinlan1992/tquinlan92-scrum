import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { TicketList } from './';
import { forEach, get } from 'lodash';
import { getAnyJestFn } from '../../utils/testUtils';

configure({ adapter: new Adapter() });

const mockActions = {
    setShowAddTicketDialog: getAnyJestFn(),
    fetchTickets: getAnyJestFn(),
    addTicket: getAnyJestFn(),
    closeTicket: getAnyJestFn(),
    openAddTicketDialog: getAnyJestFn(),
    setTicketListState: getAnyJestFn(),
    onRemoveFromSprint: getAnyJestFn(),
    closeSprint: getAnyJestFn(),
    openCloseSprintDialog: getAnyJestFn(),
    updatePriorities: getAnyJestFn()
};

function testShowAddTicketDialogValue(showAddTicketDialog: boolean) {
    describe(`showAddTicketDialog as ${showAddTicketDialog}`, () => {
        it(`TicketList should show the addTicketDialog open as ${showAddTicketDialog}`, () => {
            const props = {
                showAddTicketDialog,
                showCloseSprintDialog: false,
                setShowAddTicketDialog: mockActions.setShowAddTicketDialog as any,
                fetchTickets: mockActions.fetchTickets as any,
                addTicket: mockActions.addTicket as any,
                closeTicket: mockActions.addTicket as any,
                addTicketToSprint: mockActions.addTicket as any,
                setTicketListState: mockActions.setTicketListState as any,
                setAddTicketDialogState: mockActions.setTicketListState as any,
                openAddTicketDialog: mockActions.openAddTicketDialog,
                onRemoveFromSprint: mockActions.onRemoveFromSprint,
                closeSprint: mockActions.closeSprint,
                openCloseSprintDialog: mockActions.openCloseSprintDialog,
                updatePriorities: mockActions.updatePriorities,
                backlogTickets: [{ title: 'backlogTicketTitle', description: 'backlogDescription', storyPoint: 3, _id: 'id1', deleted: false} as any],
                sprintTickets: [{ title: 'sprintTicketTitle', description: 'sprintDescription', storyPoint: 3, _id: 'id1', deleted: false} as any],
                closedTickets: [{ title: 'closedTicketTitle', description: 'closedDescription', storyPoint: 3, _id: 'id1', deleted: false} as any]
            };
            const result = shallow(<TicketList {...props} />);
            expect(result).toMatchSnapshot();
        });
    });
}

describe('describe when the TicketList Component is given', () => {
        testShowAddTicketDialogValue(true);
        testShowAddTicketDialogValue(false);
});

describe('when a user', () => {
    beforeEach(() => {
        forEach(mockActions, mockAction => {
            mockAction.mockClear();
        });
    });
    describe('requests to close addTicket', () => {
        it('setShowAddTicketDialog should be called with false', () => {
            const props = {
                showAddTicketDialog: false,
                showCloseSprintDialog: false,
                setShowAddTicketDialog: mockActions.setShowAddTicketDialog as any,
                fetchTickets: mockActions.fetchTickets as any,
                addTicket: mockActions.addTicket as any,
                closeTicket: mockActions.addTicket as any,
                addTicketToSprint: mockActions.addTicket as any,
                setTicketListState: mockActions.setTicketListState as any,
                setAddTicketDialogState: mockActions.setTicketListState as any,
                openAddTicketDialog: mockActions.openAddTicketDialog,
                onRemoveFromSprint: mockActions.onRemoveFromSprint,
                closeSprint: mockActions.closeSprint,
                openCloseSprintDialog: mockActions.openCloseSprintDialog,
                updatePriorities: mockActions.updatePriorities,
                backlogTickets: [{ title: 'backlogTicketTitle', description: 'backlogDescription', storyPoint: 3, _id: 'id1', deleted: false} as any],
                sprintTickets: [{ title: 'sprintTicketTitle', description: 'sprintDescription', storyPoint: 3, _id: 'id1', deleted: false} as any],
                closedTickets: [{ title: 'closedTicketTitle', description: 'closedDescription', storyPoint: 3, _id: 'id1', deleted: false} as any]
            };
            const result = shallow(<TicketList {...props} />);
            const dialogProps: any = result.find('Connect(AddTicketDialog)').props();
            dialogProps.onRequestClose();
            expect(props.setAddTicketDialogState.mock.calls).toMatchObject([
                [{ open: false }]
            ]);
        });
    });
});
