"use strict";

if (typeof exports !== "undefined") {
  var React = require("react");
  var classNames = require("classnames");
  var LHUtils = require("../utils/lh_utils.js");
}

var PaginationNav = React.createClass({
  propTypes: {
    current_page: React.PropTypes.number.isRequired,
    i18n: React.PropTypes.shape({
      next: React.PropTypes.string.isRequired,
      previous: React.PropTypes.string.isRequired,
    }),
    last_page: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      i18n: {
        next: "Next",
        previous: "Previous",
      },
    };
  },

  handleChange: function(event) {
    event.preventDefault();
    var pageToGo = parseInt(event.currentTarget.dataset.page_number);
    if (this.props.onChange) {
      this.props.onChange(pageToGo);
    }
  },

  addLinkOrDivWrapper: function(innerHtml, isLinked, isPageNumber = false, pageNumber) {
    if (isLinked) {
      return (
        <a href="#" data-page_number={pageNumber} onClick={this.handleChange} className="v-pagination-nav__page v-pagination-nav__page--link">
          {innerHtml}
        </a>
      );
    } else {
      var classes = classNames({
        "v-pagination-nav__page": true,
        "v-pagination-nav__page--selected": isPageNumber,
        "v-pagination-nav__page--disabled": !isPageNumber,
      });

      return (
        <div className={classes}>
          {innerHtml}
        </div>
      );
    }
  },

  getPreviousOrNextButton: function(isDisabled, isPrevious, pageNumber) {
    var buttonName = isPrevious ? `« ${this.props.i18n.previous}` : `${this.props.i18n.next} »`;
    return this.addLinkOrDivWrapper(
      buttonName,
      !isDisabled,
      false,
      pageNumber
    );
  },

  render: function() {
    var paginationNav = this.props;
    var pagesToRender = LHUtils.Pagination.getPagesToRender(paginationNav.current_page, paginationNav.last_page);
    var pagesToRenderResponsive = LHUtils.Pagination.getPagesToRender(paginationNav.current_page, paginationNav.last_page, 3);
    var previousButton = this.getPreviousOrNextButton(paginationNav.current_page === 1, true, paginationNav.current_page - 1);
    var nextButton = this.getPreviousOrNextButton(paginationNav.current_page === paginationNav.last_page, false, paginationNav.current_page + 1);

    return (
      <ul {...this.props} className="v-pagination-block v-pagination-nav">
        <li className="v-pagination-nav__item v-pagination-nav__previous">
          {previousButton}
        </li>
        {
          pagesToRender.map(function(page) {
            let itemClasses = classNames({
              "v-pagination-nav__item": true,
              "hidden-xs": pagesToRenderResponsive.indexOf(page) < 0,
            });
            return (
              <li key={page} className={itemClasses}>
              {
                this.addLinkOrDivWrapper(
                  <span className="v-pagination-nav__page-number">{page}</span>,
                  paginationNav.current_page !== page,
                  true,
                  page
                )
              }
              </li>
            );
          }, this)
        }
        <li className="v-pagination-nav__item v-pagination-nav__next">
          {nextButton}
        </li>
      </ul>
    );
  },
});

if (typeof exports !== "undefined") {
  module.exports = PaginationNav;
}