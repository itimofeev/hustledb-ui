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
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { push } from 'react-router-redux';


const paperStyle = {
  height: 500,
  width: 600,
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

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/features'
   */
  openCompetitionPage = (id) => {
    this.openRoute(`/competitions/${id}`);
  };

  render() {
    const dancerId = this.props.dancerId;
    let dancerProfile = this.props.dancerProfile;

    if (dancerId) {
      dancerProfile = (
        <div className={styles.dancerProfile}>
          <div className={styles.dancerProfileImage}>
            <img src="http://placehold.it/200x200" alt="profile" />
          </div>

          <div className={styles.dancerProfileInfo}>
            <h2>
              {dancerProfile.title}
            </h2>
            <p>
              Code: {dancerProfile.code}
            </p>
            <p>
              Main class: {dancerProfile.pairClass}
            </p>
            <p>
              Jnj class: {dancerProfile.jnjClass}
            </p>
          </div>

          <div>
            <h2>Clubs:</h2>
            <div>
              <List>
                {dancerProfile.clubs.map(c =>
                  <ListItem key={c.id} primaryText={c.title} />
                )}
              </List>
            </div>
          </div>

          <div>
            <h2>Results:</h2>
            <div>
              <ul>
                {dancerProfile.results.map(c =>
                  <li key={c.id}>
                    <h2>Competition: {c.competitionTitle}</h2>
                    <h4>Nomination: {c.nominationTitle}</h4>
                    <p>{c.resultString}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>
      );
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
  changeRoute: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dancerProfile: selectDancerProfileObject(),
  dancerId: selectDancerId(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadDancerProfile: (dancerId) => dispatch(loadDancerProfile(dancerId)),
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DancerProfile);
