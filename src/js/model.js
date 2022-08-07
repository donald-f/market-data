import { AJAX, SUBTRACT_DAYS, SUBTRACT_DAYS_FORMAT_DATE } from './helpers.js';
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

    const timePeriod =
      typeof query.timePeriod === 'number'
        ? `start_date=${SUBTRACT_DAYS_FORMAT_DATE(
            query.timePeriod
          )} 00:00:01&end_date=${SUBTRACT_DAYS_FORMAT_DATE(0)} 23:59:59`
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
