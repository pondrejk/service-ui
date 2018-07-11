import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames/bind';
import { GhostButton } from 'components/buttons/ghostButton';
import { GhostMenuButton } from 'components/buttons/ghostMenuButton';
import { Breadcrumbs, breadcrumbDescriptorShape } from 'components/main/breadcrumbs';
import ImportIcon from './img/import-inline.svg';
import RefreshIcon from './img/refresh-inline.svg';
import styles from './actionPanel.scss';
import { breadcrumbsSelector } from '../../../../../controllers/testItem';

const cx = classNames.bind(styles);
const messages = defineMessages({
  actionsBtn: {
    id: 'ActionPanel.actionsBtn',
    defaultMessage: 'Actions',
  },
  actionMerge: {
    id: 'ActionPanel.actionMerge',
    defaultMessage: 'Merge',
  },
  actionCompare: {
    id: 'ActionPanel.actionCompare',
    defaultMessage: 'Compare',
  },
  actionMoveToDebug: {
    id: 'ActionPanel.actionMoveToDebug',
    defaultMessage: 'Move to debug',
  },
  actionForceFinish: {
    id: 'ActionPanel.actionForceFinish',
    defaultMessage: 'Force finish',
  },
  actionDelete: {
    id: 'ActionPanel.actionDelete',
    defaultMessage: 'Delete',
  },
  proceedButton: {
    id: 'ActionPanel.proceedButton',
    defaultMessage: 'Proceed Valid Items',
  },
});

@connect((state) => ({
  breadcrumbs: breadcrumbsSelector(state),
}))
@injectIntl
export class ActionPanel extends Component {
  static propTypes = {
    selectedLaunches: PropTypes.array,
    hasErrors: PropTypes.bool,
    showBreadcrumb: PropTypes.bool,
    intl: intlShape.isRequired,
    onImportLaunch: PropTypes.func,
    hasValidItems: PropTypes.bool,
    onProceedValidItems: PropTypes.func,
    onMerge: PropTypes.func,
    onCompare: PropTypes.func,
    onMoveToDebug: PropTypes.func,
    onForceFinish: PropTypes.func,
    onDelete: PropTypes.func,
    breadcrumbs: PropTypes.arrayOf(breadcrumbDescriptorShape),
  };

  static defaultProps = {
    selectedLaunches: [],
    hasErrors: false,
    showBreadcrumb: false,
    onImportLaunch: () => {},
    hasValidItems: false,
    onProceedValidItems: () => {},
    onMerge: () => {},
    onCompare: () => {},
    onMoveToDebug: () => {},
    onForceFinish: () => {},
    onDelete: () => {},
    breadcrumbs: [],
  };

  constructor(props) {
    super(props);
    this.actionDescriptors = this.createActionDescriptors();
  }

  createActionDescriptors = () => [
    {
      label: this.props.intl.formatMessage(messages.actionMerge),
      value: 'action-merge',
      onClick: this.props.onMerge,
    },
    {
      label: this.props.intl.formatMessage(messages.actionCompare),
      value: 'action-compare',
      onClick: this.props.onCompare,
    },
    {
      label: this.props.intl.formatMessage(messages.actionMoveToDebug),
      value: 'action-move-to-debug',
      onClick: this.props.onMoveToDebug,
    },
    {
      label: this.props.intl.formatMessage(messages.actionForceFinish),
      value: 'action-force-finish',
      onClick: this.props.onForceFinish,
    },
    {
      label: this.props.intl.formatMessage(messages.actionDelete),
      value: 'action-delete',
      onClick: this.props.onDelete,
    },
  ];

  render() {
    const {
      intl,
      showBreadcrumb,
      hasErrors,
      selectedLaunches,
      hasValidItems,
      onProceedValidItems,
      onImportLaunch,
      breadcrumbs,
    } = this.props;
    return (
      <div className={cx('action-panel', { 'right-buttons-only': !showBreadcrumb && !hasErrors })}>
        {showBreadcrumb && <Breadcrumbs descriptors={breadcrumbs} />}
        {hasErrors && (
          <GhostButton disabled={!hasValidItems} onClick={onProceedValidItems}>
            {intl.formatMessage(messages.proceedButton)}
          </GhostButton>
        )}
        <div className={cx('action-buttons')}>
          <div className={cx('action-button', 'mobile-hidden')}>
            <GhostButton icon={ImportIcon} onClick={onImportLaunch}>
              <FormattedMessage id="LaunchesPage.import" defaultMessage="Import" />
            </GhostButton>
          </div>
          <div className={cx('action-button', 'mobile-hidden')}>
            <GhostMenuButton
              title={intl.formatMessage(messages.actionsBtn)}
              items={this.actionDescriptors}
              disabled={!selectedLaunches.length}
            />
          </div>
          <div className={cx('action-button')}>
            <GhostButton icon={RefreshIcon} disabled>
              <FormattedMessage id="LaunchesPage.refresh" defaultMessage="Refresh" />
            </GhostButton>
          </div>
        </div>
      </div>
    );
  }
}
