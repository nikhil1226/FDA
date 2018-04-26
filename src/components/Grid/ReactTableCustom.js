import React from 'react';
import ReactTable from 'react-table';
import ReactLoading from 'react-loading';

class ReactTableCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableOptions: {
        loading: false,
        showPagination: true,
        showPageSizeOptions: false,
        showPageJump: true,
        showPaginationBottom: false,
        defaultPageSize: 4,
        collapseOnSortingChange: false,
        collapseOnPageChange: false,
        collapseOnDataChange: false,
        freezeWhenExpanded: false,
        filterable: false,
        sortable: false,
        resizable: true
      },
      page: 0,
      totalPages: 0
    };
  }

  incrementPage = () => {
    let newPage = this.state.page + 1;
    newPage = newPage >= this.state.totalPages ? this.state.totalPages - 1 : newPage;
    this.setState(prevState => ({
      page: newPage
    }));
  }

  decrementPage = () => {
    const newPage = this.state.page <= 0 ? 0 : this.state.page - 1;
    this.setState(prevState => ({
      page: newPage
    }));
  }

  firstPage = () => {
    let newPage = 0;
    newPage = newPage >= this.state.totalPages ? this.state.totalPages - 1 : newPage;
    this.setState(prevState => ({
      page: newPage
    }));
  }

  lastPage = () => {
    let newPage = this.state.totalPages;
    newPage = newPage >= this.state.totalPages ? this.state.totalPages - 1 : newPage;
    this.setState(prevState => ({
      page: newPage
    }));
  }

  handleWheel = (event) => {
    event.preventDefault();
    if (event.nativeEvent.deltaY < 0) {
      this.decrementPage();
    } else {
      this.incrementPage();
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.incrementPage();
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.decrementPage();
    }
  }

  render() {
    const context = this;
    const pageSize = (context.props.pageSize && context.props.pageSize > 0) ? context.props.pageSize : context.state.tableOptions.defaultPageSize;
    context.state.totalPages = Math.ceil(context.props.data.length / pageSize);
    return (
      <div>
        <div className="text-right">
          <input type="image" src="../public/dist/img/icons/font-awesome_fast-backward_8_8.png" title="Top Page" onClick={context.firstPage} />
          <input type="image" src="../public/dist/img/icons/font-awesome_step-backward_8_8.png" title="Previous Page" onClick={context.decrementPage} />
        </div>
        <div className="row">
          <div className="col col-xs-12">
            <div id="tableCustomDiv" onWheel={this.handleWheel} onKeyDown={this.handleKeyPress} tabIndex="0" >
              <ReactTable
                className={context.props.className}
                data={context.props.data}
                page={context.state.page}
                columns={context.props.columns}
                noDataText={context.props.nodata ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found'}
                {...context.state.tableOptions}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-xs-11">
            <div className="text-left">
              <p> <br /> {context.props.data.length} Records (Showing page {context.state.totalPages === 0 ? 0 : context.state.page + 1} of {context.state.totalPages}). <br /> </p>
            </div>
          </div>
          <div className="col col-xs-1">
            <div className="text-right">
              <input type="image" src="../public/dist/img/icons/font-awesome_fast-forward_8_8.png" title="Last Page" onClick={context.lastPage} />
              <input type="image" src="../public/dist/img/icons/font-awesome_step-forward_8_8.png" title="Next Page" onClick={context.incrementPage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReactTableCustom;
