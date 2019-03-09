import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';


export class SelectCode extends React.Component<Props & Actions> {

  componentDidMount() {
    this.props.loadCodeOptions();
  }

  render() {
    const firstMenuItem = this.props.options[0];
    const firstMenuItemId = firstMenuItem ? firstMenuItem._id : '';

    const currentlySelectedValue = this.props._id || firstMenuItemId;
    const menuItems = this.props.options.map(({ _id }) => (
      <MenuItem value={_id}>{_id}</MenuItem>
    ));
    return (
      <FormControl>
        <InputLabel htmlFor="age-simple">Age</InputLabel>
        <Select
          value={currentlySelectedValue}
          onChange={(event) => this.props.selectCode(event.target.value)}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          {menuItems}
        </Select>
      </FormControl>
    );
  }
}

export const SelectCodeConnect = connect(mapStateToProps, mapDispatchToProps)(SelectCode);

