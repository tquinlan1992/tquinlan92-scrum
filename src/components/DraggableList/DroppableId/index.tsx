import * as React from 'react';
import { DroppableProvided, Draggable, Droppable } from 'react-beautiful-dnd';
import { Typography, List, ListItem, ListItemText, Card, CardContent, Menu, MenuItem, withStyles, WithStyles } from '@material-ui/core';
import { getTheme } from '@src/utils';
import './style.css';

export interface Item {
    _id: string;
    title: string;
    description?: string;
}

interface Props {
    backlogItems: Item[];
    elementId: string;
    title: string;
}

const styles = getTheme(theme => {
    return {
        card: {
            root: {

            }
        }
    }
})

class DroppableIdUnstyled extends React.Component<Props & WithStyles<typeof styles>> {
    state = {
        anchorEl: null,
    }

    handleClick: React.ReactEventHandler = event => {
        this.setState({ anchorEl: event.currentTarget });
        event.preventDefault();
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
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
                                        className='noHoverOutline'
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <ListItem onContextMenu={this.handleClick}>
                                            <Card style={{ minWidth: '100%' }}>
                                                <CardContent style={{ minWidth: '100%' }}>
                                                    <ListItemText style={{ width: '50%' }} primary={item.title} />
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
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                        style={{ left: '10px' }}
                    >
                        <MenuItem onClick={this.handleClose}>Close</MenuItem>
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