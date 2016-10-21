/*
 *
 * CompetitionPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { selectCompetition } from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import { loadCompetition } from './actions';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';


export class CompetitionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const competitionId = window.location.pathname.split('/').slice(-1).pop();
    this.props.loadCompetition(competitionId);
  }

  render() {

    let error;
    if(this.props.error) {
      error = this.props.error;
    }

    let mainContent;
    if(this.props.competition) {
      const comp = this.props.competition;
      mainContent = (
        <div>CompId: {comp.id}</div>
      );
    }

    return (
      <div className={styles.competitionPage}>
        <Helmet
          title="CompetitionPage"
          meta={[
            { name: 'description', content: 'Description of CompetitionPage' },
          ]}
        />
        {error}
        {mainContent}
      </div>
    );
  }
}

CompetitionPage.propTypes = {
  competition: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]),
  loading: React.PropTypes.bool,
  loadCompetition: React.PropTypes.func,
  changeRoute: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  competition: selectCompetition(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadCompetition: (id) => dispatch(loadCompetition(id)),
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionPage);
