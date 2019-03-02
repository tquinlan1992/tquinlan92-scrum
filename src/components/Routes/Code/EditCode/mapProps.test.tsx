import { mapStateToProps } from './mapProps';
import { AppState } from '@headless/store';

describe('mapStateToProps', () => {
    const state: Partial<AppState> = ({
        codeState: {
            editCode: {
                code: 'code'
            }
        }
    });
    const props = mapStateToProps(state as AppState)
    it('should return valid props', () => {
        expect(props).toEqual({
            code: 'code'
        })
    })
})