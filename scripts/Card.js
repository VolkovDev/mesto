import {popUpImageImg, popUpImageDescription} from './index.js'

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }

  // Получние контекста Template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  // Создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name
    this._element.querySelector('.card__image').src = this._link
    this._elementImage = this._element.querySelector('.card__image')
    this._elementImage.alt = `На фотографии изображение ${this._name}`
    this._elementLikeBtn = this._element.querySelector('.card__like-btn')
    this._elementDeleteBtn = this._element.querySelector('.card__delete-btn')
    this._setEventListeners();

    return this._element;
  }

  // Добавление слушателей событий
  _setEventListeners() {
    this._elementLikeBtn.addEventListener('click', () => this._toggleLikeCard())
    this._elementImage.addEventListener('click', () => this._openPopup())
    this._elementDeleteBtn.addEventListener('click', () => this._deleteCard())
  }

  //Удаление карточки из дома
  _deleteCard() {
    this._element.remove()
    this._element = null
  }

  // Смена состояния лайка
  _toggleLikeCard() {
    this._elementLikeBtn.classList.toggle('card__like-btn_active')
  }

  // Открытие попап изображение карточки
  _openPopup() {
    this._elementImage.classList.add("pop-up_opened");
    popUpImageImg.src = this._link;
    popUpImageDescription.textContent = this._name;
    document.querySelector('.pop-up_type_image-zoom').classList.add("pop-up_opened");
  }

}