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

import { loadFCompList } from '../App/actions';

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
    console.log(event)
  };

  render() {
    const fCompList = this.props.fCompList;
    let listRender;

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

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'Список всех соревнований' },
          ]}
        />
        <div>
          {listRender}
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
  onSubmitForm: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
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
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
