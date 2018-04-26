import React from 'react';
import _isEqual from 'lodash/isEqual';
import ReactTable from 'react-table';
import ReactLoading from 'react-loading';

class TableField extends React.Component {
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
        sortable: true,
        resizable: true
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let isRender = true;
    if (_isEqual(nextProps, this.props)) {
      isRender = false;
    }
    return isRender;
  }

  handleRowExpand = () => {
    this.props.onHandleRowExpand();
  }

  render() {
    const { isLoading, dataSource, columns } = this.props;
    return (
      <ReactTable
        onExpandedChange={this.handleRowExpand}
        className="-striped -highlight scheduleGrid scrollbarSpace"
        data={dataSource}
        columns={columns}
        noDataText={isLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
        pageSize={dataSource.length}
        showPagination={false}
        {...this.state.tableOptions}
      />
    );
  }
}

export default TableField;
