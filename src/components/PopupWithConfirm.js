import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor(containerPopupSelector, 
    { handleFormSubmit }
    ) {
    super(containerPopupSelector)
    this._handleFormSubmit = handleFormSubmit
  }

  _deleteCard(handleApiData) {
    handleApiData();
    this._close();
  }

  _close() {
    this._handleFormSubmit();
    super.close();
    this._btnSubmit.removeEventListener("click", this._deleteCard);
  }

  handleBtn(f) {
    this._btnSubmit = this._containerPopup.querySelector('.pop-up__form-btn-submit_comfirm');
    this._btnSubmit.addEventListener("click", this._deleteCard.bind(this, f));
  }
}

export default PopupWithConfirm