import { mapStateToProps } from './mapProps';

describe('mapStateToProps', () => {
    const state: Partial<AppState> = ({
        closeSprintDialog: {
            sprintName: 'sprintName'
        }
    });
    const ownProps = {
        onRequestClose: jest.fn(),
        open: false,
        onSubmit: jest.fn()
    }
    const props = mapStateToProps(state, ownProps)
    it('should return valid props', () => {
        expect(props).toEqual({
            sprintName: 'sprintName',
            ...ownProps
        })
    })
})