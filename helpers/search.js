const Fuse = require('fuse.js');
 
const search = (dataToSearch,
  basedOnOptionsKey,
  searchByValue) => {
     

  if(searchByValue !== undefined){
    if (searchByValue.trim()) {
      let fuse = new Fuse(dataToSearch, {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        minMatchCharLength: 2,
        keys: basedOnOptionsKey,
      });
      let result = fuse.search(searchByValue).map((r) => r.item);
      return result;
    }
  }
  return dataToSearch;
 
}


module.exports = search