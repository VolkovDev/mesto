export default class Popup {
  constructor(containerPopupSelector) {
    this._containerPopup = document.querySelector(containerPopupSelector)
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
      e.key === 'Escape' 
      ? this.close()
      : null
  }

  open() {
    this._containerPopup.classList.add('pop-up_opened')
    this._containerPopup.addEventListener('click', (e) => 
      e.target === this._containerPopup 
      ? this.close()
      :null
      )
      document.addEventListener('keydown', this._handleEscClose)
  }
  

  close() {
    this._containerPopup.classList.remove('pop-up_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  setEventListeners(btnClosePopupSelector) {
    this._btnClosePopup = this._containerPopup.querySelector(btnClosePopupSelector)
    this._btnClosePopup.addEventListener('click', () => this.close())
  }
}