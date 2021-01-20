import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor(containerPopupSelector, 
    { handleFormSubmit }
    ) {
    super(containerPopupSelector)
    this._handleFormSubmit = handleFormSubmit
  }

  _close() {
    this._handleFormSubmit();
    super.close();
    this._button.removeEventListener("click", this._deleteCard);
  }

  _deleteCard(handleApiData) {
    handleApiData();
    this._close();
  }

  handleButton(c) {
    this._button = this._containerPopup.querySelector('.pop-up__form-btn-submit_comfirm');
    this._button.addEventListener("click", this._deleteCard.bind(this, c));
  }

  // _close() {
  //   super.close();
  //   this._button.removeEventListener("click", this._deleteCard);
  // }

  // _deleteCard() {
  //   this._handleFormSubmit();
  //   this._close();
  // }

  // addEventListener() {
  //   this._button = this._popup.querySelector('.pop-up__form-btn-submit_comfirm');
  //   this._button.addEventListener("click", this._deleteCard());
  // }
}

export default PopupWithConfirm