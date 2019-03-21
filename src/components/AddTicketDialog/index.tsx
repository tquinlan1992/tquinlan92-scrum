import { Button, createStyles, Drawer, FormControl, TextField, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import { Omit } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { AddTicketDialogOwnProps, ComponentActions, mapDispatchToProps, mapStateToProps } from './mapProps';
import { StoryPointsInputConnected } from './StoryPointsInput';

export interface StateProps {
    storyPoint: number | null;
    description: string;
    title: string;
}

const styles = (theme: Theme) => createStyles({
    drawerPaper: {
        width: '54%'
    },
    form: {
        padding: '10px'
    }
})

interface ComponentActionsVoid extends Omit<ComponentActions, 'addTicket'> {
    addTicket: () => void;
}

export class AddTicketDialog extends React.Component<AddTicketDialogOwnProps & ComponentActionsVoid & StateProps & WithStyles<typeof styles>> {

    onStoryPointsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.setAddTicketState({ storyPoint: Number(event.target.value) });
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
        const { classes } = this.props;
        return (
            <Drawer
                anchor="right"
                open={this.props.open}
                onClose={(this.props.onRequestClose.bind(this))}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.form}>
                <Typography variant="h5" component="h3">Create a Ticket</Typography>
                    <form autoComplete="off" className={classes.form}>
                        <FormControl fullWidth>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Title"
                                type="text"
                                required
                                value={this.props.title}
                                onChange={this.onTitleChange.bind(this)}
                            />
                            <TextField
                                id="multiline-flexible"
                                label="Description"
                                multiline
                                margin="dense"
                                value={this.props.description}
                                onChange={this.onDescriptionChange.bind(this)}
                            />
                            <StoryPointsInputConnected />
                        </FormControl>
                    </form>
                    <Button onClick={(this.props.onRequestClose)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onCreate.bind(this)} color="primary">
                        Create
                    </Button>
                </div>
            </Drawer>
        );
    }
}

export const AddTicketDialogConnected = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddTicketDialog));
