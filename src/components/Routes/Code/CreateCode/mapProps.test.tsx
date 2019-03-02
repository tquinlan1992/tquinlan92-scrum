import { mapStateToProps } from './mapProps';
import { getPartialState } from '@utils/testUtils';

describe('mapStateToProps', () => {
    const state = getPartialState({
        codeState: {
            createCode: {
                code: 'code'
            }
        }
    });
    const props = mapStateToProps(state)
    it('should return valid props', () => {
        expect(props).toEqual({
            sprintName: 'sprintName',
        })
    })
})