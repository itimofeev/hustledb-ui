/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import { AppBar } from 'material-ui';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Footer from '../../components/Footer';
import LinearProgress from 'material-ui/LinearProgress';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './styles.css';

function App(props) {
  return (
    <MuiThemeProvider>

      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s | VHustle"
          defaultTitle="VHustle"
          meta={[
            { name: 'description', content: 'Hustle SA dancers rating' },
          ]}
        />

        <AppBar
          onTitleTouchTap={props.handleTitleTouchTap}
          title="VHustle"
        />
        {props.loading &&
        <LinearProgress mode="indeterminate" />
        }
        {React.Children.toArray(props.children)}

        <Footer />
      </div>

    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  handleTitleTouchTap: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleTitleTouchTap: () => dispatch(push('/')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
