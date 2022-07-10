import 'regenerator-runtime/runtime.js'; // polyfilling async await
import 'stable/stable.js'; // used for polyfilling everything else
import * as model from './model.js';
import searchView from './views/searchView.js';
import OutputView from './views/OutputView.js';

const controlSearchResults = function () {
  const query = searchView.getQuery();
  model.getStockResults(query);
};
const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
};
init();
