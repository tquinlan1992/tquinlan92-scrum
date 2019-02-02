import { DraggableList } from './';
import { shallow } from 'enzyme';
import * as React from 'react';
import { AppState } from '../../headless/store';

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
            title: 'title'
        };
        const result = shallow(<DraggableList {...props} />);
        expect(result).toMatchSnapshot();
    });
});
