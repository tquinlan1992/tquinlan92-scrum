import { Tickets } from "@headless/database/PouchWrapper";
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Typography } from "@material-ui/core";
import * as React from "react";

interface TicketTableParams {
    tickets: Tickets;
    onClose?: (id: string) => void;
    onAddTicketToSprint?: (id: string) => void;
    onRemoveFromSprint?: (id: string) => void;
    title: string;
}

export function TicketTable({ tickets, onClose, onAddTicketToSprint, onRemoveFromSprint, title }: TicketTableParams) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ticket</TableCell>
                        <TableCell>Sprint Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map(ticket => {
                        return (<TableRow key={ticket._id} draggable={true}>
                            <TableCell>
                                <TextField
                                    defaultValue={ticket.title}
                                />
                            </TableCell>
                            <TableCell>
                                {ticket.sprintName}
                            </TableCell>
                            <TableCell>
                                {ticket.closed ? 'Closed' : ''}
                            </TableCell>
                            <TableCell>
                                {ticket.sprint ? 'Sprint' : ''}
                            </TableCell>
                            <TableCell>
                                {onAddTicketToSprint ? <Button title='Add To Sprint' onClick={() => onAddTicketToSprint(ticket._id)}> Add To Sprint </Button> : null}
                                {onRemoveFromSprint ? <Button title='Open Ticket' onClick={() => onRemoveFromSprint(ticket._id)}> Remove From Sprint </Button> : null}
                                {onClose ? <Button title='Close Ticket' onClick={() => onClose(ticket._id)}> Close Ticket </Button> : null}
                            </TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}