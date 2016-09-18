/*
 *
 * CompetitionList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectCompetitionListProp from './selectors';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { loadCompetitionList } from './actions';

export class CompetitionList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  /**
   * call action to load dancer profile
   */
  componentDidMount() {
    this.props.loadCompetitionList();
  }

  render() {
    const competitionList = this.props.competitionList;

    let listRender;

    if (competitionList) {
      listRender = (<div>hello, there</div>

      );
    }

    return (
      <div className={styles.competitionList}>
        <Helmet
          title="CompetitionList"
          meta={[
            { name: 'description', content: 'Description of CompetitionList' },
          ]}
        />
        {listRender}
      </div>
    );
  }
}

CompetitionList.propTypes = {
  competitionList: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  loadCompetitionList: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  competitionList: selectCompetitionListProp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadCompetitionList: () => dispatch(loadCompetitionList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionList);
