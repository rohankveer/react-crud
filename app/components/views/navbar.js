import React from 'react';
import { Link } from 'react-router';
import store from '../../store';
import { resetLoginState } from '../../actions/login-actions';
import { setQueryState, setPaginationState } from '../../actions/user-actions';
import * as userApi from '../../api/user-api';
var classNames = require("classnames");

// Using "Stateless Functional Components"
let searchRequest;
function logout(){
    localStorage.removeItem("user_token");
    store.dispatch(resetLoginState());
}

function searchChange(event){
    /* wait till user stops typing */
        let search_value = event.target.value;
        clearTimeout(searchRequest);
        searchRequest = setTimeout(()=>{
            if( search_value != "" ){
                store.dispatch(setQueryState(search_value));
                store.dispatch(setPaginationState(0,1));
            } else {
                store.dispatch(setQueryState(null));
            }
            userApi.getUsers();
        },800);
}

export default function(props) {
    
    // clear the state
    if(!(window.location.hash.includes("/dashboard/users"))){
        store.dispatch(setQueryState(null));
    }
    
    var logoutBtnClass = classNames({
        'hide': !(store.getState().loginState.loggedinUser),
    });
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/dashboard/home"><img src="./public/images/ic_truform-logo.png" /></Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            {(window.location.hash.includes("/dashboard/users")) ? <li className="rv-search"><input type="text" onChange={searchChange}/><span className="glyphicon glyphicon-search"></span></li> : "" }
            <li>
              <Link className={logoutBtnClass} to="#" onClick={logout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
