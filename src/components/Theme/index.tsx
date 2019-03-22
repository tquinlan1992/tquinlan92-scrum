import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const green = {
    50: '#e0f9e7',
    100: '#b3f1c3',
    200: '#80e89b',
    300: '#4dde72',
    400: '#26d754',
    500: '#00d036',
    600: '#00cb30',
    700: '#00c429',
    800: '#00be22',
    900: '#00b316',
    A100: '#dcffde',
    A200: '#a9ffaf',
    A400: '#76ff7f',
    A700: '#5dff67',
    'contrastDefaultColor': 'dark',
};

const white = {
    50: '#ffffff',
    100: '#ffffff',
    200: '#ffffff',
    300: '#ffffff',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
    A100: '#ffffff',
    A200: '#ffffff',
    A400: '#ffffff',
    A700: '#ffffff',
    'contrastDefaultColor': 'dark',
};





export class Theme extends React.Component {
    muiTheme = createMuiTheme({
        palette: {
            primary: green,
            secondary: white
            // error: will use the default color
        },
        overrides: {
            MuiButton: { 
                raisedPrimary: {
                    color: '#FFFFFF'
                }
            }
        }
    });
    constructor(props: any) {
        super(props);

    }

    public render() {
        return (
            <MuiThemeProvider theme={this.muiTheme}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}
