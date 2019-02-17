import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";
import { List, ListItem, ListItemText } from '@material-ui/core';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { history } from '../../headless/store/middleware/router';


const menuItems = [
    {
        text: 'Tickets',
        path: '/feed'
    },
    {
        text: 'Import/Export',
        path: '/import_export'
    }
];

function isSelected(listItemPath: string, currentPath: string) {
    return listItemPath === currentPath;
}

export class SidebarMenu extends React.Component<Props & Actions> {

    onListItemClick(path: string) {
        return () => {
            history.push(path)
        }
    }

    render() {
        return (
            <List>
                {menuItems.map(menuItem => (
                    <ListItem onClick={this.onListItemClick(menuItem.path)} button key={menuItem.text} selected={isSelected(menuItem.path, this.props.currentPath)}>
                        <ListItemText primary={menuItem.text} />
                    </ListItem>
                ))}
            </List>
        );
    }
}

export const SidebarMenuConnected = withRouter(connect<Props, Actions, RouteComponentProps>(mapStateToProps, mapDispatchToProps)(SidebarMenu));

