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

class MaterialsGrid extends React.Component {
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
      slectedMaterial, listOfMaterials, deletedMaterials, isReadOnly, onDisabled, onSetRemoveMaterialComment,
      onAllMaterialSelcteChange, onAllChecked, onHandleMaterialSelectChange, onDeleteMaterial, onSaveBtnLabel,
      onSave, onCancelBtnLabel, onRedirectHomePage, isLoading, onAddMaterialToSelectedList, onFilterMaterial,
      onClearFilter
    } = this.props;

    const columns = [
      {
        Header: 'Material Number',
        accessor: 'materialNumber'
      }, {
        Header: 'Material Description',
        accessor: 'materialDescription'
      }, {
        Header: 'Processing Plant',
        accessor: 'processingPlant'
      }, {
        Header: 'Material Type',
        accessor: 'materialType'
      }, {
        Header: 'Brand',
        accessor: 'brand'
      }, {
        Header: 'Brand Description',
        accessor: 'brandDesc'
      }, {
        Header: 'Product NDC',
        accessor: 'productNdc'
      }
    ];

    const slectedMaterailsColumn = [{
      Header: 'Remove',
      accessor: '',
      maxWidth: 62,
      Cell: row => (
        <div className="text-center">
          <IconButton
            className="removeButton"
            disabled={row.original.comments === ''}
            onClick={() => onDeleteMaterial(row.original)}
          >
            <FontIcon className="fa fa-minus-circle" />
          </IconButton>
        </div>
      )
    }, {
      Header: 'Comment',
      accessor: 'comments',
      minWidth: 185,
      Cell: row => (
        <TextAreaField
          onDisabled={onDisabled}
          onHintText="Remove reason mandatory"
          onValue={row.value}
          onChange={(e) => onSetRemoveMaterialComment(e, row.original)}
        />
      )
    }];

    const ListMaterialColumn = [{
      Header: <CheckboxField
        onClick={onAllMaterialSelcteChange}
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
            onClick={() => onHandleMaterialSelectChange(row.original)}
            onChecked={row.value}
            onDisabled={onDisabled}
          />
        </span>
      )
    }];

    const renderLodingIcon = (
      isLoading
        ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" />
        : 'No Materails Found!'
    );

    const selectedMaterialColumnsArr = (isReadOnly) ? columns : _union(slectedMaterailsColumn, columns);
    const ListMaterialColumnsArr = (isReadOnly) ? columns : _union(ListMaterialColumn, columns);

    return (
      <div className="padding-vertical">
        <Row className="padding">
          <h3><span>Selected Materials</span>
            <div className="text-right titleButtons">
              {!isReadOnly && <ButtonField
                buttonLabel={onSaveBtnLabel}
                onClick={onSave}
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
          data={slectedMaterial}
          pageSize={slectedMaterial.length}
          showPagination={false}
          noDataText={renderLodingIcon}
          columns={selectedMaterialColumnsArr}
          {...this.state.tableOptions}
        />

        <div className="padding-vertical">
          {!isReadOnly && <div>
            <Row className="padding">
              <Col xs={12} md={12} className="np-left">
                <h3><span>List of Material</span>
                  <div className="titleButtons text-right">
                    <ButtonField
                      buttonLabel="Add Material"
                      onClick={onAddMaterialToSelectedList}
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
                  filter={onFilterMaterial}
                  clear={onClearFilter}
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
              data={listOfMaterials}
              columns={ListMaterialColumnsArr}
              noDataText={renderLodingIcon}
              {...this.state.tableOptions}
              pageSize={listOfMaterials.length}
            />
          </div>}

          {/* Deleted Materials */}
          {isReadOnly && <div>
            <Row className="padding">
              <Col xs={12} md={12} className="np-left">
                <h3><span>Deleted Materials</span></h3>
              </Col>
            </Row>
            <ReactTable
              id="testTable"
              className="fixed-table -striped -highlight ListofProducts"
              data={deletedMaterials}
              columns={columns}
              noDataText={renderLodingIcon}
              {...this.state.tableOptions}
              pageSize={deletedMaterials.length}
            />
          </div>}
        </div>
      </div>
    );
  }
}

export default MaterialsGrid;
