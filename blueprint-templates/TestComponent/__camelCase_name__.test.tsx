import { Component } from './';
import { shallow } from 'enzyme';
import * as React from 'react';


describe('test snapshot of component', () => {
    it('should render', () => {
        const props = {

        };
        const result = shallow(<Component {...props} />);
        expect(result).toMatchSnapshot();
    });
});