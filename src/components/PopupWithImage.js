import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(containerPopupSelector) {
    super(containerPopupSelector)
    this._cardImage = this._containerPopup.querySelector('.pop-up__img')
    this._cardImageDescription = this._containerPopup.querySelector('.pop-up__description')
  }

  open(imageUrl, description) {
    console.log('ссылка фото: ', imageUrl, 'подпись к фото: ', description)
    super.open()
    this._cardImage.src = imageUrl
    this._cardImage.alt = description
    this._cardImageDescription.textContent = description
  }
}