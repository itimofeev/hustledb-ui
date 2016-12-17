/*
 *
 * ContestListPage
 *
 */


import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { formatDate, keywords } from '../../utils/util';
import { createStructuredSelector } from 'reselect';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Chip from 'material-ui/Chip';
import styles from './styles.css';

import {
  selectContestList,
  selectLoading,
  selectError,
} from '../../containers/App/selectors';

import {
  selectSelectedContest,
  selectSmallWidth,
} from './selectors';

import { loadContestList } from '../App/actions';
import { contestSelected, changeSmallWidth } from './actions';
// import MarkdownElement from 'react-material-markdown-element';
import { FormattedMessage } from 'react-intl';

export class ContestListPage extends React.Component {
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
    this.props.onContestSelect(this.props.contestList[event[0]]);
  };

  handleChipTouchTap = (year) => {
  };

  render() {
    const inStyles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };

    const contestList = this.props.contestList;
    // const selectedComp = this.props.selectedContest;
    let listRender;
    let loadingRender;
    let errorRender;
    let contestFilterRender;

    if (contestList) {
      listRender = (
        <div style={{ width: '100%' }}>
          {contestList.map((item) =>
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

      contestFilterRender = (
        <div style={inStyles.wrapper}>
          <Chip
            style={styles.chip}
          >
            2016
          </Chip>
          <Chip
            style={styles.chip}
          >
            2017
          </Chip>
        </div>
      )
    }

    if (this.props.loading) {
      loadingRender = (
        <CircularProgress size={80} thickness={5} />
      )
    }

    if (this.props.error) {
      errorRender = <FormattedMessage {...messages.errorLoadingContestList} />;
    }

    return (
      <article>
        <Helmet
          title="Соревнования"
          meta={[
            { name: 'description', content: 'VHustle — портал с информацией о конкурсах по хастлу' },
            { name: 'keywords', content: keywords },
          ]}
        />

        <div className={styles.container}>
          {contestFilterRender}
          {listRender}
          {errorRender}
          {loadingRender}
        </div>
      </article>
    );
  }
}

ContestListPage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  contestList: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  selectedContest: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  changeSmallWidth: React.PropTypes.func,
  onContestSelect: React.PropTypes.func,
  smallWidth: React.PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    changeSmallWidth: (smallWidth) => dispatch(changeSmallWidth(smallWidth)),
    onContestSelect: (comp) => dispatch(contestSelected(comp)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadContestList());
    },
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  contestList: selectContestList(),
  smallWidth: selectSmallWidth(),
  selectedContest: selectSelectedContest(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ContestListPage);
