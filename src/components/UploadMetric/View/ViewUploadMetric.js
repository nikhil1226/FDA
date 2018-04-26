import React from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {
  getUploadMetricDetailById,
  resetUploadMetricData
} from '../../../actions/UploadManagerActions';
import { uploadMetricHomeColumns, metricTypeForUploadDb } from '../../../constants/UploadMetricConstants';
import { SvgiCancel } from '../../SVGIcons';
import ReactTableCustom from '../../Grid/ReactTableCustom';

class ViewUploadMetric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      isMaterialListLoding: false,
      selectKeepDropDownOpen: false
    };
  }

  componentWillMount() {
    this.props.dispatch(resetUploadMetricData());
    this.props.dispatch(getUploadMetricDetailById(this.props.params.metricId));
  }

  render() {
    const { isLoading, currentModifyMetric, filteredUploadedMetricList } = this.props.uploadManager;
    const { uploadTableName } = currentModifyMetric[0];

    const columns = [];
    _map(uploadMetricHomeColumns, column => {
      const item = column;
      if (item.Cell && item.Cell === 'date') {
        item.Cell = row => (
          moment(row.value).utc().format('DD-MM-YYYY')
        );
      }
      columns.push(item);
    });
    const excelHeaderColumnsObj = _filter(metricTypeForUploadDb, item => item.id === uploadTableName)[0];
    const metricDataColumns = [];
    if (excelHeaderColumnsObj && excelHeaderColumnsObj.columns) {
      _map(excelHeaderColumnsObj.columns, ColItem => {
        const columnItem = ColItem;
        if (columnItem.isEditColumn) {
          columnItem.Cell = this.renderEditable;
        }
        metricDataColumns.push(columnItem);
      });
    }
    console.log(metricDataColumns, 'metricDataColumns');

    return (
      <div className="box box-primary">
        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>View Upload Data</p>
        </Row>
        <ReactTable
          className="fixed-table -striped -highlight scrollbarSpace"
          columns={columns}
          data={currentModifyMetric}
          defaultPageSize={1}
          noDataText="No data Found!"
          showPagination={false}
        />
        <div className="padding-vertical">
          <ReactTableCustom
            className="fixed-table -striped -highlight"
            data={filteredUploadedMetricList}
            columns={metricDataColumns}
            nodata={isLoading}
            pageSize={4}
          />
        </div>
        <Row className="show-grid padding-top">
          <Col xs={12} md={12} className="text-center">
            <RaisedButton
              label="Back"
              className="table-button"
              containerElement={<Link to="/UploadMetricReopen" />}
              icon={<SvgiCancel />}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { uploadManager: state.uploadManager };
}

export default connect(mapStateToProps)(ViewUploadMetric);
