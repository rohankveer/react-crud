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

var typeBtnClass = classNames({
  'glyphicon': true,
  'glyphicon-menu-down': ((props.sortBy.key == "type") && (props.sortBy.order == "ascending")) || (props.sortBy.key != "type"),
  'glyphicon-menu-up': (props.sortBy.key == "type") && (props.sortBy.order == "descending")
});

  return (
    <div className="data-list">
      <table className="table">
        <thead>
          <tr>
            <th><span className="sortable" onClick={props.sort.bind(null, {key:"name",order:"descending"})}> User name<span className={nameBtnClass} aria-hidden="true"></span></span></th>
            <th>Email</th>
            <th><span className="sortable" onClick={props.sort.bind(null, {key:"type",order:"descending"})}>Type of scan<span className={typeBtnClass} aria-hidden="true"></span></span></th>
            <th>Time of scan</th>
            <th>Link to scandata</th>
          </tr>
        </thead>
        <tbody>
        {props.documents.map(document => {
          let date = (new Date(document.meta.lastModified)).toLocaleString();
          return (
            <tr key={document.id}>
              <td>{document.name}</td>
              <td>{document.email}</td>
              <td>{document.type}</td>
              <td>{date}</td>
              <td><a href={document.scanDataUrl} target="_blank">Link</a></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}
