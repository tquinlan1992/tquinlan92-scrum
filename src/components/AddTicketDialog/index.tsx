import * as React from 'react';
import { Dialog, TextField, DialogTitle, DialogContent, DialogActions, Button, FormControl } from "@material-ui/core";
import { AddTicketDialogOwnProps, ComponentActions, mapStateToProps, mapDispatchToProps, Props } from './mapProps';
import { StoryPointsInputConnected } from './StoryPointsInput';
import { connect } from "react-redux";
import { Omit } from 'lodash';

export interface StateProps {
    storyPoint: number | null;
    description: string;
    title: string;
}

interface ComponentActionsVoid extends Omit<ComponentActions, 'addTicket'> {
    addTicket: () => void;
}

export class AddTicketDialog extends React.Component<AddTicketDialogOwnProps & ComponentActionsVoid & StateProps> {

    onStoryPointsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.setAddTicketState({storyPoint: Number(event.target.value) });
    }

    onCreate() {
        this.props.addTicket();
        this.props.onSubmit();
    }

    onDescriptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.setAddTicketState({ description: event.target.value });
    }

    onTitleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.setAddTicketState({ title: event.target.value });
    }

    render() {
        return (
            <Dialog
                title="Dialog With Actions"
                open={this.props.open}
                onExit={(this.props.onRequestClose.bind(this))}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Create a Ticket</DialogTitle>
                <DialogContent>
                    <form autoComplete="off">
                        <FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Title"
                                type="text"
                                fullWidth
                                required
                                value={this.props.title}
                                onChange={this.onTitleChange.bind(this)}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="multiline-flexible"
                                label="Description"
                                multiline
                                margin="dense"
                                fullWidth
                                value={this.props.description}
                                onChange={this.onDescriptionChange.bind(this)}
                            />
                        </FormControl>
                        <StoryPointsInputConnected />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(this.props.onRequestClose)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onCreate.bind(this)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export const AddTicketDialogConnected = connect(mapStateToProps, mapDispatchToProps)(AddTicketDialog);
