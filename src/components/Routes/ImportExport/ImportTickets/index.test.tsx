import { ImportTickets } from './';
import { shallow } from 'enzyme';
import * as React from 'react';
import { getAnyJestFn } from '../../../../utils/testUtils';

describe('test snapshot of component', () => {
    it('should render', () => {
        const props = {
            importTickets: getAnyJestFn()
        };
        const result = shallow(<ImportTickets {...props} />);
        expect(result).toMatchSnapshot();
    });
});
