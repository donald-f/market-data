import View from './View.js';

class HistoryDataView extends View {
  _parentElement = document.querySelector('.investment-history');
  _errorMessage = 'No Security Found. Try again. ;)';
  _generateMarkup() {
    let markup = `
    <a href="${this._data.csvURL}">Export</a>
    <table class="hist-data">
      <thead>
        <tr>
          <th>datetime</th>
          <th>open</th>
          <th>high</th>
          <th>low</th>
          <th>close</th>
          <th>volume</th>
        </tr>
      </thead>
      <tbody>
    `;
    this._data.intervalData.forEach((element) => {
      markup += `
    <tr>
      <td>${element.datetime}</td>
      <td>${element.open}</td>
      <td>${element.low}</td>
      <td>${element.low}</td>
      <td>${element.close}</td>
      <td>${element.volume}</td>
    </tr>`;
    });
    markup += '</tbody></table>';
    return markup;
  }
}
export default new HistoryDataView();
