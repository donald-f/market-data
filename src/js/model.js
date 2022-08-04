import { AJAX } from './helpers.js';
import { KEY, RES_PER_PAGE, API_URL } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    intervalData: [],
    csvURL: '',
  },
  bookmarks: [],
};

const controlSearchResults = function () {};
export const getStockResults = async function (query) {
  try {
    state.search.query = query;
    const queryURL = `${API_URL}/time_series?symbol=${query}&interval=1day&start_date=2021-01-01 19:29:00&end_date=2022-12-30 19:29:00&apikey=${KEY}`;
    const data = await AJAX(queryURL);
    state.search.csvURL = `${queryURL}&format=CSV`;
    state.search.page = 1;
    state.search.meta = Object.entries(data.meta);
    console.log(state.search.meta);
    state.search.intervalData = data.values;
  } catch (err) {
    console.error(err);
  }
};
