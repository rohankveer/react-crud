import React from 'react';
import { connect } from 'react-redux';
import UserDocumentList from '../views/user-document-list';
import * as userApi from '../../api/user-api';
import store from '../../store';
import { loadSearchLayout } from '../../actions/search-layout-actions';

const UserDocumentListContainer = React.createClass({

  getInitialState: function() {
        return {
            sortBy: {
                key: "name",
                order: "ascending"
            },
        }
  },

  sortByClick: function(sort_by){

      // call api here to get sorted data
      if(this.state.sortBy.key == sort_by.key){
          let order = (this.state.sortBy.order == "ascending") ? "descending" : "ascending";
          this.setState({
              sortBy: {
                  key: sort_by.key,
                  order: order
              },
            });
      } else {
          this.setState({
              sortBy: {
                  key: sort_by.key,
                  order: sort_by.order
              },
            });
      }

      // update store filter criteria
      //store.dispatch(setFilterState(this.state.sortBy));

  },

  componentDidMount: function() {
    userApi.getUserById(this.props.params.userId); 
    store.dispatch(loadSearchLayout('documents', 'Document Results'));
  },

  render: function() {
    return (
      <UserDocumentList user={this.props.user} sort={this.sortByClick} sortBy={this.state.sortBy} docType={this.props.params.docType}/>
    );
  }

});

const mapStateToProps = function(store) {
  return {
    user: store.userState.user
  };
};

export default connect(mapStateToProps)(UserDocumentListContainer);
