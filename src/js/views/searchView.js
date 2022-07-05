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
}
export default new SearchView();
