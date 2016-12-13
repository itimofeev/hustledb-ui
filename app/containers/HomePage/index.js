/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { formatDate } from '../../utils/util';
import { createStructuredSelector } from 'reselect';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import {
  selectFCompList,
  selectLoading,
  selectError,
} from '../../containers/App/selectors';
import {
  selectSelectedCompetition,
} from './selectors';

import { loadFCompList } from '../App/actions';
import { competitionSelected } from './actions';

import { FormattedMessage } from 'react-intl';


export class HomePage extends React.Component {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.onSubmitForm();
  }

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };


  onRawSelect = (event) => {
    this.props.onCompetitionSelect(this.props.fCompList[event[0]])
  };

  render() {
    const fCompList = this.props.fCompList;
    const selectedComp = this.props.selectedCompetition;
    let listRender;
    let errorRender;
    let selectedCompetitionRender = "hi, there %)";

    if (fCompList) {
      listRender = (
        <Table selectable onRowSelection={this.onRawSelect}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn><FormattedMessage {...messages.competitionTitle} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.competitionDate} /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {fCompList.map((item, index) =>
              <TableRow key={item.id}>
                <TableRowColumn>{item.title}</TableRowColumn>
                <TableRowColumn>{formatDate(item.date)}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }

    if (this.props.error) {
      errorRender = <FormattedMessage {...messages.errorLoadingCompetitions} />
    }

    if (selectedComp) {
      selectedCompetitionRender = (
        <table>
          <tbody>
          <tr>
            <td>title</td>
            <td>{selectedComp.title}</td>
          </tr>
          <tr>
            <td>city</td>
            <td>{selectedComp.city}</td>
          </tr>
          <tr>
            <td>url</td>
            <td>{selectedComp.url}</td>
          </tr>
          <tr>
            <td>date</td>
            <td>{formatDate(selectedComp.date)}</td>
          </tr>
          </tbody>
        </table>
      )
    }

    return (
      <article>
        <Helmet
          title="Соревнования"
          meta={[
            { name: 'description', content: 'Список всех соревнований' },
          ]}
        />
        <div>
          <table>
            <tbody>
            <tr>
              <td style={{ width: '50%' }}>
                {listRender}
                {errorRender}
              </td>
              <td style={{ verticalAlign: 'top' }}>
                {selectedCompetitionRender}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  fCompList: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  selectedCompetition: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  onCompetitionSelect: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    onCompetitionSelect: (comp) => dispatch(competitionSelected(comp)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadFCompList());
    },
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  fCompList: selectFCompList(),
  selectedCompetition: selectSelectedCompetition(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
