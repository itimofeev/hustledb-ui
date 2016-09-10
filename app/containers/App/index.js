/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import {AppBar} from "material-ui";


// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Img from 'components/Img';
import Footer from 'components/Footer';
import A from 'components/A';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './styles.css';

function App(props) {
  return (
    <MuiThemeProvider>

      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
          meta={[
            {name: 'description', content: 'A React.js Boilerplate application'},
          ]}
        />

        <AppBar title="Hustle SA"/>

        {React.Children.toArray(props.children)}
        <Footer />

      </div>
    </MuiThemeProvider>

  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
