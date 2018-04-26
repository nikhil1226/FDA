import React from 'react';
import ReactTable from 'react-table';
import { Modal, Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { SvgiPlus } from '../SVGIcons';


class LinkedScheduleModel extends React.Component {
  render() {
    const linkedSchedulecolumns = [
      {
        Header: 'ScheduleRecordId',
        accessor: 'scheduleRecordId'
      },
      {
        Header: 'ScheduleDescription',
        accessor: 'scheduleDescription'
      }
    ];

    const linkedScheduleListArray = (
      <ReactTable
        className="-striped -highlight scheduleGrid"
        data={this.props.dataInfo}
        columns={linkedSchedulecolumns}
        noDataText={'No data Found!'}
        pageSize={this.props.dataInfo.length}
        showPagination={false}
      />
    );
    return (
      <Modal
        show={this.props.onShowModel}
        onHide={this.props.onCloseModel}
      >
        <Modal.Header>
          <Modal.Title
            aria-labelledby="contained-modal-title-sm"
            className="text-center"
          >
            Linked schedules In Metric Report
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="no-padding">
          {linkedScheduleListArray}
        </Modal.Body>

        <Modal.Footer>
          <RaisedButton
            className="table-button"
            label="Close"
            onTouchTap={this.props.onCloseModel}
            icon={<SvgiPlus />}
          />
        </Modal.Footer>

      </Modal>
    );
  }
}

export default LinkedScheduleModel;
