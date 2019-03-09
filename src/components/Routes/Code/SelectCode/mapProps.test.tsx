import { mapStateToProps } from './mapProps';
import { getPartialState } from '@src/utils/testUtils';

describe('mapStateToProps', () => {
    const state = getPartialState({
        codeState: {
            selectCode: {
             options: [
                    {
                        _id: '_id'
                    }
                ]
            },
            editCode: {
                _id: 'editCodeId'
            }
        }
    });

    const props = mapStateToProps(state)
    it('should return valid props', () => {
        expect(props).toEqual({
            options: [
                {
                    _id: '_id'
                }
            ],
            _id: 'editCodeId'
        })
    })
})