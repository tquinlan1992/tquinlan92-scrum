import * as React from 'react';
import { Dialog, TextField, DialogTitle, DialogContent, DialogActions, Button, FormControl } from "@material-ui/core";
import { connect } from 'react-redux';
import { AppState } from "@headless/store";
import { closeSprintDialogActions } from './redux';
import { Omit } from 'lodash';

interface OwnProps {
    onRequestClose: () => void;
    open: boolean;
    onSubmit: () => void;
}

interface StateProps {
    sprintName: string;
}

export const mapStateToProps = ({ closeSprintDialog }: AppState, ownProps: OwnProps) => {
    return {
        ...closeSprintDialog,
        ...ownProps
    };
};

const mapDispatchToProps = {
    closeSprint: closeSprintDialogActions.closeSprint,
    setCloseSprintDialogState: closeSprintDialogActions.set,
    setAddTicketState: closeSprintDialogActions.set,
    reset: closeSprintDialogActions.reset
};

type ComponentActions = typeof mapDispatchToProps;

interface ComponentActionsNoThunk extends Omit<ComponentActions, 'closeSprint'> {
    closeSprint: () => void;
}

export class CloseSprintDialog extends React.Component<OwnProps & ComponentActionsNoThunk & StateProps> {

    onSprintNameChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.setCloseSprintDialogState({ sprintName: event.target.value });
    }

    async onSubmit() {
        try {
            await this.props.closeSprint();
            this.props.onSubmit();
        } catch(e) {
            alert('error closing sprint');
        }
    }

    render() {
        return (
            <Dialog
                title="Dialog With Actions"
                open={this.props.open}
                onExit={(this.props.onRequestClose.bind(this))}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Close Sprint</DialogTitle>
                <DialogContent>
                    <form autoComplete="off">
                        <FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Sprint Name"
                                type="text"
                                fullWidth
                                required
                                value={this.props.sprintName}
                                onChange={this.onSprintNameChange.bind(this)}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(this.props.onRequestClose)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onSubmit.bind(this)} color="primary">
                        Close Sprint
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export const CloseSprintDialogConnected = connect(mapStateToProps, mapDispatchToProps)(CloseSprintDialog);
