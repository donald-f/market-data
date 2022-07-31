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
          <th>Date</th>
          <th class="non-essential-cell">open</th>
          <th class="non-essential-cell">high</th>
          <th class="non-essential-cell">low</th>
          <th>close</th>
          <th class="non-essential-cell">volume</th>
        </tr>
      </thead>
      <tbody>
    `;
    this._data.intervalData.forEach((element) => {
      markup += `
    <tr>
      <td>${element.datetime}</td>
      <td class="non-essential-cell">${element.open}</td>
      <td class="non-essential-cell">${element.low}</td>
      <td class="non-essential-cell">${element.low}</td>
      <td>${element.close}</td>
      <td class="non-essential-cell">${element.volume}</td>
    </tr>`;
    });
    markup += '</tbody></table>';
    return markup;
  }
}
export default new HistoryDataView();
