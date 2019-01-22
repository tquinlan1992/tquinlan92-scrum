import { connect } from "react-redux";
import { Props, Actions, mapStateToProps, mapDispatchToProps } from "./mapProps";
import { Component } from "./Component";

export default connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(StoryPointsInput);
