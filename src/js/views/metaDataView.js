import View from './View.js';

class MetaDataView extends View {
  _parentElement = document.querySelector('.investment-meta');
  _errorMessage = 'No security found. Please try again.';
  _generateMarkup() {
    const meta = this._data.meta;
    const createMetaDiv = (property, value) =>
      `<div class="meta-data-point">${property}: ${value}</div>`;
    return [
      createMetaDiv('Security Name', meta.securityName),
      createMetaDiv('Symbol', meta.symbol),
      createMetaDiv('Exchange', meta.exchange),
      createMetaDiv('Security Type', meta.type),
    ].join('');
  }
}
export default new MetaDataView();
