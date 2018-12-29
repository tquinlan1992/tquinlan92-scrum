import * as React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { sortBy } from 'lodash';

// fake data generator
// const getItems = (count: number) =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`,
//   }));

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  result = result.map((item, key) => {
    return {
      ...item,
      priority: key
    };
  });

  return result;
};

interface ListItem {
  _id: string;
  title: string;
}

interface Props {
  listItems: ListItem[];
  updateItems: (newItems: ListItem[]) => void;
  title: string;
}

class DraggableList extends React.Component<Props, {items: any[];}> {
  constructor(props: Props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(propItems: ListItem[]) {
    // dropped outside the list
    return (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      propItems,
      result.source.index,
      result.destination.index
    );

    this.props.updateItems(items);
    };
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const orderedListItems = sortBy(this.props.listItems, 'priority');
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
          {this.props.title} 
      </Typography>   
      <DragDropContext onDragEnd={this.onDragEnd(orderedListItems)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              <List component="nav">
                {orderedListItems.map((item, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <ListItem button>
                          <ListItemText primary={item.title} />
                          <ListItemText primary={item.title} />
                        </ListItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </React.Fragment>
    );
  }
}

export default DraggableList;
