import React from 'react';
var PaginationHeader = React.createClass({
  propTypes: {
    current_page: React.PropTypes.number.isRequired,
    i18n: React.PropTypes.shape({
      items: React.PropTypes.string.isRequired,
      show: React.PropTypes.string.isRequired,
      showing_page: React.PropTypes.string.isRequired,
    }),
    onChange: React.PropTypes.func.isRequired,
    page_size: React.PropTypes.number.isRequired,
    total_items: React.PropTypes.number.isRequired,
  },

  getDefaultProps: function() {
    return {
      current_page: 1,
      page_size: 1,
      total_items: 1,
    };
  },

  handleChange: function(pageInfo) {
    if (this.props.onChange) {
      this.props.onChange(pageInfo);
    }
  },

  render: function() {
    var paginationHeader = this.props;
    return (
      <div className="v-pagination-block v-pagination-header">
        <div className="v-pagination-header__page-size">
          <PaginationSize {...paginationHeader} onChange={this.handleChange} />
        </div>
        <div className="v-pagination-header__page-position">
          <PaginationPosition {...paginationHeader} />
        </div>
      </div>
    );
  },
});
