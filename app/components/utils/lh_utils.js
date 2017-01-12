var LHUtils = LHUtils || {};

if (typeof exports !== "undefined") {
  var React = require("react");
}

LHUtils.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

LHUtils.debounce = function(fn, delay) {
  var timer = null;
  return function() {
    var _this = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(_this, args);
    }, delay);
  };
};

LHUtils.transfPropsToChildren = function(props, childrenProps, exclude) {
  childrenProps = childrenProps || {};
  exclude = exclude || [];
  for (var key in props) {
    if (key !==  "children" && exclude.indexOf(key) < 0) {
      childrenProps[key] = props[key];
    }
  }
  return React.cloneElement(props.children, childrenProps);
};

LHUtils.CheckedList = {};

LHUtils.CheckedList.getChecked = function(items) {
  if (!items)
    return;

  return items
    .filter(function(item) {
      return item.checked;
    }).map(function(item) {
      return item.value;
    });
};

LHUtils.CheckedList.updateChecked = function(items, checkbox) {
  var itemIndex = items.indexOf(checkbox.value);

  if (!checkbox.checked && itemIndex > -1) {
    items.splice(itemIndex, 1);
  }

  if (checkbox.checked && itemIndex === -1) {
    items.push(checkbox.value);
  }

  return items;
};

LHUtils.CheckedList.update = function(items, checkbox) {
  var itemIndex = items.findIndex(function(item) {
    return item.value === checkbox.value;
  });

  items[itemIndex].checked = checkbox.checked;

  return items;
};

LHUtils.Pagination = {};

LHUtils.Pagination.getPagesToRender = function(currentPage, lastPage, numOfPagesToRender) {

  if (typeof numOfPagesToRender === 'undefined'){
    numOfPagesToRender = 5;
  }

  var FIRST_PAGE = 1;

  var halfNumberOfPagesToRender = parseInt(numOfPagesToRender / 2);

  var diffLastPage = halfNumberOfPagesToRender - Math.min(halfNumberOfPagesToRender, lastPage - currentPage);
  var diffFirstPage = currentPage - halfNumberOfPagesToRender - diffLastPage;

  var firstPageToRender = Math.max(FIRST_PAGE, diffFirstPage);
  var lastPageToRender = Math.min(lastPage, firstPageToRender + numOfPagesToRender - 1);
  var pagesToRender = [];

  for (var i = firstPageToRender; i <= lastPageToRender; i++) {
    pagesToRender.push(i);
  }

  return pagesToRender;
};

LHUtils.Export = {};
LHUtils.Export.TYPES = ["xls", "csv", "pdf"];

LHUtils.WEEKLY_DAYS = {
  1: "sunday",
  2: "monday",
  4: "tuesday",
  8: "wednesday",
  16: "thursday",
  32: "friday",
  64: "saturday"
};

LHUtils.DAYS_ID = [1,2,4,8,16,32,64];

LHUtils.COLORS = {
  "black": "black",
  "blue": "blue",
  "blue-dark": "blue-dark",
  "blue-darker": "blue-darker",
  "blue-light": "blue-light",
  "gray": "gray",
  "gray-dark": "gray-dark",
  "gray-light": "gray-light",
  "gray-lighter": "gray-lighter",
  "orange": "orange",
  "orange-dark": "orange-dark",
  "orange-light": "orange-light",
  "purple": "purple",
  "purple-dark": "purple-dark",
  "purple-light": "purple-light",
  "yellow": "yellow",
  "yellow-dark": "yellow-dark",
  "yellow-light": "yellow-light",
  "white": "white",
  "status-green": "status-green",
  "status-green-dark": "status-green-dark",
  "status-green-light": "status-green-light",
  "status-red": "status-red",
  "status-red-dark": "status-red-dark",
  "status-red-light": "status-red-light",
  "status-yellow": "status-yellow",
  "status-yellow-dark": "status-yellow-dark",
  "status-yellow-light": "status-yellow-light",
};

LHUtils.colorsArray = function() {
  var colorsArray = [];

  for (var key in LHUtils.COLORS) {
    colorsArray.push(LHUtils.COLORS[key]);
  }

  return colorsArray;
}();

// Creating alias to be used within javascript
LHUtils.COLORS.black = LHUtils.COLORS["black"];
LHUtils.COLORS.blueDarker = LHUtils.COLORS["blue-darker"];
LHUtils.COLORS.blueDark = LHUtils.COLORS["blue-dark"];
LHUtils.COLORS.blue = LHUtils.COLORS["blue"];
LHUtils.COLORS.blueLight = LHUtils.COLORS["blue-light"];
LHUtils.COLORS.grayDark = LHUtils.COLORS["gray-dark"];
LHUtils.COLORS.gray = LHUtils.COLORS["gray"];
LHUtils.COLORS.grayLight = LHUtils.COLORS["gray-light"];
LHUtils.COLORS.grayLighter = LHUtils.COLORS["gray-lighter"];
LHUtils.COLORS.orangeDark = LHUtils.COLORS["orange-dark"];
LHUtils.COLORS.orange = LHUtils.COLORS["orange"];
LHUtils.COLORS.orangeLight = LHUtils.COLORS["orange-light"];
LHUtils.COLORS.purpleDark = LHUtils.COLORS["purple-dark"];
LHUtils.COLORS.purple = LHUtils.COLORS["purple"];
LHUtils.COLORS.purpleLight = LHUtils.COLORS["purple-light"];
LHUtils.COLORS.yellowDark = LHUtils.COLORS["yellow-dark"];
LHUtils.COLORS.yellow = LHUtils.COLORS["yellow"];
LHUtils.COLORS.yellowLight = LHUtils.COLORS["yellow-light"];
LHUtils.COLORS.white = LHUtils.COLORS["white"];
LHUtils.COLORS.statusGreen = LHUtils.COLORS["status-green"];
LHUtils.COLORS.statusGreenDark = LHUtils.COLORS["status-green-dark"];
LHUtils.COLORS.statusGreenLight = LHUtils.COLORS["status-green-light"];
LHUtils.COLORS.statusRed = LHUtils.COLORS["status-red"];
LHUtils.COLORS.statusRedDark = LHUtils.COLORS["status-red-dark"];
LHUtils.COLORS.statusRedLight = LHUtils.COLORS["status-red-light"];
LHUtils.COLORS.statusYellow = LHUtils.COLORS["status-yellow-"];
LHUtils.COLORS.statusYellowDark = LHUtils.COLORS["status-yellow-dark"];
LHUtils.COLORS.statusYellowLight = LHUtils.COLORS["status-yellow-light"];


LHUtils.removePropTypes = function(userProps, componentProps) {
  var result = {};
  for (var prop in userProps) {
    if (componentProps[prop] === undefined)
      result[prop] = userProps[prop];
  }
  return result;
}

if (typeof exports !== "undefined") {
  module.exports = LHUtils;
}
