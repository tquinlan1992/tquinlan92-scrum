import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { isNumber } from 'lodash';
import { connect } from "react-redux";
import shortid from 'shortid';
import { AppState } from '@headless/store';

interface StoryPointOption {
    value: number | string;
    label?: string; 
    key: string;
}

type StoryPointOptions = StoryPointOption[];

const storypointOptions:StoryPointOptions = [
    {
        label: 'None', value: '', key: shortid()
    }, 
    {
        value: 0.1, key: shortid()
    },
    {
        value: 2, key: shortid()
    },
    {
        value: 3, key: shortid()
    }, 
    {
        value: 5, key: shortid()
    }, 
    {
        value: 8, key: shortid()
    }, 
    {
        value: 13, key: shortid()
    }, 
    {
        value: 21, key: shortid()
    }
]

const menuItemOptions = storypointOptions.map(option => {
    return <MenuItem key={option.key} value={option.value}>{option.label || option.value}</MenuItem>
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

export const StoryPointsInputConnected = connect<Props, Actions, void, AppState>(mapStateToProps, mapDispatchToProps)(StoryPointsInputComponent);
