import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import _findIndex from 'lodash/findIndex';
import _toNumber from 'lodash/toNumber';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Modal, Row, Col } from 'react-bootstrap';
import './UserRequestAdmin.scss';
import { SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiUpload, SvgiNotepad, SvgiTick, SvgiDownload } from '../../SVGIcons';

class UserRequestAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testsArray: [
        {
          apply: '1',
          application: ' ',
          level: ' ',
          role: ' ',
          userGroup: ' ',
          description: ' '
        }
      ]
    };
  }
  render() {
        /* eslint-disable */
        const columns = [
            {
                Header: '',
                accessor: 'apply',
                maxWidth: 58,
                Cell: row => (
                <span className="text-center">
                    <Checkbox name="" />
                </span>
                )
            },
            {
                Header: 'Action',
                accessor: 'application',
                maxWidth: 75,
                Cell: row => (
                <div className="text-center">
                    <IconButton
                    tooltip="Approve" className="actionButtons"
                    >
                    <FontIcon className="fa fa-check" />
                    </IconButton>
                    <IconButton
                    tooltip="Reject" className="actionButtons"
                    >
                    <FontIcon className="fa fa-times" />
                    </IconButton>
                </div>
                )
            },
            {
                Header: 'User ID',
                accessor: 'level'
            },
            {
                Header: 'Application',
                accessor: 'application'
            },
            {
                Header: 'Level',
                accessor: 'level'
            },
            {
                Header: 'Role',
                accessor: 'role'
            },
            {
                Header: 'User Group',
                accessor: 'userGroup'
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: row => (
                    <TextField
                        className="textarea"
                        hintText="Description Max 100 Characters"
                        maxLength="100"
                        multiLine
                        rows={2}
                    />
                )

            },
            {
                Header: 'Status',
                accessor: 'status'
            },
            {
                Header: 'Comments',
                accessor: 'description',
                Cell: row => (
                    <TextField
                        className="textarea"
                        hintText="Comments"
                        multiLine
                        rows={2}
                    />
                )

            }
        ];

        const buttonView = (
            <div className="padding-top padding-left">
                <RaisedButton
                    className="table-button"
                    label="Generate Report"
                    icon={<SvgiPlus />}
                />
                <RaisedButton
                    className="table-button"
                    label="Send for Site Approval"
                    icon={<SvgiTick />}
                />
                <RaisedButton
                    className="table-button"
                    label="Approved"
                    icon={<SvgiTick />}
                />
            </div>
        );

        return (
            <div className="metricDiv newUserWrap">
                <div>
                    <ReactTable
                        className="-striped -highlight scheduleGrid"
                        data={this.state.testsArray}
                        pageSize={this.state.testsArray.length}
                        columns={columns}
                        showPagination={false}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { UserRequest: state.UserRequest, login: state.login };
}

export default connect(mapStateToProps)(UserRequestAdmin);
