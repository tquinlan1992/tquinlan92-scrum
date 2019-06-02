import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './mapProps';
import { AddTicketDialog } from '@src/components2/AddTicketDialog';

export const AddTicketDialogConnected = connect(mapStateToProps, mapDispatchToProps)(AddTicketDialog);
