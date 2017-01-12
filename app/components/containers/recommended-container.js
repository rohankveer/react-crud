import React from 'react';
import { connect } from 'react-redux';
import RecommendedList from '../views/recommended-list';
import * as shoeApi from '../../api/shoe-api';
import * as userApi from '../../api/user-api';
import store from '../../store';
import { resetUserState } from '../../actions/user-actions';
import { resetShoeState } from '../../actions/shoe-actions';
import { loadSearchLayout } from '../../actions/search-layout-actions';

const RecommendedListContainer = React.createClass({

  componentDidMount: function() {
      userApi.getUserById(this.props.params.userID);
  },
    
  componentWillUnmount: function(){
      // reset state here
      store.dispatch(resetUserState());
      store.dispatch(resetShoeState());
      
  },

  getShoeSize: function(){
      let shoeSize = 0;
      this.props.user.userScanData.forEach(function(data) {
        if(data.shoeSize > 0)
            shoeSize = data.shoeSize;
        });
      return shoeSize;
  },
    
  componentDidUpdate: function(){
      let shoeSize = this.getShoeSize();
      if( this.props.user.userScanData.length > 0 && this.props.shoes.length == 0 )
        shoeApi.getShoes(shoeSize,this.props.user.gender);
  },

  render: function() {
      if( this.getShoeSize() == 0 ){
          return (
              <RecommendedList shoes={[{error:true}]} />
            );
      } else {
          return (
              <RecommendedList shoes={this.props.shoes} />
            );   
      }
  }

});

const mapStateToProps = function(store) {
  return {
    shoes: store.shoeState.shoes,
    user: store.userState.user
  };
};

export default connect(mapStateToProps)(RecommendedListContainer);
