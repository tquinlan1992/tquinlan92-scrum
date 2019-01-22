import * as React from 'react';
import { Props, Actions } from './mapProps';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { isNumber } from 'lodash';


interface StoryPointOption {
    value: number | string;
    label?: string; 
}

type StoryPointOptions = StoryPointOption[];

const storypointOptions:StoryPointOptions = [
    {label: 'None', value: ''}, {value: 0.1},{value: 2},{value: 3}, {value: 5}, {value: 8}, {value: 13}, {value: 21}
]

const menuItemOptions = storypointOptions.map(option => {
    return <MenuItem value={option.value}>{option.label || option.value}</MenuItem>
})

export class StoryPointsInputComponent extends React.Component<Props & Actions> {

    onStoryPointsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.setAddTicketState({storyPoint: Number(event.target.value) });
    }

    render() {
        return (
            <FormControl>
            <InputLabel htmlFor="age-simple">Story Point</InputLabel>
            <Select
                value={isNumber(this.props.storyPoint) ? this.props.storyPoint : ''}
                onChange={this.onStoryPointsChange.bind(this)}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}
            >
                {menuItemOptions}
            </Select>
        </FormControl>
        );
    }
}
