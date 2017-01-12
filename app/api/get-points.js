export function getUsers() {
    
    // add sort by query
    let sort_query = "";
    if(store.getState().filterState.filter.sortBy !== null ){
        sort_query = "?sortBy=" + store.getState().filterState.filter.sortBy.key + "&sortOrder=" + store.getState().filterState.filter.sortBy.order;
    }
  return axios.get(Config.getUsers + sort_query)
    .then(response => {
      store.dispatch(getUsersSuccess(response.data));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}