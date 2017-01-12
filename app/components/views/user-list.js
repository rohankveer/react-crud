import React from 'react';
import { Link } from 'react-router';
var classNames = require("classnames");

// Using "Stateless Functional Components"
export default function(props) {

var nameBtnClass = classNames({
  'glyphicon': true,
  'glyphicon-menu-down': ((props.sortBy.key == "name") && (props.sortBy.order == "ascending")) || (props.sortBy.key != "name"),
  'glyphicon-menu-up': (props.sortBy.key == "name") && (props.sortBy.order == "descending")
});

var emailBtnClass = classNames({
  'glyphicon': true,
  'glyphicon-menu-down': ((props.sortBy.key == "email") && (props.sortBy.order == "ascending")) || (props.sortBy.key != "email"),
  'glyphicon-menu-up': (props.sortBy.key == "email") && (props.sortBy.order == "descending")
});

var nosBtnClass = classNames({
  'glyphicon': true,
  'glyphicon-menu-down': ((props.sortBy.key == "nos") && (props.sortBy.order == "ascending")) || (props.sortBy.key != "nos"),
  'glyphicon-menu-up': (props.sortBy.key == "nos") && (props.sortBy.order == "descending")
});

  // create two arrays for 2d and 3d

  for( var i=0; i<props.users.length; i++ ){
      // initialize the count
      props.users[i].twod_count = 0;
      props.users[i].threed_count = 0;
      for( var j=0; j<props.users[i].userScanData.length; j++ ){
          if( props.users[i].userScanData[j].type === "2D" ){
              props.users[i].twod_count++;
          } else if( props.users[i].userScanData[j].type === "3D" ){
              props.users[i].threed_count++
          }
      }
  }

  return (
    <div className="data-list user-list table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Profile</th>
            <th><span className="sortable" onClick={props.sort.bind(null, {key:"name",order:"descending"})}>Customer Name <span className={nameBtnClass} aria-hidden="true"></span></span></th>
            <th><span className="sortable" onClick={props.sort.bind(null, {key:"email",order:"descending"})}>Customer Email <span className={emailBtnClass} aria-hidden="true"></span></span></th>
            <th>Company </th>
            <th>2D Data </th>
            <th>3D Data </th>
            <th>Date Modified</th>
          </tr>
          </thead>
          <tbody>
          {props.users.map(user => {
                let date = (new Date(user.meta.lastModified)).toLocaleString();
            return (
              <tr key={user.id} onClick={props.showUserInfo.bind(null, user.email)}>
                <td>
                  <img className="user-avatar" src={user.photo?user.photo:'../../../public/images/ic_profile-placeholder_large.png'} alt={user.name}/>
                </td>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.company}
                </td>
                <td>
                  {user.twod_count}
                </td>
                <td>
                  {user.threed_count}
                </td>
                <td>
                  {date}
                </td>
              </tr>
            );

          })}
          </tbody>
        </table>
    </div>
  );
}
