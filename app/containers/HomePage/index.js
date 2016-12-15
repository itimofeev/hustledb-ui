/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';
import { keywords } from '../../utils/util';
import { FormattedMessage } from 'react-intl';


export class HomePage extends React.Component {// eslint-disable-line

  render() {
    return (
      <article>
        <Helmet
          title=""
          meta={[
            { name: 'description', content: 'VHustle — портал с информацией о конкурсах по хастлу' },
            { name: 'keywords', content: keywords },
          ]}
        />

        <div className={styles.container}>
          <FormattedMessage {...messages.helloMessage} />;
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
