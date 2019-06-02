import { mapStateToProps } from './mapProps';
import { AppState } from '../../../headless/store';

describe('mapStateToProps', () => {
    const state: Partial<AppState> = {
        addTicket: {
            storyPoint: 2
        }
    }
    const props = mapStateToProps(state);
    it('should return valid props', () => {
        expect(props).toEqual({
            storyPoint: 2
        })
    })
})