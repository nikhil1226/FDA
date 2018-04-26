import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import _filter from 'lodash/filter';
import _union from 'lodash/union';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import FilterOption from '../Schedule/FilterOption';
import { SvgiPlus, SvgiCancel } from '../SVGIcons';
import {
  filterMaterials,
  resetMaterialFilter,
  setRemoveMaterialComment
} from './../../actions/MetricsManagerActions';

class ScopeDefined extends Component {
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
      filtershown: false,
      disable: false,
      selectKeepDropDownOpen: true
    };
  }

  setRemoveMaterialComment = (e, row) => {
    this.props.dispatch(setRemoveMaterialComment(e.target.value, row.materialPk));
  }

  filterMaterials = (materialName, brandName) => {
    this.props.dispatch(
      filterMaterials(
        materialName, brandName
      )
    );
  }

  clearFilter = () => {
    this.props.dispatch(
      resetMaterialFilter()
    );
  }

  changeFilterName = () => {
    this.setState({ filtershown: !this.state.filtershown });
  }

  render() {
    const {
      filteredMaterialsList, selectedMaterialsList, isLoading,
      addMaterialsToSelectedList, changeFilterName, filtershown, onStatus
    } = this.props;
    const materialsColumnAction = [
      {
        Header: <Checkbox onCheck={this.props.handleAllMaterialsSelcteChange} checked={this.props.val} />,
        accessor: 'checked',
        maxWidth: 58,
        Cell: row => (
          <span className="gridCheckbox">
            <Checkbox checked={row.value} onCheck={() => this.props.handleMaterialSelectChange(row.original)} />
          </span>
        )
      }];

    const selectedmaterialsActionColumn = [
      {
        Header: 'Remove',
        accessor: '',
        maxWidth: 68,
        Cell: row => (
          <div>
            <IconButton
              className="removeButton"
              disabled={((localStorage.getItem('role') === 'SPR' || onStatus === '37') && row.original.comments === '')}
              onClick={() => this.props.deleteMaterial(row.original)}
            >
              <FontIcon className="fa fa-minus-circle" />
            </IconButton>
          </div>
        )
      }, {
        Header: 'Comment',
        accessor: 'comments',
        minWidth: 185,
        show: (localStorage.getItem('role') === 'SPR' || onStatus === '37'),
        Cell: row => (
          <TextField
            className="DescriptionTextfeild"
            hintText="Remove reason mandatory"
            value={row.value}
            onChange={(e) => this.setRemoveMaterialComment(e, row.original)}
            multiLine
            rows={2}
          />
        )
      }];
    const materialsTable = [
      {
        Header: 'Material Number',
        accessor: 'materialNumber',
        maxWidth: 150
      },
      {
        Header: 'Material Description',
        accessor: 'materialDescription',
        minWidth: 245
      },
      {
        Header: 'Processing Plant',
        accessor: 'processingPlant'
      },
      {
        Header: 'Material Type',
        accessor: 'materialType'
      },
      {
        Header: 'Brand',
        accessor: 'brand'
      },
      {
        Header: 'Brand Description',
        accessor: 'brandDesc'
      },
      {
        Header: 'Product NDC',
        accessor: 'productNdc'
      }
    ];
    const materialsTableCoumns = _union(materialsColumnAction, materialsTable);
    const SelectedmaterialsColumns = _union(selectedmaterialsActionColumn, materialsTable);
    return (
      <div>
        <div className="padding-vertical">
          <Row className="padding">
            <h3><span>Selected Materials</span>
              <div className="titleButtons text-right">
                <RaisedButton
                  label="Save"
                  className="buttonStyle"
                  onTouchTap={this.props.saveScope}
                  containerElement={<Link to="" />}
                  icon={<SvgiPlus />}
                />
                <RaisedButton
                  label="Cancel"
                  className="buttonStyle"
                  containerElement={<Link to={this.props.linkTo} />}
                  icon={<SvgiCancel />}
                />
              </div>
              <br className="clear" />
            </h3>
          </Row>
          <ReactTable
            className="fixed-table -striped -highlight"
            data={_filter(selectedMaterialsList, ['isSelected', true])}
            pageSize={_filter(selectedMaterialsList, ['isSelected', true]).length}
            showPagination={false}
            columns={SelectedmaterialsColumns}
            {...this.state.tableOptions}
            noDataText={isLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
          />
        </div>
        <div className="padding-vertical">
          <Row className="padding positionArrange">
            <Col xs={12} md={12} className="no-padding">
              <h3><span>List of  Materials</span>
                <div className="titleButtons text-right">
                  <RaisedButton
                    label="Add Materials"
                    className="buttonStyle"
                    onTouchTap={addMaterialsToSelectedList}
                    icon={<SvgiPlus />}
                  />
                </div>
                <br className="clear" />
              </h3>
            </Col>
            <Col xs={12} md={12} className="text-right margin-top">
              <a
                className="alerthideShowToggle margin-right"
                data-toggle="collapse"
                data-target="#intro"
                onClick={changeFilterName}
              >
                <i
                  className={
                    filtershown === true
                      ? 'fa fa-minus-square-o'
                      : 'fa fa-plus-square-o'
                  }
                  aria-hidden="true"
                />
                {' '}
                {filtershown === true ? 'Hide' : 'Show'} Filter Options
              </a>
            </Col>
          </Row>
          <FilterOption
            TextBoxName={'Search By Material Description'}
            filter={this.filterMaterials}
            clear={this.clearFilter}
          />
          <ReactTable
            getTrProps={(state, rowInfo, column) => ({
              style: {
                background: rowInfo.original.isDeleted ? '#f2dede' : ''
              }
            })}
            className="fixed-table -striped -highlight"
            data={filteredMaterialsList}
            columns={materialsTableCoumns}
            noDataText={isLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
            {...this.state.tableOptions}
            pageSize={filteredMaterialsList.length}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { metricsManager: state.metricsManager, login: state.login };
}

export default connect(mapStateToProps)(ScopeDefined);
