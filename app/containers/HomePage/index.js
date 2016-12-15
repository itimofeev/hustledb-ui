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


export class HomePage extends React.Component {

  render() {
    return (
      <article>
        <Helmet
          title=""
          meta={[
            { name: 'description', content: 'Список всех соревнований' },
            { name: 'description', content: 'Список всех соревнований' },
          ]}
        />

        <div className={styles.container}>
          hello, tther!
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
