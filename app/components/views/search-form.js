import React from 'react';

export default React.createClass({

  getQuery: function() {
    return this.refs.search.value;
  },

  render: function() {
    return (
      <div className="row">
        <div className=" col-xs-12 col-sm-6">
          <form onSubmit={this.props.search} className="search">
            <div className="input-group">
              <input type="text" ref="search" className="form-control" placeholder="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Search</button>
              </span>
            </div>
          </form>
        </div>
      </div>

    );
  }

});
