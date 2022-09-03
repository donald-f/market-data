import { AJAX, SUBTRACT_DAYS, SUBTRACT_DAYS_FORMAT_DATE } from './helpers.js';
import { KEY, RES_PER_PAGE, API_URL, CSV_DELIMITER } from './config.js';

export const state = {
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

export const getStockResults = async function (query) {
  const resetStateSearch = () => {
    state.search.query = '';
    state.search.results = [];
    state.search.page = 1;
    state.search.intervalData = [];
    state.search.csvURL = '';
  };
  try {
    state.search.query = query;
    if (Array.isArray(query.timePeriod)) {
      if (
        new Date(query.timePeriod[1]) > new Date(SUBTRACT_DAYS_FORMAT_DATE(1))
      )
        query.timePeriod[1] = SUBTRACT_DAYS_FORMAT_DATE(1);
    }
    const timePeriod =
      typeof query.timePeriod === 'number' // if the time period is just a number, we know that we are doing a trailing return as opposed to date range.
        ? `start_date=${SUBTRACT_DAYS_FORMAT_DATE(
            query.timePeriod
          )} 00:00:01&end_date=${SUBTRACT_DAYS_FORMAT_DATE(1)} 23:59:59`
        : `start_date=${query.timePeriod[0]} 00:00:01&end_date=${query.timePeriod[1]} 23:59:59`; // we do 1 day back because we only care about previous days' closes

    const queryURL = `${API_URL}/time_series?symbol=${query.symbol}&interval=1day&${timePeriod}&apikey=${KEY}`;
    // YYYY-MM-DD
    console.log(queryURL);

    const data = await AJAX(queryURL);
    if (data.code === 400) {
      resetStateSearch();
      throw new Error('Invalid symbol! Please try again.');
    }
    state.search.csvURL = `${queryURL}&format=CSV&delimiter=${CSV_DELIMITER}`;
    // https://api.twelvedata.com/stocks?symbol=AAPL&exchange=NASDAQ&apikey=9120747530c34355afd04d8a8b055f77
    state.search.page = 1;
    const possibleSecFullNames = await AJAX(
      `${API_URL}/symbol_search?symbol=${data.meta.symbol}&outputsize=120`
    );
    const secFullName =
      possibleSecFullNames.data.find(
        (sec) =>
          sec.exchange === data.meta.exchange && sec.symbol === data.meta.symbol
      )?.instrument_name || 'name not found';
    state.search.intervalData = data.values;
    state.search.meta = { ...data.meta };
    state.search.meta.securityName = secFullName;
  } catch (err) {
    console.error(err);
    throw new Error(`${err}`);
  }
};
