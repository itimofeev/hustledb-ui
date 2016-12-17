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
import LinearProgress from 'material-ui/LinearProgress';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';
// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';
import { Initializer as YM } from 'react-yandex-metrika';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { openDrawer, closeDrawer } from './actions';
import { selectIsDrawerOpen } from './selectors';
import styles from './styles.css';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

function App(props) {
  return (
    <MuiThemeProvider>

      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s | ВХастле"
          defaultTitle="ВХастле"
          meta={[
            { name: 'description', content: 'Hustle SA dancers rating' },
          ]}
        />

        <Drawer open={props.isDrawerOpen} docked={false} onRequestChange={props.closeDrawer}>
          <AppBar
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonTouchTap={props.closeDrawer}
          />
          <MenuItem onTouchTap={props.goToContestList}><FormattedMessage {...messages.contestListMI} /></MenuItem>
        </Drawer>

        <AppBar
          onTitleTouchTap={props.handleTitleTouchTap}
          title={<span className={styles.title}>ВХастле</span>}
          onLeftIconButtonTouchTap={props.openDrawer}
        />
        {props.loading && <LinearProgress mode="indeterminate" />}
        {React.Children.toArray(props.children)}

        <YM />

      </div>

    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  handleTitleTouchTap: React.PropTypes.func,
  goToContestList: React.PropTypes.func,
  closeDrawer: React.PropTypes.func.isRequired,
  openDrawer: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  isDrawerOpen: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isDrawerOpen: selectIsDrawerOpen(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleTitleTouchTap: () => dispatch(push('/')),
    goToContestList: () => {
      dispatch(closeDrawer());
      dispatch(push('/contests'));
    },
    closeDrawer: () => dispatch(closeDrawer()),
    openDrawer: () => dispatch(openDrawer()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
