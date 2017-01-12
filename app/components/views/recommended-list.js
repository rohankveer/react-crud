import React from 'react';
import { Link } from 'react-router';
var classNames = require("classnames");

let RecommendedList = React.createClass({

    /* Function to generate shoes template */
    
    generateListItem : function(){
        
        /* chunk is number of coloumns you want to show in a row */
        const chunk = 4;
        const result = [];
        
        /* Show loader if data is not received */
        
        if( this.props.shoes.length == 0 ){
            return (
                <div className="rv-loader"></div>
            );
        } else if(this.props.shoes[0].error){
            return (
                <div className="rv-no-results">No recommendations found</div>
            );
        } else {
            for( var i=0; i<this.props.shoes.length; i += chunk ){
            
                /* Create a new coloumn for each album */
                
                const shoesCards = this.props.shoes.slice(i, i + chunk).map((item, index) => {
                    return (
                        <div key={index} className="col-sm-12 col-md-2 col-lg-3">
                            <div className="rv-shoe-wrapper">
                                <div className="rv-shoe-thumbnail">
                                    <img src={item.imageUrl} />
                                    <div className="rv-shoe-details">
                                        <div className="rv-shoe-detail-left">
                                            <p className="rv-shoe-brand">{item.brand}</p>
                                            <p className="rv-shoe-category">{item.category}</p>
                                        </div>
                                        <div className="rv-shoe-detail-left">
                                            <p className="rv-shoe-model">{item.model}</p>
                                            <p className="rv-shoe-price">$ {item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
              });

            /* Create a new row after 6 coloumns */

            if( (i%chunk) == 0 ){
                    result.push(
                        <div key={i} className="rv-shoes-row row">
                          {shoesCards}
                        </div>
                      );
                }
            }
        return result;
        }
    },

    render: function() {
    let shoesTemplate = this.generateListItem();
    return (
        <div className="rv-shoes-wrapper">
           {shoesTemplate}
        </div>
    );
  }
});


export default RecommendedList;
