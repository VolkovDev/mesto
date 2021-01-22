import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor(containerPopupSelector, { handleDeleteCard }) {
    super(containerPopupSelector)
    this._btnSubmit = this._containerPopup.querySelector('.pop-up__form-btn-submit_comfirm')
    this._handleDeleteCard = handleDeleteCard
    this._handleDeleteCard = this._handleDeleteCard.bind(this)
  }

  open({ cardItem, cardId }) {
    super.open()
    this._cardItem = cardItem
    this._idCard = cardId
  }

  close() {
    super.close();
    this._btnSubmit.removeEventListener("click", this._handleDeleteCard);
  }

  setEventListeners() {
    super.setEventListeners()
    this._btnSubmit.addEventListener("click", () =>
      this._handleDeleteCard(
        {
          cardItem: this._cardItem,
          cardId: this._idCard
        }
      )
    );
  }
}

export default PopupWithConfirm