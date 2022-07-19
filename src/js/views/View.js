import puff from '../../img/puff.svg';

export default class View {
  _data;
  render(data) {
    if (!data) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup(); // _generateMarkup is on each view
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner() {
    this._clear();
    const markup =
      //     <svg class="spinner-svg">
      //     <use href="${puff}"></use>
      //   </svg>
      `
              <div class="spinner">
                <img src=${puff}>
              </div>
            `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
