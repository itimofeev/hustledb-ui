import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500, blue500, cyan200,
  pink500, amber200,
  grey50, grey800,
  red500,
} from 'material-ui/styles/colors';

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    accent1Color: pink500,
    textColor: grey800,
    secondaryTextColor: grey50,
    alternateTextColor: grey50,
    bindedDomainColor: cyan500,
    errorTextColor: red500,
  },
  flatButton: {
    primaryTextColor: grey50,
    secondaryTextColor: grey800,
    primaryHoverColor: cyan200,
    secondaryHoverColor: amber200,
  },
  raisedButton: {
    fontSize: '20px',
  },
  appBar: {
    // height: 50,
    alternativeColor: blue500,
  },
  // drawer: {
  //   width: 420,
  // },
  floatingActionButton: {
    color: cyan500,
    iconColor: grey50,
    secondaryColor: pink500,
    secondaryIconColor: grey800,
  },
});
