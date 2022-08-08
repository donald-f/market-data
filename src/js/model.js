import { AJAX, SUBTRACT_DAYS, SUBTRACT_DAYS_FORMAT_DATE } from './helpers.js';
import { KEY, RES_PER_PAGE, API_URL, CSV_DELIMITER } from './config.js';

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
    state.search.csvURL = `${queryURL}&format=CSV&delimiter=${CSV_DELIMITER}`;
    // https://api.twelvedata.com/stocks?symbol=AAPL&exchange=NASDAQ&apikey=9120747530c34355afd04d8a8b055f77
    state.search.page = 1;
    state.search.meta = Object.entries(data.meta); // need to think of something better than entries here.
    const possibleSecFullNames = await AJAX(
      `${API_URL}/symbol_search?symbol=${data.meta.symbol}&outputsize=120`
    );
    console.log(possibleSecFullNames);
    state.search.secFullName = possibleSecFullNames.data.find(
      (sec) =>
        sec.exchange === data.meta.exchange && sec.symbol === data.meta.symbol
    ).instrument_name;
    console.log(state.search.secFullName);
    console.log(state.search.meta);
    state.search.intervalData = data.values;
    state.search.meta.unshift(['Security Name', state.search.secFullName]); // entries needs to be replaced with something better and therefore we wouldn't be using unshift here
  } catch (err) {
    console.error(err);
  }
};
