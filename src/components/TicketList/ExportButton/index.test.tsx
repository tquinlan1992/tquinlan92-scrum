import { ExportButton } from './';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('test snapshot of component', () => {
    it('should render', () => {
        const props = {
            exportTickets: jest.fn()
        };
        const result = shallow(<ExportButton {...props} />);
        expect(result).toMatchSnapshot();
    });
});