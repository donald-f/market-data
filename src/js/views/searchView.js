import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
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
  fillHeight() {
    const viewportHeight = window.innerHeight;
    const heightUsedAlready = ['header', 'nav'].reduce(
      (prev, el) => prev + document.querySelector(el).clientHeight,
      0
    );
    const proposedNewHeight = viewportHeight - heightUsedAlready;
    console.log(viewportHeight, heightUsedAlready);
    if (this._parentElement.clientHeight < proposedNewHeight)
      this._parentElement.style.height = `${proposedNewHeight}px`;
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
