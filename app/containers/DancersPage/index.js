/*
 *
 * DancersPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import selectDancersPage from './selectors';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './styles.css';

export class DancersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.dancersPage}>
        <Helmet
          title="DancersPage"
          meta={[
            {name: 'description', content: 'Description of DancersPage'},
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = selectDancersPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DancersPage);
