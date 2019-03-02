import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps, MapDispatchToProps } from './mapProps';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';


export class SelectCode extends React.Component<Props & Actions> {

    componentDidMount() {
        this.props.loadCodeOptions()
    }

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

export const SelectCodeConnect = connect(mapStateToProps, mapDispatchToProps)(SelectCode);

