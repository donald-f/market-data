import View from './View.js';

class MetaDataView extends View {
  _parentElement = document.querySelector('.investment-meta');
  _generateMarkup() {
    let markup = '';
    this._data.forEach((element) => {
      markup += `${element[0]}: ${element[1]}<br>`;
    });
    return markup;
  }
}
export default new MetaDataView();
