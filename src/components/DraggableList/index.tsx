import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { BacklogTicket, SprintTicket } from '@components/TicketList/redux';
import { DroppableId, Item } from './DroppableId';
import { Grid, Paper, withStyles, WithStyles } from '@material-ui/core';
import { getTheme } from '@src/utils';

function reorder<List extends any[]>(list: List, startIndex: number, endIndex: number, newItem?: any) {
    let result = Array.from(list);
    if (!newItem) {
        [newItem] = result.splice(startIndex, 1);
    }
    result.splice(endIndex, 0, newItem);

    result = result.map((item, key) => {
        return {
            ...item,
            priority: key
        };
    });

    return result;
};

interface Table {
    elementId: string;
    title: string;
    items: Item[],
    update: (newItems: Item[], id?: string) => void
}

interface Props {
    firstTable: Table,
    secondTable: Table
}

const styles = getTheme(theme => {
    return {
        root: {
            flexGrow: 1,
        }
    }
})


class DraggableListUnstyled extends React.Component<Props & WithStyles<typeof styles>> {

    onDragEnd({ firstTableItems, secondTableItems }: { firstTableItems: Item[], secondTableItems: Item[] }) {
        // dropped outside the list
        return ({ source, destination }: DropResult) => {
            if (!destination) {
                return;
            }

            let newFirstTableItem: Item | undefined;
            let newSecondTableItem: Item | undefined;
            if (source.droppableId === this.props.firstTable.elementId && destination.droppableId === this.props.secondTable.elementId) {
                const newItem = firstTableItems[source.index];
                newFirstTableItem = newItem;
            }

            if (source.droppableId === this.props.secondTable.elementId && destination.droppableId === this.props.firstTable.elementId) {
                const newItem = secondTableItems[source.index];
                newSecondTableItem = newItem;
            }

            if (destination.droppableId === this.props.firstTable.elementId) {
                const newFirstTableItemsItems = reorder(
                    firstTableItems,
                    source.index,
                    destination.index,
                    newSecondTableItem
                );

                this.props.firstTable.update(newFirstTableItemsItems, newSecondTableItem ? newSecondTableItem._id : undefined);
            } else if (destination.droppableId === this.props.secondTable.elementId) {
                const newSecondTableItems = reorder(
                    secondTableItems,
                    source.index,
                    destination.index,
                    newFirstTableItem
                );

                this.props.secondTable.update(newSecondTableItems, newFirstTableItem ? newFirstTableItem._id : undefined);
            }
        };
    }

    render() {
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd({ firstTableItems: this.props.firstTable.items, secondTableItems: this.props.secondTable.items })}>
                    <div className={this.props.classes.root}>
                        <Grid
                            container
                            spacing={24}
                        >
                            <Grid item style={{ width: '50%' }}>
                                <Paper style={{ margin: '5px auto' }}>
                                    <DroppableId backlogItems={this.props.firstTable.items} elementId={this.props.firstTable.elementId} title={this.props.firstTable.title} />
                                </Paper>
                            </Grid>
                            <Grid item style={{ width: '50%' }}>
                                <Paper>
                                    <DroppableId backlogItems={this.props.secondTable.items} elementId={this.props.secondTable.elementId} title={this.props.secondTable.title} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </DragDropContext>
            </React.Fragment >
        );
    }
}

export const DraggableList = withStyles(styles)(DraggableListUnstyled) 