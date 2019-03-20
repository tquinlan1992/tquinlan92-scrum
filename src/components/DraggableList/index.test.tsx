import { DraggableList } from './';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('test snapshot of component', () => {
    it('should render', () => {
        const props = {
            listItems: [
                {
                    _id: '_id1',
                    title: 'title1'
                },
                {
                    _id: '_id2',
                    title: 'title2'
                }
            ],
            updateItems: jest.fn(),
            firstTable: {
                elementId: 'firstTable',
                title: 'firstTableTile',
                items: [{
                    _id: 'firstTableItem_id',
                    title: 'firstTableItem_title',
                    description: 'firstTableItem_description'
                }],
                update: jest.fn() as any
            },
            secondTable: {
                elementId: 'secondTable',
                title: 'secondTableTile',
                items: [{
                    _id: 'secondTableItem_id',
                    title: 'secondTableItem_title',
                    description: 'secondTableItem_description'
                }],
                update: jest.fn() as any
            }
        };
        const result = shallow(<DraggableList {...props} />);
        expect(result).toMatchSnapshot();
    });
});
