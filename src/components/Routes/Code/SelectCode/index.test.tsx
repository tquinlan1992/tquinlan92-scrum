import { SelectCode } from './';
import { shallow } from 'enzyme';
import * as React from 'react';
import { AppState } from '@headless/store';
import { mapStateToProps } from '../EditCode/mapProps';
import { getPartialState } from '@src/utils/testUtils';

describe('test snapshot of SelectCode', () => {
    describe('with no options', () => {
    it('should render', () => {
        const props = {
            loadCodeOptions: jest.fn(),
            options: [
            ]
        };
        const result = shallow(<SelectCode {...props} />);
        expect(result).toMatchSnapshot();
    });
});
describe('with one option', () => {
    it('should render', () => {
        const props = {
            loadCodeOptions: jest.fn(),
            options: [
                {
                    _id: '_id1',
                    name: 'name1'
                }
            ]
        };
        const result = shallow(<SelectCode {...props} />);
        expect(result).toMatchSnapshot();
    });
});
describe('with two options', () => {
    it('should render', () => {
        const props = {
            loadCodeOptions: jest.fn(),
            options: [
                {
                    _id: '_id1',
                    name: 'name1'
                },
                {
                    _id: '_id2',
                    name: 'name2'
                }
            ]
        };
        const result = shallow(<SelectCode {...props} />);
        expect(result).toMatchSnapshot();
    });
});
});