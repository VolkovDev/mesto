export default class Popup {
  constructor(containerPopupSelector) {
    this._containerPopup = document.querySelector(containerPopupSelector)
    this._handleEscClose = this._handleEscClose.bind(this);
    this._btnClosePopup = this._containerPopup.querySelector('.pop-up__btn-close')
  }

  _handleEscClose(e) {
    e.key === 'Escape'
      ? this.close()
      : null
  }

  open() {
    this._containerPopup.classList.add('pop-up_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }


  close() {
    this._containerPopup.classList.remove('pop-up_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  setEventListeners() {
    this._btnClosePopup.addEventListener('click', () => this.close())
    this._containerPopup.addEventListener('click', (e) =>
      e.target === this._containerPopup
        ? this.close()
        : null
    )
  }
} 