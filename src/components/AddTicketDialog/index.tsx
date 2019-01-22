import { connect } from "react-redux";
import { AddTicketDialogOwnProps, ComponentActions, mapStateToProps, mapDispatchToProps, Props } from "./mapProps";
import { AddTicketDialog } from "./Component";

export const AddTicketDialogConnected = connect<Props, ComponentActions, AddTicketDialogOwnProps>(mapStateToProps, mapDispatchToProps)(AddTicketDialog);
