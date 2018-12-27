import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

class Theme extends React.Component {
    muiTheme = createMuiTheme({
        palette: {
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#ff4400',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contast with palette.primary.main
            },
            secondary: {
                light: '#0066ff',
                main: '#0044ff',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
            },
            // error: will use the default color
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

export default Theme;
