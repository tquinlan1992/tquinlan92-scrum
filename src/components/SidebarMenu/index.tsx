import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";
import { List, ListItem, ListItemText } from '@material-ui/core';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { history } from '../../headless/store/middleware/router';
import { paths } from '@components/Routes/paths';

const menuItems = [
    {
        text: 'Tickets',
        path: paths.feed.path
    },
    {
        text: 'Import/Export',
        path: paths.import_export.path
    },

    {
        text: 'Code',
        path: paths.code.path
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
                    <ListItem onClick={this.onListItemClick(menuItem.path)} button key={menuItem.text} selected={isSelected(menuItem.path, this.props.currentPath || '')}>
                        <ListItemText primary={menuItem.text} />
                    </ListItem>
                ))}
            </List>
        );
    }
}

export const SidebarMenuConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarMenu));

