/*
 *
 * CompetitionList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { selectCompetitionListProp } from './selectors';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { loadCompetitionList } from './actions';
import { push } from 'react-router-redux';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


export class CompetitionList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  /**
   * call action to load dancer profile
   */
  componentDidMount() {
    this.props.loadCompetitionList();
  }

  openCompetitionPage = (id) => {
    this.props.changeRoute(`/competitions/${id}`);
  };

  render() {
    const competitionList = this.props.competitionList;

    let listRender;

    if (competitionList) {
      listRender = (
        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {competitionList.content.map((item, index) =>
              <TableRow key={index}>
                <TableRowColumn>{item.Date}</TableRowColumn>
                <TableRowColumn>
                  <a onClick={() => this.openCompetitionPage(item.id)}>{item.title}</a>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
  changeRoute: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  competitionList: selectCompetitionListProp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadCompetitionList: () => dispatch(loadCompetitionList()),
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionList);
