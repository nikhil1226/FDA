import React, { Component } from 'react';
import { Link } from 'react-router';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { SvgiTick } from '../SVGIcons';

export default class ReportSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: '',
      startDate: '',
      endDate: ''
    };
  }

  updateSite = (e) => {
    this.setState({ site: e.target.value });
  }

  updateStartDate = (e) => {
    this.setState({ startDate: e.target.value });
  }

  updateEndDate = (e) => {
    this.setState({ endDate: e.target.value });
  }

  render() {
    return (
      <div className="tabGridFilter">
        <Col xs={12} md={12}>
          <Row>
            <Col xs={12} md={3} className="no-padding">
              <Col xs={12} md={3} className="no-padding">Site</Col>
              <Col xs={12} md={9}>
                <input
                  type="text"
                  name="site"
                  className="filterTextbox"
                  placeholder="Enter Site Name"
                  onChange={this.updateSite}
                  value={this.state.site}
                />
              </Col>
            </Col>
            <Col xs={12} md={3} className="no-padding">
              <Col xs={12} md={3} className="no-padding">Start Date</Col>
              <Col xs={12} md={9}>
                <input
                  type="text"
                  name="startDate"
                  className="filterTextbox"
                  onChange={this.updateStartDate}
                  value={this.state.startDate}
                />
              </Col>
            </Col>
            <Col xs={12} md={3}>
              <Col xs={12} md={3} className="no-padding">End Date</Col>
              <Col xs={12} md={9}>
                <input
                  type="text"
                  name="startDate"
                  className="filterTextbox"
                  onChange={this.updateEndDate}
                  value={this.state.endDate}
                />
              </Col>
            </Col>
            <Col xs={12} md={3} className="no-padding">
              <RaisedButton
                className="table-button filterSearchButton"
                label="Search"
                icon={<SvgiTick />}
                onTouchTap={() => this.props.submit(_pickBy(this.state), _identity)}
              />
            </Col>
          </Row>
        </Col>
        <br className="clear" />
      </div>
    );
  }
}

