import * as React from 'react';
import { Dialog, TextField, DialogTitle, DialogContent, DialogActions, Button, InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import { connect } from 'react-redux';
import { AppStateCore } from "@headless/store";
import { isNumber } from 'lodash';
import { actions } from './redux';

interface AddTicketDialogOwnProps {
    onRequestClose: () => void;
    open: boolean;
    onSubmit: () => void;
}

interface StateProps {
    storyPoint: number | null;
    description: string;
    title: string;
}

const mapStateToProps = ({ core }: AppStateCore, ownProps: AddTicketDialogOwnProps) => {
    return {
        ...core.addTicket,
        ...ownProps
    };
};

const mapDispatchToProps = {
    addTicket: actions.addTicket,
    setAddTicketState: actions.set,
    reset: actions.reset
};

type ComponentActions = typeof mapDispatchToProps;

export class AddTicketDialog extends React.Component<AddTicketDialogOwnProps & ComponentActions & StateProps> {

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
                                //value={this.state.multiline}
                                //onChange={this.handleChange('multiline')}
                                //className={classes.textField}
                                margin="dense"
                                fullWidth
                                value={this.props.description}
                                onChange={this.onDescriptionChange.bind(this)}
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="age-simple">Story Point</InputLabel>
                            <Select
                                value={isNumber(this.props.storyPoint) ? this.props.storyPoint : ''}
                                onChange={this.onStoryPointsChange.bind(this)}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0.1}>0.1</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                                <MenuItem value={21}>21</MenuItem>
                            </Select>
                        </FormControl>
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

export default connect<AddTicketDialogOwnProps & StateProps, ComponentActions, AddTicketDialogOwnProps>(mapStateToProps, mapDispatchToProps)(AddTicketDialog);
