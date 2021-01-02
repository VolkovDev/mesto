import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(containerPopupSelector) {
    super(containerPopupSelector)
  }

  open(imageUrl, description) {
    console.log('ссылка фото: ', imageUrl, 'подпись к фото: ', description )
    super.open()
    const cardImage = this._containerPopup.querySelector('.pop-up__img')
    const cardImageDescription = this._containerPopup.querySelector('.pop-up__description')
    cardImage.src = imageUrl
    cardImage.alt = description
    cardImageDescription.textContent = description
  }
}