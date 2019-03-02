import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { AppState } from '@headless/store';
import { appStateConnect } from '@src/utils';


export class SelectCode extends React.Component<Props & Actions> {

    render() {
        return (
            <FormControl>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select
              value={10}
              onChange={() => alert('test')}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        );
    }
}

export const SelectCodeConnect = appStateConnect<Props, Actions, {}>(mapStateToProps, mapDispatchToProps)(SelectCode);

