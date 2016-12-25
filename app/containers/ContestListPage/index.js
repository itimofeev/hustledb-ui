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
import { formatDate, keywords, avatarTextFrom } from '../../utils/util';
import { createStructuredSelector } from 'reselect';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import styles from './styles.css';
import imgHustleSA from './img/hustlesa.png';
import imgVK from './img/vk.png';

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

  onExpand = (itemId) => {
    if (this.props.selectedContest === itemId) {
      this.props.onContestSelect(false);
    } else {
      this.props.onContestSelect(itemId);
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
          {contestList.map((item) => {
              const isSelected = selectedContestId === item.id;

              return (
                <Paper
                  key={item.id}
                  className={isSelected ? styles.ContestItem_expanded : styles.ContestItem}
                >
                  <div className={styles.ContestItem_content} onClick={() => this.onExpand(item.id)}>
                    <div className={styles.ContestItem_image}>
                      <Avatar size={120}>{avatarTextFrom(item.title)}</Avatar>
                    </div>
                    <div className={styles.ContestItem_info}>
                      <div className={styles.ContestItem_title}>
                        {item.title}
                      </div>
                      <div className={styles.ContestItem_city}>
                        {item.city_name}
                      </div>
                    </div>
                    <div className={styles.ContestItem_date}>
                      {item.date_str}
                    </div>
                  </div>

                  <Divider />

                  <div className={`${styles.ContestItemCollapsible} ${isSelected ? styles.opened : ''}`}>
                    <a className={styles.ContestItemCollapsible_infoLink} href={item.url} target="_blank">
                      <img
                        alt="Иконка форума"
                        className={styles.ContestItemCollapsible_iconLink}
                        src={imgHustleSA}
                        style={{ width: 20, height: 20 }}
                      />
                      Форум
                    </a>
                    {item.vk_link &&
                    <a className={styles.ContestItemCollapsible_infoLink} href={item.vk_link} target="_blank">
                      <img
                        alt="Иконка вк"
                        className={styles.ContestItemCollapsible_iconLink}
                        src={imgVK}
                        style={{ width: 20, height: 20 }}
                      />
                      Группа ВК
                    </a>
                    }

                    {item.videos_link &&
                    <MarkdownElement text={`## Видео \n${item.videos_link}`} style={{ padding: 0 }} />
                    }
                    {item.results_link &&
                    <MarkdownElement text={`## Результаты \n${item.results_link}`} style={{ padding: 0 }} />
                    }
                  </div>
                </Paper>
              );
            }
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
          title="Турниры"
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
    React.PropTypes.number,
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
