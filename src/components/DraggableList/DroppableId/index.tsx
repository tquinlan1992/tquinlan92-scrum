import * as React from 'react';
import { DroppableProvided, Draggable, Droppable } from 'react-beautiful-dnd';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

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

export class DroppableId extends React.Component<Props> {
    render() {
        const droppable = (provided: DroppableProvided) => {
            return (
                <div ref={provided.innerRef}>
                    <Typography variant="h6" gutterBottom>
                        {this.props.title}
                    </Typography>
                    <List component="nav">
                        {this.props.backlogItems.map((item, index) => (
                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <ListItem button>
                                            <ListItemText style={{ width: '50%' }} primary={item.title} />
                                            <ListItemText style={{ width: '50%' }} primary={item.description} />
                                        </ListItem>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                </div>
            );
        }
        return (
            <Droppable droppableId={this.props.elementId}>
                {droppable}
            </Droppable>
        )
    }
}