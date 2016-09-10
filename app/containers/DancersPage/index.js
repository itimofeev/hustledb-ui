/*
 *
 * DancersPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {selectSearchInput} from './selectors';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import {changeDancerInput, loadDancers} from './actions';
import {createStructuredSelector} from 'reselect';
import styles from './styles.css';


export class DancersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className={styles.dancersPage}>
        <Helmet
          title="Dancers"
          meta={[
            {name: 'description', content: 'Search for hustle dancers by code or name'},
          ]}
        />

        <TextField floatingLabelText="Input dancer code or name"
                   onChange={this.props.onUpdateSearchInput}
                   value={this.props.searchInput}/>

        <FlatButton label="Search" onClick={this.props.onSearchClick}/>

      </div>
    );
  }
}

DancersPage.propTypes = {
  onUpdateInput: React.PropTypes.func,
  onSearchClick: React.PropTypes.func,
  searchInput: React.PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  searchInput: selectSearchInput(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUpdateSearchInput: (evt) => dispatch(changeDancerInput(evt.target.value)),
    onSearchClick: () => dispatch(loadDancers()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DancersPage);
