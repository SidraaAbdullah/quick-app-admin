export let getSearchData = (query, searchInput) => {
    if(searchInput?.searchInput){
      return {
        ...query, full_name: searchInput?.searchInput,
      }
    }
    else{
      return{
        ...query,
      }
    }
}