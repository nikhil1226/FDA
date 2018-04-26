import React, { Component } from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import { Grid, Row, Col, Button, Tabs, Tab, Collapse, Well, Modal } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import {
  SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiUpload, SvgiNotepad,
  SvgiTick, SvgiDownload, SvgiCancel
} from '../SVGIcons';

export default class ViewMetricBottom extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      tableOptions: {
        loading: false,
        showPagination: false,
        showPageSizeOptions: false,
        showPageJump: false,
        collapseOnSortingChange: false,
        collapseOnPageChange: false,
        collapseOnDataChange: false,
        freezeWhenExpanded: false,
        filterable: false,
        sortable: false,
        resizable: true
      },
      disable: true,
      showSnackBar: false,
      snackBarMessage: '',
      key: 1,
      testsArray: [],
      open: false
    };
  }

  detailView = () => {
    const pathArr = this.props.loc.pathname.split('/').filter(Boolean);
    this.context.router.push(`/${pathArr[0]}/DetailView/${this.props.metricID}`);
  }

  redirectHomePage = () => {
    const pathArr = this.props.loc.pathname.split('/').filter(Boolean);
    if (pathArr[0] === 'MetricReportReview') {
      this.context.router.push('/MetricReportReview');
    } else {
      this.context.router.push('/MetricMaintenance');
    }
  }

  render() {
    const loc = this.props.loc.pathname;
    const commentsView = (
      <div>
        <Well className="np-right">
          {_map(_filter(this.props.commentsList, ['isLatest', false]), (item, index) =>
            <div
              className="margin-bottom"
              key={index}
            >
              <Col xs={2} md={2} className="no-padding">
                {item.roleName} Comments {item.commentBy}
              </Col>
              <Col xs={10} md={10} className="commentBox">
                Date : {moment(item.commentedOn).format('DD-MMM-YYYY')} <br />
                {item.commentDescription}
              </Col>
              <br className="clear" />
            </div>
          )}
        </Well>
      </div>
    );
    const latestCommentsArr = _filter(this.props.commentsList, 'isLatest');
    const latestComments = latestCommentsArr.length ? latestCommentsArr[0].commentDescription : '';
    return (
      <div className="modifyMetricBottom margin-top">
        <Col xs={12} md={12} className="text-right">
          {(loc && ((loc.indexOf('/MetricMaintenance/View') > -1) || (loc.indexOf('/MetricReportReview/View') > -1))) ?
            <RaisedButton
              className="table-button"
              label="Detailed View"
              onTouchTap={this.detailView}
              icon={<SvgiTick />}
            /> : ''
          }
          <RaisedButton
            className="table-button"
            label="Cancel"
            onClick={this.redirectHomePage}
            icon={<SvgiCancel />}
          />
        </Col>
        <Col xs={12} md={6} className="no-padding">
          <div>
            <Col xs={6} md={3} className="no-padding">
              Comments / Report Summary Limit 300 Words (Mandatory)
            </Col>
            <Col xs={6} md={9}>
              <TextField
                className="DescriptionTextfeild"
                disabled={this.state.disable}
                hintText="Description"
                value={latestComments}
                multiLine
                rows={2}
              />
            </Col>
          </div>
          <div>
            <a onClick={() => this.props.setOpen(this.props.open)} className="ViewCommentButton margin-vertical text-center">
              View Comment History <i className="fa fa-caret-down" aria-hidden="true" /></a>
            <Collapse in={this.props.open}>
              {commentsView}
            </Collapse>
          </div>
        </Col>
        <br className="clear" />
      </div>
    );
  }
}
