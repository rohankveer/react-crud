import React from 'react';
var PaginationPosition = React.createClass({
  propTypes: {
    current_page: React.PropTypes.number.isRequired,
    i18n: React.PropTypes.shape({
      showing_page: React.PropTypes.string.isRequired,
    }),
    page_size: React.PropTypes.number.isRequired,
    total_items: React.PropTypes.number.isRequired,
  },

  getDefaultProps: function() {
    return {
      i18n: {
        showing_page: "%{start} to %{end} of %{total} items",
      }
    }
  },

  render: function() {
    var startPoint = (this.props.current_page - 1) *  this.props.page_size + 1;
    var endPoint = this.props.current_page * this.props.page_size;
    var total = this.props.total_items;

    if (endPoint > total) {
      endPoint = total;
    }

    var text = this.props.i18n.showing_page;
    text = text.replace("%{start}", startPoint);
    text = text.replace("%{end}", endPoint);
    text = text.replace("%{total}", total);

    return (
      <p className="v-pagination-position">
        {text}
      </p>
    );
  },
});
