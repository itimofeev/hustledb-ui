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
import styles from './styles.css';

import {
  selectContestList,
  selectLoading,
  selectError,
} from '../../containers/App/selectors';

import {
  selectSelectedContest,
  selectSmallWidth,
  selectVisibleContestList,
} from './selectors';

import { loadContestList } from '../App/actions';
import { contestSelected, changeSmallWidth } from './actions';
import MarkdownElement from 'react-material-markdown-element';
import { FormattedMessage } from 'react-intl';

export class ContestListPage extends React.Component {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (!this.props.contestList) {
      this.props.onSubmitForm();
    }

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

  onExpand = (expanded, itemId) => {
    if (expanded) {
      this.props.onContestSelect(itemId);
    } else {
      this.props.onContestSelect(false);
    }
  };


  render() {
    const contestList = this.props.visibleContestList;
    const selectedContestId = this.props.selectedContest;
    let listRender;
    let loadingRender;
    let errorRender;

    if (contestList) {
      listRender = (
        <div className={styles.contestList}>
          {contestList.map((item) =>
            <Card
              key={item.id}
              expanded={selectedContestId === item.id}
              onExpandChange={(expanded) => this.onExpand(expanded, item.id)}
              className={selectedContestId === item.id ? styles.expandedContest : styles.contestItem}
            >
              <CardHeader
                title={item.title}
                subtitle={formatDate(item.date)}
                actAsExpander
              />
              <CardText expandable>
                Обсуждение: <a href={item.url}>hustle-sa</a>
                {item.videos_link &&
                <MarkdownElement text={`## Видео \n${item.videos_link}`} />
                }
                {item.results_link &&
                <MarkdownElement text={`## Результаты \n${item.results_link}`} />
                }
              </CardText>
            </Card>
          )}
        </div>
      );
    }

    if (this.props.loading) {
      loadingRender = (
        <CircularProgress size={80} thickness={5} />
      );
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
  visibleContestList: React.PropTypes.oneOfType([
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
  visibleContestList: selectVisibleContestList(),
  smallWidth: selectSmallWidth(),
  selectedContest: selectSelectedContest(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ContestListPage);
