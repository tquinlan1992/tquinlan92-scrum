import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { BacklogTicket, SprintTicket } from '@components/TicketList/redux';
import { DroppableId, Item } from './DroppableId';
import { Grid, Paper, withStyles, WithStyles } from '@material-ui/core';
import { getTheme } from '@src/utils';
import { remove } from 'lodash';

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
        },
        tablePaper: {
            padding: theme.spacing.unit * 2
        }
    }
})


class DraggableListUnstyled extends React.Component<Props & WithStyles<typeof styles>> {

    state = {
        firstTable: this.props.firstTable.items,
        secondTable: this.props.secondTable.items
    }

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

                let secondTable = secondTableItems;
                if (newSecondTableItem) {
                    remove(secondTable, item => {
                        return item._id === (newSecondTableItem as Item)._id
                    });
                }
                this.setState({
                    firstTable: newFirstTableItemsItems,
                    secondTable
                });
            } else if (destination.droppableId === this.props.secondTable.elementId) {
                const newSecondTableItems = reorder(
                    secondTableItems,
                    source.index,
                    destination.index,
                    newFirstTableItem
                );

                this.props.secondTable.update(newSecondTableItems, newFirstTableItem ? newFirstTableItem._id : undefined);

                let firstTable = firstTableItems;
                if (newFirstTableItem) {
                    remove(firstTable, item => {
                        return item._id === (newFirstTableItem as Item)._id
                    });
                }
                this.setState({
                    secondTable: newSecondTableItems,
                    firstTable
                });
            }
        };
    }

    render() {
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd({ firstTableItems: this.state.firstTable, secondTableItems: this.state.secondTable })}>
                    <div className={this.props.classes.root}>
                        <Grid
                            container
                            spacing={24}
                        >
                            <Grid item style={{ width: '50%' }}>
                                <DroppableId backlogItems={this.state.firstTable} elementId={this.props.firstTable.elementId} title={this.props.firstTable.title} />
                            </Grid>
                            <Grid item style={{ width: '50%' }}>
                                <DroppableId backlogItems={this.state.secondTable} elementId={this.props.secondTable.elementId} title={this.props.secondTable.title} />
                            </Grid>
                        </Grid>
                    </div>
                </DragDropContext>
            </React.Fragment >
        );
    }
}

export const DraggableList = withStyles(styles)(DraggableListUnstyled) 