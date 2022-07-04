import puff from '../../img/puff.svg';

export default class View {
  data;

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
