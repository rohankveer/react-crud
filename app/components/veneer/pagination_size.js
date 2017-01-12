import React from 'react';
var PaginationSize = React.createClass({
  propTypes: {
    current_page: React.PropTypes.number.isRequired,
    i18n: React.PropTypes.shape({
      items: React.PropTypes.string.isRequired,
      show: React.PropTypes.string.isRequired,
    }),
    onChange: React.PropTypes.func,
    page_size: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      i18n: {
        items: 'items',
        show: 'Show',
      },
      page_size: 25,
    };
  },

  getInitialState: function() {
    return {
      page_size: this.props.page_size,
    };
  },

  calculateNewCurrentPage: function(oldPageSize, oldCurrentPage, newPageSize) {
    var firstEntryPosition = (oldCurrentPage * oldPageSize) - oldPageSize + 1;
    return parseInt((firstEntryPosition / newPageSize) + 1);
  },

  handleChange: function(selectedItem) {
    var oldPageSize = this.props.page_size;
    var oldCurrentPage = this.props.current_page;
    var newPageSize = parseInt(selectedItem.value);
    var newCurrentPage = this.calculateNewCurrentPage(oldPageSize, oldCurrentPage, newPageSize);

    this.setState({
      current_page: newCurrentPage,
      page_size: newPageSize,
    });

    if (this.props.onChange) {
      this.props.onChange({
        currentPage: newCurrentPage,
        pageSize: newPageSize,
      });
    }
  },

  render: function() {
    var pageSizes = [10, 25, 100];

    return (
      <div className="v-pagination-size">
        <span>{this.props.i18n.show} </span>
        <SelectBox className="select-box v-pagination-size__select-box" default_value={this.state.page_size} onChange={this.handleChange}>
          {
            pageSizes.map(function(pageSize) {
              return (
                <SelectBox.Item key={pageSize} name={pageSize} value={pageSize} />
              );
            })
          }
        </SelectBox>
        <span className="hidden-xs"> {this.props.i18n.items}</span>
      </div>
    );
  },
});
