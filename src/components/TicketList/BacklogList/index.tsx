import { connect } from "react-redux";
import { Props, Actions, mapStateToProps, mapDispatchToProps } from "./mapProps";
import { BacklogListComponent } from "./Component";

export const BacklogListConnected = connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(BacklogListComponent);
