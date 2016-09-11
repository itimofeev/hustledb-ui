/*
 *
 * DancersPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { selectSearchInput, selectDancers } from './selectors';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Table, TableRow, TableRowColumn, TableHeaderColumn, TableHeader, TableBody } from 'material-ui/Table';
import { changeDancerInput, loadDancers } from './actions';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';
import { push } from 'react-router-redux';


export class DancersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    let searchResultTable;
    if (this.props.dancers) {
      searchResultTable = (<Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Code</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Classic Class</TableHeaderColumn>
            <TableHeaderColumn>JNJ Class</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {this.props.dancers.content.map(c =>
            <TableRow key={c.id}>
              <TableRowColumn>
                <a onClick={() => this.props.changeRoute(`/dancers/${c.code}`)}>{c.code}</a>
              </TableRowColumn>
              <TableRowColumn>{[c.surname, c.firstName, c.patronymic].filter(v => v).join(' ')}</TableRowColumn>
              <TableRowColumn>{c.pairClass}</TableRowColumn>
              <TableRowColumn>{c.jnjClass}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>);
    }

    return (
      <div className={styles.dancersPage}>
        <Helmet
          title="Dancers"
          meta={[
            { name: 'description', content: 'Search for hustle dancers by code or name' },
          ]}
        />

        <TextField
          floatingLabelText="Input dancer code or name"
          onChange={this.props.onUpdateSearchInput}
          value={this.props.searchInput}
        />

        <FlatButton
          label="Search" onClick={this.props.onSearchClick}
        />

        {searchResultTable}

      </div>
    );
  }
}

DancersPage.propTypes = {
  onUpdateInput: React.PropTypes.func,
  onUpdateSearchInput: React.PropTypes.func,
  onSearchClick: React.PropTypes.func,
  changeRoute: React.PropTypes.func,
  searchInput: React.PropTypes.string,

  dancers: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  searchInput: selectSearchInput(),
  dancers: selectDancers(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUpdateSearchInput: (evt) => dispatch(changeDancerInput(evt.target.value)),
    onSearchClick: () => dispatch(loadDancers()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DancersPage);
