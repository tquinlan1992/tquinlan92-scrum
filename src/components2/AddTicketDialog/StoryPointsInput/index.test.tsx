import { getAnyJestFn } from '../../../utils/testUtils';
jest.mock('shortid', () => {
    let count = 0;
    return () => {
        count = count + 1;
        return String(count);
    }
});
import { StoryPointsInputComponent } from '.';
import { shallow } from 'enzyme';
import * as React from 'react';


describe('test snapshot of component', () => {
    it('should render', () => {
        const props = {
            storyPoint: 3,
            setAddTicketState: getAnyJestFn()
        };
        const result = shallow(<StoryPointsInputComponent {...props} />);
        expect(result).toMatchSnapshot();
    });
});
