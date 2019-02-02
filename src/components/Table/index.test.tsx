import { TicketTable } from './';
import { shallow } from 'enzyme';
import * as React from 'react';

const ticket = {
    title: 'title',
    storyPoint: 3,
    description: 'description',
    deleted: true,
    closed: true,
    sprint: true,
    sprintName: 'sprintName',
    priority: 0,
    _id: '_id'
};

describe('test snapshot of component', () => {
    it('should render', () => {
        const props = {
            tickets: [
                ticket,
                {
                    ...ticket,
                    closed: false,
                },
                {
                    ...ticket,
                    closed: false,
                    
                }
            ],
            onClose: jest.fn(),
            onAddTicketToSprint: jest.fn(),
            onRemoveFromSprint: jest.fn(),
            title: 'title'
        };
        const result = shallow(<TicketTable {...props} />);
        expect(result).toMatchSnapshot();
    });
});
