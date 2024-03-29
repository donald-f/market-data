export default class View {
  _data;
  render(data) {
    if (!data || data.query === '') return this.renderError();
    this._data = data;
    const markup = this._generateMarkup(); // _generateMarkup is on each view
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    /* 
    const markup = `
            <div class="message">
            <!--
              perhaps have an error icon here.
            -->
                <p>${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    */
  }
  renderError(message = this._errorMessage) {
    const markup = `
            <div class="error">
            <!--
              perhaps have an error icon here.
            -->
                <p class="error-message">${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner() {
    this._clear();
    const markup = `<div class="lds-ripple spinner"><div></div><div></div></div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
