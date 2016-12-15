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
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import styles from './styles.css';

import {
  selectFCompList,
  selectLoading,
  selectError,
} from '../../containers/App/selectors';
import {
  selectSelectedCompetition,
  selectSmallWidth,
} from './selectors';

import { loadFCompList } from '../App/actions';
import { competitionSelected, changeSmallWidth } from './actions';
// import MarkdownElement from 'react-material-markdown-element';
import { FormattedMessage } from 'react-intl';

export class HomePage extends React.Component {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.onSubmitForm();
    const that = this;

    this.resizeListener = function () {
      if (!that.props.smallWidth && window.innerWidth < 600) {
        that.props.changeSmallWidth(true);
      } else if (that.props.smallWidth && window.innerWidth > 600) {
        that.props.changeSmallWidth(false);
      }
    };

    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  onRawSelect = (event) => {
    this.props.onCompetitionSelect(this.props.fCompList[event[0]]);
  };

  render() {
    const fCompList = this.props.fCompList;
    // const selectedComp = this.props.selectedCompetition;
    let listRender;
    let errorRender;

    if (fCompList) {
      listRender = (
        <div style={{ width: '100%' }}>
          {fCompList.map((item) =>
            <Card key={item.id}>
              <CardHeader
                title={item.title}
                subtitle={formatDate(item.date)}
                actAsExpander
                showExpandableButton
              />
              <CardText expandable>
                <Chip>
                  hello
                </Chip>
                Обсуждение: {item.url}
              </CardText>
            </Card>
          )}
        </div>
      );
    }

    if (this.props.error) {
      errorRender = <FormattedMessage {...messages.errorLoadingCompetitions} />;
    }

    return (
      <article>
        <Helmet
          title="Соревнования"
          meta={[
            { name: 'description', content: 'Список всех соревнований' },
          ]}
        />

        <div className={styles.container}>
            {listRender}
            {errorRender}
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
  changeSmallWidth: React.PropTypes.func,
  onCompetitionSelect: React.PropTypes.func,
  smallWidth: React.PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    changeSmallWidth: (smallWidth) => dispatch(changeSmallWidth(smallWidth)),
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
  smallWidth: selectSmallWidth(),
  selectedCompetition: selectSelectedCompetition(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
