import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(containerPopupSelector) {
    super(containerPopupSelector)
  }

  open(imageUrl, description) {
    super.open()
    const cardImage = this._containerPopup.querySelector('.card__image')
    cardImage.src = imageUrl
    cardImage.alt = description;
    const cardImageDescription = this._containerPopup.querySelector('.card__title')
    cardImageDescription.textContent = description
  }

}