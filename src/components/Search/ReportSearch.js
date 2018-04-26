import React, { Component } from 'react';
import { Link } from 'react-router';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { SvgiTick, SvgiCancel } from '../SVGIcons';

export default class ReportSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportQuarter: '',
      batchNumber: '',
      materialNumber: '',
      description: ''
    };
  }

  changeValues = (e) => {
    this.setState({ reportQuarter: e.target.value });
  }

  updateBatchNumber = (e) => {
    this.setState({ batchNumber: e.target.value });
  }

  updateDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  updateMaterialNumber = (e) => {
    this.setState({ materialNumber: e.target.value });
  }

  clear = (e) => {
    this.setState({ reportQuarter: '', batchNumber: '', materialNumber: '', description: '' });
    this.props.submit({ reportQuarter: '', batchNumber: '', materialNumber: '', description: '' });
  }

  render() {
    return (
      <div className="tabGridFilter">
        <Col xs={12} md={12}>
          <Row>
            <Col xs={12} md={8} className="no-padding">
              {this.props.isReportQuarter ?
                <Col xs={12} md={4} className="no-padding">
                  <Col xs={12} md={4} className="no-padding">Reporting Quarter</Col>
                  <Col xs={12} md={8}>
                    <input
                      type="text"
                      name="reportquarter"
                      className="filterTextbox"
                      placeholder="Q-YYYY"
                      onChange={this.changeValues}
                      value={this.state.reportQuarter}
                    />
                  </Col>
                </Col> : ''
              }
              <Col xs={12} md={4} className="no-padding">
                <Col xs={12} md={4} className="no-padding">Description</Col>
                <Col xs={12} md={8}>
                  <input
                    type="text"
                    name="description"
                    className="filterTextbox"
                    onChange={this.updateDescription}
                    value={this.state.description}
                  />
                </Col>
              </Col>
              {this.props.isBatchNumber ?
                <Col xs={12} md={4} className="no-padding">
                  <Col xs={12} md={4} className="no-padding">Batch Number</Col>
                  <Col xs={12} md={8}>
                    <input
                      className="filterTextbox"
                      type="text"
                      name="batchnumber"
                      onChange={this.updateBatchNumber}
                      value={this.state.batchNumber}
                    />
                  </Col>
                </Col>
              : ''}
              {this.props.isMaterialNumber ?
                <Col xs={12} md={4} className="no-padding">
                  <Col xs={12} md={4} className="no-padding">Material Number</Col>
                  <Col xs={12} md={8}>
                    <input
                      className="filterTextbox"
                      type="text"
                      name="materialnumber"
                      onChange={this.updateMaterialNumber}
                      value={this.state.materialNumber}
                    />
                  </Col>
                </Col>
              : ''}
            </Col>
            <Col xs={12} md={4} className="no-padding">
              <Col xs={12} md={6} className="no-padding">
                <RaisedButton
                  className="table-button filterSearchButton"
                  icon={<SvgiTick />}
                  label="Search"
                  onTouchTap={() => this.props.submit(_pickBy(this.state), _identity)}
                />
              </Col>
              <Col xs={12} md={6}>
                <RaisedButton
                  className="table-button filterSearchButton"
                  onClick={this.clear}
                  label="clear"
                  icon={<SvgiCancel />}
                />
              </Col>
            </Col>
          </Row>
        </Col>
        <br className="clear" />
      </div>
    );
  }
}

