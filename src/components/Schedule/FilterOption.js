import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

export default class FilterOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      brandName: ''
    };
  }
  updateBrandName = (e) => {
    this.setState({ brandName: e.target.value });
  }
  updateSearchValue = (e) => {
    this.setState({ searchValue: e.target.value });
  }
  clearvalue = (e) => {
    this.setState({ searchValue: '', brandName: '' });
    this.props.clear();
  }
  render() {
    return (
      <div className="summary ">
        <div id="intro" className="collapse filter-options">
          <div className="filterPadding">
            <Col xs={12} md={12} className="np-left">
              <Row>
                <Col xs={12} md={3} className="">
                  <p>{this.props.TextBoxName}</p>
                  <input
                    type="text"
                    onChange={this.updateSearchValue}
                    name="searchQuery"
                    value={this.state.searchValue}
                  />
                </Col>
                <Col xs={12} md={3} className="">
                  {this.props.TextBoxName === 'Search By Record ID'
                  ? <p>Search By Material</p>
                  : <p>Search By Brand</p>}
                  <input
                    type="text"
                    onChange={this.updateBrandName}
                    name="searchQuery"
                    value={this.state.brandName}
                  />
                </Col>
                <Col xs={12} md={3} className="filter-products-margin">
                  <RaisedButton
                    label="Filter"
                    className="buttonStyle"
                    onTouchTap={() => this.props.filter(this.state.searchValue, this.state.brandName)}
                  />
                </Col>
                <Col xs={12} md={3} className="filter-products-margin">
                  <div
                    onClick={this.clearvalue}
                    className="text-right reports-search-clearfilter padding underline iconHover"
                  >
                    CLEAR FILTER
                  </div>
                </Col>
                <br className="clear" />
              </Row>
            </Col>
            <br className="clear" />
          </div>
        </div>
      </div>
    );
  }
}
