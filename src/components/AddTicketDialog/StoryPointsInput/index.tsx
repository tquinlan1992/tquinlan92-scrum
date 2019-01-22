import { connect } from "react-redux";
import { Props, Actions, mapStateToProps, mapDispatchToProps } from "./mapProps";
import { StoryPointsInputComponent } from "./Component";

export const StoryPointsInput = connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(StoryPointsInputComponent);
