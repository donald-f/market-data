import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _rangeOrTrailingDropdownEl =
    this._parentElement.querySelector('.range-or-trailing');
  _trailingDropdownEl = this._parentElement.querySelector(
    '.trailing-selection'
  );
  _dateRangeSecEl = this._parentElement.querySelector('.date-range-sec');
  constructor() {
    super();
    this._addHandlerToggleRangeSelector();
  }
  getQuery() {
    const timePeriod =
      this._rangeOrTrailingDropdownEl.options[
        this._rangeOrTrailingDropdownEl.selectedIndex
      ].value === 'trailing'
        ? +this._trailingDropdownEl.options[
            this._trailingDropdownEl.options.selectedIndex
          ].dataset.daysback
        : Array.from(this._parentElement.querySelectorAll('.date-picker')).map(
            (date) => date.value
          );
    const query = {
      symbol: this._parentElement.querySelector('.search__field').value,
      timePeriod: timePeriod,
    };
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    const query = this.getQuery();
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(query);
    });
  }
  _addHandlerToggleRangeSelector() {
    this._parentElement
      .querySelector('.range-or-trailing')
      .addEventListener('change', () => {
        this._trailingDropdownEl.classList.toggle('hidden');
        this._dateRangeSecEl.classList.toggle('hidden');
      });
  }
}
export default new SearchView();

/*
I can use code similar to the below in order to handle bad date inputs such as making the 
function handler(e){
  alert(e.target.value);
}
<input type="date" id="dt" onchange="handler(event);"/>

Although I may just wish to uses the API's built in error handling (the below is what we get if we have a start date more recent than the end date)
{
	"code": 400,
	"message": "No data is available on the specified dates. Try setting different start/end dates.",
	"status": "error",
	"meta": {
		"symbol": "AAPL",
		"interval": "1day",
		"exchange": ""
	}
}
*/
