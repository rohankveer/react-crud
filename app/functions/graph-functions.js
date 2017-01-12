'use strict'

export function getUsers(users){
    return users;
}

export function getScans(scans,type){
    return scans.filter((scan)=>{
                return scan.type == type;
            });
}

export function getScansPerMonth(scans){
    let scans_array = [0,0,0,0,0,0,0,0,0,0,0,0];
    for( var i=0; i<scans.length; i++ ){
        let month = (new Date(scans[i].createdTs)).getMonth();
        scans_array[month] = scans_array[month] + 1;
    }
    return scans_array;
}

export function getActiveUsersPerMonth(users){
    let users_array = [0,0,0,0,0,0,0,0,0,0,0,0];
    for( var i=0; i<users.length; i++ ){
        let month = (new Date(users[i].createdTs)).getMonth();
        users_array[month] = users_array[month] + 1;
    }
    return users_array;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function getShoeSizeDistribution(users){
    let pie_data_array = [];
    /* create object to maintain value */
    let value_obj= {};
    for( var i=0; i<users.length; i++ ){
        for( var j=0; j<users[i].userScanData.length; j++ ){
            if( users[i].userScanData[j].shoeSize in value_obj  && users[i].userScanData[j].shoeSize != 0 )
                value_obj[users[i].userScanData[j].shoeSize] = value_obj[users[i].userScanData[j].shoeSize] + 1;
            else if( users[i].userScanData[j].shoeSize != 0 )
                value_obj[users[i].userScanData[j].shoeSize] = 1;
        }
    }
    
    for( var key in value_obj ){
        let pie_data = {
                value: value_obj[key],
                label: "Size(" + key + ") ",
                color: getRandomColor()
            };
        pie_data_array.push(pie_data);
    }
    return pie_data_array;
}