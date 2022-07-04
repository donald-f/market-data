import { AJAX } from './helpers.js';
import { KEY, API_URL } from './config.js';

const controlSearchResults = function () {};
export const getStockResults = async function (query) {
  try {
    const data = await AJAX(
      `${API_URL}/time_series?symbol=AAPL,EUR/USD,IXIC&interval=1day&apikey=${KEY}`
    );
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
