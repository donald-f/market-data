import View from './View.js';

class HistoryDataView extends View {
  _parentElement = document.querySelector('.investment-history');
  _errorMessage = 'No Security Found. Try again. ;)';
  _generateMarkup() {
    let markup = `
    <table>
      <tr>
        <th>datetime</th>
        <th>open</th>
        <th>high</th>
        <th>low</th>
        <th>close</th>
        <th>volume</th>
      </tr>`;
    this._data.forEach((element) => {
      markup += `
    <tr>
      <td>${element.datetime}</td>
      <td>${element.open}</td>
      <td>${element.low}</td>
      <td>${element.close}</td>
      <td>${element.volume}</td>
    </tr>`;
    });
    markup += '</table>';
    return markup;
  }
}
export default new HistoryDataView();
