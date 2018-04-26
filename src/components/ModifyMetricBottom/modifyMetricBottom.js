import React, { Component } from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual';
import _map from 'lodash/map';
import { Grid, Row, Col, Button, Tabs, Tab, Collapse, Well, Modal } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { SvgiNotepad, SvgiTick, SvgiCancel } from '../SVGIcons';

export default class ModifyMetricBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      latestComment: '',
      showSnackBar: false,
      snackBarMessage: '',
      bodyStyle: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.commentsList, nextProps.commentsList)) {
      const latestCommentsArr = _filter(nextProps.commentsList, 'isLatest');
      const latestComments = latestCommentsArr.length ? latestCommentsArr[0].commentDescription : '';
      this.setState({ comment: latestComments, latestComment: latestComments });
    }
  }

  updateComment = (e) => {
    this.setState({ comment: e.target.value });
  }

  submitComment = (e) => {
    if (this.state.comment === '') {
      this.setState({
        showSnackBar: true,
        snackBarMessage: 'Metric Reports comments Can Not Be Saved. Please Enter Comment',
        bodyStyle: { backgroundColor: 'red', color: 'white' }
      });
    } else {
      this.setState({ showSnackBar: true, snackBarMessage: 'Comments has been Saved Sucessfully' });
      this.props.onSaveComment(_pickBy(this.state), _identity);
    }
  }

  clearComment = (e) => {
    this.setState({ comment: this.state.latestComment });
  }

  resetSnackBar = () => {
    this.setState({ showSnackBar: false, snackBarMessage: '', bodyStyle: {} });
  }

  render() {
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
    return (
      <div className="modifyMetricBottom margin-top padding-top">
        <Col xs={12} md={6} className="no-padding">
          <div>
            <Col xs={6} md={3} className="no-padding">
                Comments / Report Summary Limit 300 Words (Mandatory) <span className="redrequired">*</span>
            </Col>
            <Col xs={6} md={9}>
              <TextField
                className="DescriptionTextfeild"
                hintText="Description"
                onChange={this.updateComment}
                value={this.state.comment}
                maxLength="300"
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
        <Col xs={12} md={6}>
          <RaisedButton
            className="table-button"
            label="Save Comment"
            onTouchTap={this.submitComment}
            icon={<SvgiTick />}
          />
          <RaisedButton
            className="table-button"
            label="Cancel"
            onTouchTap={this.clearComment}
            icon={<SvgiCancel />}
          />
        </Col>
        <Snackbar
          className="notificationBox"
          bodyStyle={this.state.bodyStyle}
          open={this.state.showSnackBar}
          message={this.state.snackBarMessage}
          onRequestClose={this.resetSnackBar}
          autoHideDuration={3000}
        />
      </div>
    );
  }
}
