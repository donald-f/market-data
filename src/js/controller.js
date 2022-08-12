import 'regenerator-runtime/runtime.js'; // polyfilling async await
// import 'core-js.stable'; // used for polyfilling everything else
import * as model from './model.js';
import searchView from './views/searchView.js';
import metaDataView from './views/metaDataView.js';
import historyDataView from './views/historyDataView.js';

const controlSearchResults = async function () {
  const query = searchView.getQuery();
  if (!query) return;
  metaDataView.renderSpinner();
  historyDataView.renderSpinner();
  await model.getStockResults(query);
  metaDataView.render(model.state.search);
  historyDataView.render(model.state.search);
};
const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// one idea I have is to use a hash in this sites'
