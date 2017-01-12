import React from 'react';
import { Link } from 'react-router';
import { ModalManager } from 'react-dynamic-modal';
import MyModal from '../modal';
import UserSidebar from '../views/sidebar-document';
import store from '../../store';
import { resetUserState } from '../../actions/user-actions';
var classNames = require("classnames");

const UserDocumentList = React.createClass({

  getInitialState: function() {
        return {
            modalIsOpen: false,
        }
  },
    
  componentWillUnmount: function(){
    store.dispatch(resetUserState());
  },

  openModal: function(e) {
    e.preventDefault();
    let document_url = e.target.href;
    ModalManager.open(<MyModal docURL={document_url} text="" onRequestClose={() => true}/>);
  },

  render: function() {
       var nameBtnClass = classNames({
      'glyphicon': true,
      'glyphicon-menu-down': ((this.props.sortBy.key == "name") && (this.props.sortBy.order == "ascending")) || (this.props.sortBy.key != "name"),
      'glyphicon-menu-up': (this.props.sortBy.key == "name") && (this.props.sortBy.order == "descending")
    });

    var timeBtnClass = classNames({
      'glyphicon': true,
      'glyphicon-menu-down': ((this.props.sortBy.key == "time") && (this.props.sortBy.order == "ascending")) || (this.props.sortBy.key != "time"),
      'glyphicon-menu-up': (this.props.sortBy.key == "time") && (this.props.sortBy.order == "descending")
    });

    // filter here this.props.user.userScanData

    this.props.user.userScanData = this.props.user.userScanData.filter((scan_obj)=>{
        return (this.props.docType === 'ALL' || (scan_obj.type == this.props.docType)) ? 1 : 0;
    })

          return (
                <div className="data-list table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Scan File</th>
                        <th>Shoe Size</th>
                        <th>Length(mm)</th>
                        <th>Width(mm)</th>
                        <th>Arch Length(mm)</th>
                        <th>Last Modified</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.user.userScanData.map((document,index) => {
                            let date = (new Date(document.updatedTs)).toLocaleString();
                            let file_name_array = document.scanDataUrl.split("/");
                            let file_name = file_name_array[file_name_array.length - 1];
                        return (
                          <tr key={index}>
                            <td><img className="rv-file-icon" src={file_name.endsWith("ply") ?'./public/images/ic_ply.png'
                                            : './public/images/ic_png.png'} />
                            {file_name.endsWith("ply") ? <a href={document.scanDataUrl} onClick={this.openModal}>{file_name}</a>
                                            : <a href={document.scanDataUrl} onClick={this.openModal}>{file_name}</a> }
                            </td>
                            <td>{(parseInt(document.shoeSize)>0) ? document.shoeSize : ""}</td>
                            <td>{(parseInt(document.length)>0) ? document.length : ""}</td>
                            <td>{(parseInt(document.width)>0) ? document.width : ""}</td>
                            <td>{(parseInt(document.archLength)>0) ? document.archLength : ""}</td>
                            <td>{date}</td>
                          </tr>
                        );

                      })}
                  </tbody>
                  </table>
                </div>
          );
    }

});

export default UserDocumentList;
