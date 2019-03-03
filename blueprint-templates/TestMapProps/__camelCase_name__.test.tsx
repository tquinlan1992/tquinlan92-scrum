import { mapStateToProps } from './mapProps';
import { getPartialState } from '@src/utils/testUtils';

describe('mapStateToProps', () => {
    const state = getPartialState({
    });
    
    const props = mapStateToProps(state)
    it('should return valid props', () => {
        expect(props).toEqual({
        })
    })
})