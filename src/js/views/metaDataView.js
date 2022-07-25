import View from './View.js';

class MetaDataView extends View {
  _parentElement = document.querySelector('.investment-meta');
  _errorMessage = 'No Security Found. Try again. ;)';
  _generateMarkup() {
    let markup = '';
    this._data.forEach((element) => {
      markup += `<div class="meta-data-point">${element[0]}: ${element[1]}</div>`;
    });
    return markup;
  }
}
export default new MetaDataView();
