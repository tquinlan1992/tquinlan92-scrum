import * as React from 'react';
import { DroppableProvided, Draggable, Droppable } from 'react-beautiful-dnd';
import { Typography, List, ListItem, ListItemText, Card, CardContent, Menu, MenuItem, withStyles, WithStyles, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { getTheme } from '@src/utils';
import './style.css';

export interface Item {
    _id: string;
    title: string;
    description?: string;
    storyPoint: number | null;
}

interface MenuItem {
    label: string;
    onClick: (id: string) => void;
}

export type MenuItems = MenuItem[];

interface Props {
    backlogItems: Item[];
    elementId: string;
    title: string;
    menuItems: MenuItems;
}

const styles = getTheme(theme => {
    return {
        card: {
            root: {

            }
        },
        listItem: {
            padding: '1px',
            borderRadius: '0px'
        }
    }
})

class DroppableIdUnstyled extends React.Component<Props & WithStyles<typeof styles>> {
    state = {
        anchorEl: null,
    }

    itemMenuId: string = '';

    handleOpenItemMenu = (id: string): React.ReactEventHandler => {
        return event => {
            this.itemMenuId = id;
            this.setState({ anchorEl: event.currentTarget });
            event.preventDefault();
        };
    };

    handleClose() {
        this.itemMenuId = '';
        this.setState({ anchorEl: null });
    }

    handleMenuClick(method: MenuItem['onClick']) {
        return () => {
            method(this.itemMenuId);
            this.handleClose();
        }
    };

    render() {
        const droppable = (provided: DroppableProvided) => {
            return (
                <div ref={provided.innerRef}>
                    <List component="nav" style={{ minHeight: '200px' }}>
                        {this.props.backlogItems.map((item, index) => (
                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                {provided => (
                                    <div ref={provided.innerRef}
                                        className='draggableItem'
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <ListItem onClick={() => alert(item._id)} onContextMenu={this.handleOpenItemMenu(item._id)} className={this.props.classes.listItem}>
                                            <Card style={{ minWidth: '100%' }}>
                                                <CardContent style={{ minWidth: '100%' }}>
                                                    <ListItemText style={{ width: '50%' }} primary={item.title} />
                                                    <ListItemSecondaryAction>
                                                        {item.storyPoint}
                                                    </ListItemSecondaryAction>
                                                </CardContent>
                                            </Card>
                                        </ListItem>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={!!this.state.anchorEl}
                        onClose={this.handleClose.bind(this)}
                        style={{ left: '10px' }}
                    >
                        {this.props.menuItems.map(menuItem => {
                            return <MenuItem onClick={this.handleMenuClick(menuItem.onClick)}>{menuItem.label}</MenuItem>
                        })}
                    </Menu>
                </div>
            );
        }
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    {this.props.title}
                </Typography>
                <Droppable droppableId={this.props.elementId}>
                    {droppable}
                </Droppable>
            </React.Fragment>
        )
    }
}

export const DroppableId = withStyles(styles)(DroppableIdUnstyled);