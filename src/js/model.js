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
    // const queryURL = `${API_URL}/time_series?symbol=${query}&interval=1day&start_date=2021-01-01 00:00:01&end_date=2022-12-30 23:59:59&apikey=${KEY}`;
    // const timePeriod = `start_date=2021-01-05 00:00:01&end_date=2022-08-03 23:59:59`;
    console.log(typeof query.timePeriod === 'number');
    console.log(typeof query.timePeriod);
    const timePeriod =
      typeof query.timePeriod === 'number'
        ? `outputsize=${query.timePeriod}`
        : `start_date=${query.timePeriod[0]} 00:00:01&end_date=${query.timePeriod[1]} 23:59:59`;
    const queryURL = `${API_URL}/time_series?symbol=${query.symbol}&interval=1day&${timePeriod}&apikey=${KEY}`;
    // YYYY-MM-DD
    console.log(queryURL);

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
