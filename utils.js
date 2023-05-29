// Storage

const localDataUtils = {
  get: (key) => {
    const data = localStorage.getItem(key);
    const dataJSON = JSON.parse(data);
    return dataJSON;
  },
  set: (key, data) => {
    const dataStringified = JSON.stringify(data);
    localStorage.setItem(key, dataStringified);
  },
  isEmptyByKey: (key) => {
    const data = localStorage.getItem(key);
    const dataJSON = JSON.parse(data);
    if (!dataJSON) {
      return true;
    }
    return false;
  },

}