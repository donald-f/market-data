import 'regenerator-runtime/runtime.js'; // polyfilling async await
import 'stable/stable.js'; // used for polyfilling everything else
import * as model from './model.js';
import searchView from './views/searchView.js';

const controlSearchResults = function () {
  model.getStockResults();
};
const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
};
init();
