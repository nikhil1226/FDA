import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import _filter from 'lodash/filter';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ReactTable from 'react-table';
import RaisedButton from 'material-ui/RaisedButton';
import ReactLoading from 'react-loading';
import ReactSuperSelect from 'react-super-select';
import {
  getScheduleById,
  filterProducts,
  resetProductFilter,
  filterMaterials,
  resetMaterialFilter,
  filterProductsDeleted,
  resetProductFilterDeleted,
  filterMaterialsDeleted,
  resetMaterialFilterDeleted
} from '../../../actions/ScheduleManagerActions';
import './ViewSchedule.scss';
import { SvgiPlus, SvgiCancel } from '../../SVGIcons';
import ScheduleEditGrid from '../../Grid/ScheduleEditGrid';
import ScheduleProductGrid from '../../Grid/ScheduleProductGrid';
import MaterialsGrid from '../../Grid/MaterialsGrid';

class ViewSchedule extends React.Component {
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
      productName: '',
      brandName: '',
      filtershown: false,
      filtershownDeleted: false,
      disable: true,
      isReadOnly: true
    };
  }

  componentWillMount() {
    const viewType = (localStorage.getItem('role') === 'GPC') ? 'schedule' : 'scope';
    this.props.dispatch(getScheduleById(this.props.params.scheduleId, viewType));
  }


  updateProductName = e => {
    this.setState({ productName: e.target.value });
  }

  updateBandName = e => {
    this.setState({ brandName: e.target.value });
  }

  filterMaterials = () => {
    this.props.dispatch(
      filterMaterials(
        this.state.productName, this.state.brandName
      )
    );
  }

  filterProducts = () => {
    this.props.dispatch(
      filterProducts(
        this.state.productName, this.state.brandName
      )
    );
  }

  clearFilterMaterial = () => {
    this.setState({ productName: '', brandName: '' });
    this.props.dispatch(
      resetMaterialFilter(
        )
    );
  }

  changeFilterName = () => {
    this.setState({ filtershown: !this.state.filtershown });
  }

  clearFilterProduct = () => {
    this.props.dispatch(resetProductFilter());
  }

  filterMaterialsDeleted = (productName, brandName) => {
    this.props.dispatch(
      filterMaterialsDeleted(
        productName, brandName
      )
    );
  }

  filterProductsDeleted = (productName, brandName) => {
    this.props.dispatch(
      filterProductsDeleted(
        productName, brandName
      )
    );
  }

  clearFilterMaterialDeleted = () => {
    this.props.dispatch(
      resetMaterialFilterDeleted(
        )
    );
  }

  changeFilterNameDeleted = () => {
    this.setState({ filtershownDeleted: !this.state.filtershownDeleted });
  }

  clearFilterProductDeleted = () => {
    this.setState({ productName: '', brandName: '' });
    this.props.dispatch(resetProductFilterDeleted());
  }

  redirectHomePage = () => {
    const pathArr = this.props.location.pathname.split('/').filter(Boolean);
    if (pathArr[0] === 'ScheduleReopen') {
      this.context.router.push('/ScheduleReopen');
    } else {
      this.context.router.push('/Schedule');
    }
  }

  render() {
    const selectedmaterialsTable = [
      {
        Header: 'Material Number',
        accessor: 'materialNumber'
      },
      {
        Header: 'Material Description',
        accessor: 'materialDescription'
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
    const viewType = (localStorage.getItem('role') === 'GPC') ? 'Schedule' : 'Scope';
    const { currentSchedule, selectedProductsList, isLoading, selectedMaterialsList } = this.props.scheduleManager;

    return (
      <div className="box box-primary CreateSchdule">
        <div className="padding modifyScheduleWrap">
          <ScheduleEditGrid
            pageTitle={`View ${viewType}`}
            scheduleData={currentSchedule}
            isLoading={isLoading}
            isReadOnly={this.state.isReadOnly}
            onDisable={this.state.disable}
          />
          <div className="padding-vertical">
            {localStorage.getItem('role') === 'GPC' && <ScheduleProductGrid
              slectedProducts={_filter(selectedProductsList, { isValid: 'YES' })}
              deletededProducts={_filter(selectedProductsList, { isValid: 'NO' })}
              isLoading={isLoading}
              isReadOnly={this.state.isReadOnly}
              onDisabled={this.state.disable}
              onCancelBtnLabel={'Back'}
              onRedirectHomePage={this.redirectHomePage}
            />}

            {localStorage.getItem('role') !== 'GPC' && <MaterialsGrid
              slectedMaterial={_filter(selectedMaterialsList, { valid: 'YES' })}
              deletedMaterials={_filter(selectedMaterialsList, { valid: 'NO' })}
              isLoading={isLoading}
              isReadOnly={this.state.isReadOnly}
              onDisabled={this.state.disable}
              onCancelBtnLabel={'Back'}
              onRedirectHomePage={this.redirectHomePage}
            />}
          </div>
          <Row className="show-grid padding-top">
            <Col xs={12} md={6} className="text-right">
              <RaisedButton
                label="Back"
                className="buttonStyle"
                onTouchTap={this.redirectHomePage}
                icon={<SvgiCancel />}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { scheduleManager: state.scheduleManager };
}

export default connect(mapStateToProps)(ViewSchedule);
