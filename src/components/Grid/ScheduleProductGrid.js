import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import ReactLoading from 'react-loading';
import { Row, Col } from 'react-bootstrap';
import _filter from 'lodash/filter';
import _union from 'lodash/union';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import { TextAreaField, CheckboxField, ButtonField } from '../FormInputs/';
import { SvgiPlus, SvgiCancel } from '../SVGIcons';
import FilterOption from '../Schedule/FilterOption';

class ScheduleProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtershown: false,
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
      }
    };
  }

  changeFilterName = () => {
    this.setState({ filtershown: !this.state.filtershown });
  }

  render() {
    const {
      slectedProducts, listProducts, isReadOnly, onStatus, onDeleteProduct,
      onSetRemoveMaterialComment, onAllPoductsSelectChange, onSaveScheduleLabel, onCancelBtnLabel,
      onAllChecked, onDisabled, onHandleProductSelectChange, onSaveSchedule, deletededProducts,
      onAddProductsToSelectedList, isLoading, onRedirectHomePage, onFilterProducts, onClearProducts
    } = this.props;

    const columns = [{
      Header: 'Proprietary Name',
      accessor: 'productName'
    }, {
      Header: 'Brand Name',
      accessor: 'brandName'
    }, {
      Header: 'Local Dosage Form',
      accessor: 'localDosageForm'
    }, {
      Header: 'Dosage Strength',
      accessor: 'dosageStrength'
    }, {
      Header: 'Strength Unit',
      accessor: 'strengthUnit'
    }, {
      Header: 'Product NDC',
      accessor: 'productNdc'
    }, {
      Header: 'Application Number',
      accessor: 'applicationNumber'
    }, {
      Header: 'Product Type Name',
      accessor: 'type'
    }];

    const slectedProductColumn = [{
      Header: 'Remove',
      accessor: '',
      maxWidth: 62,
      Cell: row => (
        <div className="text-center">
          <IconButton
            className="removeButton"
            disabled={onStatus === '21' && row.original.comments === ''}
            onClick={() => onDeleteProduct(row.original)}
          >
            <FontIcon className="fa fa-minus-circle" />
          </IconButton>
        </div>
      )
    }, {
      Header: 'Comment',
      accessor: 'comments',
      minWidth: 185,
      show: onStatus === '21',
      Cell: row => (
        <TextAreaField
          onDisabled={onDisabled}
          onHintText="Remove reason mandatory"
          onValue={row.value}
          onChange={(e) => onSetRemoveMaterialComment(e, row.original)}
        />
      )
    }];

    const ListProductColumn = [{
      Header: <CheckboxField
        onClick={onAllPoductsSelectChange}
        onChecked={onAllChecked}
        onDisabled={onDisabled}
      />,
      accessor: 'checked',
      hideFilter: true,
      minWidth: 56,
      filterable: false,
      Cell: row => (
        <span className="text-center">
          <CheckboxField
            onClick={() => onHandleProductSelectChange(row.original)}
            onChecked={row.value}
            onDisabled={onDisabled}
          />
        </span>
      )
    }];

    const renderLodingIcon = (
      isLoading
        ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" />
        : 'No Products Found!'
    );

    const selectedProductColumnsArr = (isReadOnly) ? columns : _union(slectedProductColumn, columns);
    const ListProductColumnsArr = (isReadOnly) ? columns : _union(ListProductColumn, columns);

    return (
      <div className="padding-vertical">
        <Row className="padding">
          <h3><span>Selected Products</span>
            <div className="text-right titleButtons">
              {!isReadOnly && <ButtonField
                buttonLabel={onSaveScheduleLabel}
                onClick={onSaveSchedule}
                buttonIcon={<SvgiPlus />}
              /> }
              <ButtonField
                buttonLabel={onCancelBtnLabel}
                onClick={onRedirectHomePage}
                buttonIcon={<SvgiCancel />}
              />
            </div>
            <br className="clear" />
          </h3>
        </Row>
        <ReactTable
          className="fixed-table -striped -highlight slctdPrdctsGrid"
          data={slectedProducts}
          pageSize={slectedProducts.length}
          showPagination={false}
          noDataText={renderLodingIcon}
          columns={selectedProductColumnsArr}
          {...this.state.tableOptions}
        />

        <div className="padding-vertical">
          {!isReadOnly && <div>
            <Row className="padding">
              <Col xs={12} md={12} className="np-left">
                <h3><span>List of Products</span>
                  <div className="titleButtons text-right">
                    <ButtonField
                      buttonLabel="Add Products"
                      onClick={onAddProductsToSelectedList}
                      buttonIcon={<SvgiPlus />}
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
                  onClick={this.changeFilterName}
                >
                  <i
                    className={
                      this.state.filtershown === true
                        ? 'fa fa-minus-square-o'
                        : 'fa fa-plus-square-o'
                    }
                    aria-hidden="true"
                  />
                  {' '}
                  {this.state.filtershown === true ? 'Hide' : 'Show'} Filter Options
                </a>
                <FilterOption
                  TextBoxName={'Search By Product'}
                  filter={onFilterProducts}
                  clear={onClearProducts}
                />
              </Col>
            </Row>

            <ReactTable
              getTrProps={(state, rowInfo, column) => ({
                style: {
                  background: rowInfo.original.isDeleted ? '#f2dede' : ''
                }
              })}
              id="testTable"
              className="fixed-table -striped -highlight ListofProducts"
              data={listProducts}
              columns={ListProductColumnsArr}
              noDataText={renderLodingIcon}
              {...this.state.tableOptions}
              pageSize={listProducts.length}
            />
          </div>}

          {/* Deleted Products */}
          {isReadOnly && <div>
            <Row className="padding">
              <Col xs={12} md={12} className="np-left">
                <h3><span>Deleted Products</span></h3>
              </Col>
            </Row>
            <ReactTable
              id="testTable"
              className="fixed-table -striped -highlight ListofProducts"
              data={deletededProducts}
              columns={columns}
              noDataText={renderLodingIcon}
              {...this.state.tableOptions}
              pageSize={deletededProducts.length}
            />
          </div>}
        </div>
      </div>
    );
  }
}

export default ScheduleProductGrid;
