import { Loading } from './';
import { shallow } from 'enzyme';
import * as React from 'react';
import { getAnyJestFn } from '../../utils/testUtils';

describe('test snapshot of Loading component', () => {
    it('should render the loading screen when loading is true', () => {
        const props = {
            loading: true,
            loadApp: getAnyJestFn()
        };
        const result = shallow(<Loading {...props} />);
        expect(result).toMatchSnapshot();
    });
    it('should render the app when loading is false', () => {
        const props = {
            loading: false,
            loadApp: getAnyJestFn()
        };
        const result = shallow(<Loading {...props} />);
        expect(result).toMatchSnapshot();
    });
});
