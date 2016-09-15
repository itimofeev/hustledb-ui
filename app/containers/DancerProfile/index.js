/*
 *
 * DancerProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { selectDancerProfileObject, selectDancerId } from './selectors';
import { loadDancerProfile } from './actions';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { renderDancerTitle } from '../../utils/util';
import Paper from 'material-ui/Paper';


const paperStyle = {
  height: 200,
  width: 200,
  margin: '0 auto',
  textAlign: 'center',
  display: 'inline-block',
};

export class DancerProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

  /**
   * call action to load dancer profile
   */
  componentDidMount() {
    const dancerCode = window.location.pathname.split('/').slice(-1).pop();

    this.props.loadDancerProfile(dancerCode);
  }

  render() {
    let dancerId = this.props.dancerId;
    let dancerProfile = this.props.dancerProfile;

    if (dancerId) {
      dancerProfile = (<div>
        hello, {dancerId} <br />
        {renderDancerTitle(dancerProfile)}
      </div>);
    }

    return (
      <div className={styles.dancerProfile}>
        <Helmet
          title="Dancer Profile"
          meta={[
            { name: 'description', content: 'Description of DancerProfile' },
          ]}
        />
        <Paper zDepth={1} style={paperStyle}>
          {dancerProfile}
        </Paper>
      </div>
    );
  }
}

DancerProfile.propTypes = {
  dancerProfile: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  dancerId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  loadDancerProfile: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dancerProfile: selectDancerProfileObject(),
  dancerId: selectDancerId(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadDancerProfile: (dancerId) => dispatch(loadDancerProfile(dancerId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DancerProfile);
