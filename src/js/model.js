import { AJAX, SUBTRACT_DAYS_FORMAT_DATE } from './helpers.js';
import { KEY, RES_PER_PAGE, API_BASE_URL, CSV_DELIMITER } from './config.js';

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
    state.search.dayPriorToIntervalData = [];
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

    /* 2/12/23 replaced timePeriod with timePeriodStartDate and timePeriodEndDate (this is easier to read)
    const timePeriod =
      typeof query.timePeriod === 'number' // if the time period is just a number, we know that we are doing a trailing return as opposed to date range.
        ? `start_date=${SUBTRACT_DAYS_FORMAT_DATE(
            query.timePeriod
          )} 00:00:01&end_date=${SUBTRACT_DAYS_FORMAT_DATE(1)} 23:59:59`
        : `start_date=${query.timePeriod[0]} 00:00:01&end_date=${query.timePeriod[1]} 23:59:59`; // we do 1 day back because we only care about previous days' closes
    */

    let timePeriodStartDate, timePeriodEndDate, daysPriorToIntervalDataEndDate;

    if (typeof query.timePeriod === 'number') {
      timePeriodStartDate = `${SUBTRACT_DAYS_FORMAT_DATE(
        query.timePeriod
      )} 00:00:01`;
      timePeriodEndDate = `${SUBTRACT_DAYS_FORMAT_DATE(1)} 23:59:59`;
      // daysPriorToIntervalDataEndDate = `${SUBTRACT_DAYS_FORMAT_DATE(
      //   1, timePeriodStartDate
      // )} 23:59:59`;
    } else {
      timePeriodStartDate = `${query.timePeriod[0]} 00:00:01`;
      timePeriodEndDate = `${query.timePeriod[1]} 23:59:59`;
      // daysPriorToIntervalDataEndDate = `${query.timePeriod[0]} 23:59:59`;
    }
    daysPriorToIntervalDataEndDate = timePeriodStartDate;
    console.log(daysPriorToIntervalDataEndDate);
    // const queryURL = `${API_URL}/time_series?symbol=${query.symbol}&interval=1day&${timePeriod}&apikey=${KEY}`; 2/12/23...replaced with the below cleaner code -- more lines but easier to read
    const apiUrlConstructor = function (type, firstDayRetEndDate) {
      // type parameter will be undefined, firstDayReturn, or csv
      const url = new URL(API_BASE_URL + '/time_series');
      url.searchParams.set('apikey', KEY);
      url.searchParams.set('symbol', query.symbol);
      url.searchParams.set('interval', '1day');
      if (type === 'firstDayReturn') {
        url.searchParams.set('end_date', daysPriorToIntervalDataEndDate); // trying to get the day prior to the other interval data in order to get the 1st day return.
        url.searchParams.set('outputsize', 2);
        return url;
      }
      url.searchParams.set('end_date', timePeriodEndDate);
      url.searchParams.set('start_date', timePeriodStartDate);
      if (type === 'csv') {
        url.searchParams.set('format', 'CSV');
        url.searchParams.set('delimiter', CSV_DELIMITER);
      }
      return url;
    };
    const queryURL = apiUrlConstructor();
    const firstDayURL = apiUrlConstructor('firstDayReturn');

    const [queryResult, firstDayQueryResult] = await Promise.allSettled([
      AJAX(queryURL),
      AJAX(firstDayURL),
    ]);

    if (
      queryResult.status !== 'fulfilled' ||
      firstDayQueryResult.status !== 'fulfilled'
    ) {
      throw new Error('Something went wrong. Please try again.');
    }
    const data = queryResult.value;
    const dataToDetermine1stDayReturn = firstDayQueryResult.value;

    if (data.code === 400 || dataToDetermine1stDayReturn.code === 400) {
      resetStateSearch();
      throw new Error(
        'Invalid query. Either the symbol is unavailable or the date range is invalid. Please try again.'
      );
    }
    // state.search.csvURL = `${queryURL}&format=CSV&delimiter=${CSV_DELIMITER}`; 2/12/23 replaced this with the three below rows

    state.search.csvURL = apiUrlConstructor('csv');

    // https://api.twelvedata.com/stocks?symbol=AAPL&exchange=NASDAQ&apikey=9120747530c34355afd04d8a8b055f77
    state.search.page = 1;
    const possibleSecFullNames = await AJAX(
      `${API_BASE_URL}/symbol_search?symbol=${data.meta.symbol}&outputsize=120`
    );
    const secFullName =
      possibleSecFullNames.data.find(
        (sec) =>
          sec.exchange === data.meta.exchange && sec.symbol === data.meta.symbol
      )?.instrument_name || 'name not found';
    state.search.intervalData = data.values;
    state.search.meta = { ...data.meta };
    state.search.meta.securityName = secFullName;
    data;
    const timePeriodEndDateTime = new Date(daysPriorToIntervalDataEndDate);
    const timePeriodEndDateForComparison = timePeriodEndDateTime
      .toISOString()
      .split('T')[0];
    let dayPriorToIntervalData;
    if (dataToDetermine1stDayReturn.code === 404) {
      dayPriorToIntervalData = null;
    } else {
      console.log(
        { array3: dataToDetermine1stDayReturn.values[0].datetime },
        { timePeriodEndDateForComparison }
      );
      dayPriorToIntervalData =
        dataToDetermine1stDayReturn.values[0].datetime ===
        timePeriodEndDateForComparison
          ? dataToDetermine1stDayReturn.values[1] // go one date older
          : dataToDetermine1stDayReturn.values[0]; // the first date of the array is good
    }
    console.log(dataToDetermine1stDayReturn);
    console.log(dayPriorToIntervalData);
    state.search.dayPriorToIntervalData = dayPriorToIntervalData;
  } catch (err) {
    console.error(err);
    throw new Error(`${err}`);
  }
};
