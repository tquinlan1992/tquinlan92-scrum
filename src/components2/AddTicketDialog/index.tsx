import { Button, createStyles, Drawer, FormControl, TextField, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import * as React from 'react';

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

interface Props {
    storyPoint: number | null;
    description: string;
    title: string;
    addTicket: () => void;
    updateStoryPoint: (value: number | null) => void;
    updateDescription: (value: string) => void;
    updateTitle: (value: string) => void;
    onRequestClose: () => void;
    open: boolean;
    onSubmit: () => void;
}

export class AddTicketDialogNoStyles extends React.Component<Props & WithStyles<typeof styles>> {

    onStoryPointsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.updateStoryPoint(Number(event.target.value));
    }

    onCreate() {
        this.props.addTicket();
        this.props.onSubmit();
    }

    onDescriptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.updateDescription(event.target.value);
    }

    onTitleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.updateTitle(event.target.value);
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
                        </FormControl>
                    </form>
                    <Button color="primary" variant="contained" className='raisedPrimary' onClick={(this.props.onRequestClose)}>
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" onClick={this.onCreate.bind(this)}>
                        Create
                    </Button>
                </div>
            </Drawer>
        );
    }
}

export const AddTicketDialog = withStyles(styles)(AddTicketDialogNoStyles); 