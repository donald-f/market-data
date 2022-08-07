import View from './View.js';

class HistoryDataView extends View {
  _parentElement = document.querySelector('.investment-history');
  _errorMessage = 'No Security Found. Try again. ;)';
  _generateMarkup() {
    let markup = `
    <a href="${this._data.csvURL}">Export</a>
    <table class="hist-data">
      <thead class="stick">
        <tr>
          <th>Date</th>
          <th class="non-essential-cell">Open</th>
          <th class="non-essential-cell">High</th>
          <th class="non-essential-cell">Low</th>
          <th>Close</th>
          <th class="non-essential-cell">Volume</th>
        </tr>
      </thead>
      <tbody>
    `;
    this._data.intervalData.forEach((element) => {
      markup += `
    <tr>
      <td class="dates">${element.datetime}</td>
      <td class="non-essential-cell">${element.open}</td>
      <td class="non-essential-cell">${element.high}</td>
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
