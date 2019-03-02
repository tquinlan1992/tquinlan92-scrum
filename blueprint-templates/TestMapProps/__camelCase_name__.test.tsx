import { mapStateToProps } from './mapProps';
import { getPartialState } from '@utils/testUtils';

describe('mapStateToProps', () => {
    const state = getPartialState({
    });
    const ownProps = {
    }
    const props = mapStateToProps(state, ownProps)
    it('should return valid props', () => {
        expect(props).toEqual({
        })
    })
})