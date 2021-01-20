export class Card {
  constructor(data, { handleCardClick, handleBtnDelete, handleBtnLike }, selectorsConfig) {
    this._name = data.name
    this._link = data.link
    this._id = data._id;
    this._likes = data.likes;
    this._idUser = data.owner._id
    this._cardSelector = selectorsConfig.card
    this._popUpImageImg = selectorsConfig.popUpImageImgUtils
    this._popUpImageDescription = selectorsConfig.popUpImageDescriptionUtils
    this._closePopUpEsc = selectorsConfig.closePopUpEscUtils
    this._closePopUpClickByOverlayOrBtn = selectorsConfig.closePopUpClickByOverlayOrBtnUtils
    this._popUpImageZoom = selectorsConfig.popUpImageZoomUtils
    this._cardImage = selectorsConfig.cardImage
    this._cardDeleteBtn = selectorsConfig.cardDeleteBtn
    this._cardLikeBtn = selectorsConfig.cardLikeBtn
    this._handleCardClick = handleCardClick
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleBtnDelete = handleBtnDelete
    this._cardDeleteBtnNonActive = selectorsConfig.cardDeleteBtnNonActive
    this._cardLikeCounter = selectorsConfig.cardLikeCounter
    this._cardLikeBtnActive = selectorsConfig.cardLikeBtnActive
    this._handleBtnDelete = handleBtnDelete.bind(this)
    this._handleBtnLike = handleBtnLike
    this._handleBtnLike = handleBtnLike.bind(this)
  }

  // Получние контекста Template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true)
    return cardElement
  }

    // Создание экземпляра карточки
    generateCard() {
      this._element = this._getTemplate()
      this._element.querySelector('.card__title').textContent = this._name
      this._element.querySelector(this._cardImage).src = this._link
      this._elementImage = this._element.querySelector(this._cardImage)
      this._elementImage.alt = `На фотографии изображение ${this._name}`
      this._elementLikeBtn = this._element.querySelector(this._cardLikeBtn)
      this._elementLikeCounter = this._element.querySelector(this._cardLikeCounter)
      this._setColorLike('b514243d770d323aa2f5bb30', this._likes);
      this._elementDeleteBtn = this._element.querySelector('.card__delete-btn')
      if (this._idUser !== 'b514243d770d323aa2f5bb30') {
        this._elementDeleteBtn.classList.add(this._cardDeleteBtnNonActive)
      }
      this._setEventListeners()
  
      return this._element
    }

  // Добавление слушателей событий
  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._openPopup(), 
      this._handleCardClick()
    })
    this._elementLikeBtn.addEventListener("click", this._handleBtnLike);
    this._elementDeleteBtn.addEventListener("click", this._handleBtnDelete);
    this._elementImage.addEventListener("click", this._handleCardClick);
  }

  //Удаление карточки из дома
  deleteCard() {
    this._element.remove()
    this._element = null
  }

  // Смена состояния лайка
  toggleLikeCard() {
    this._elementLikeBtn.classList.toggle(this._cardLikeBtnActive)
  }

  // Открытие попап изображение карточки
  _openPopup() {
    document.addEventListener('keydown', this._closePopUpEsc)
    this._popUpImageZoom.addEventListener('click', this._closePopUpClickByOverlayOrBtn)
  }

  //Установить цвет лайка
  _setColorLike(userId, arrLikes) {
    arrLikes.forEach((element) => {
      element._id === userId
        ? this._elementLikeBtn.classList.add(this._cardLikeBtnActive)
        : null;
    });
  }

  // Массив лайков
  setLikes(arrLikes) {
    this._elementLikeCounter.textContent = arrLikes.length
    this._elementLikeCounter.dataset.people = arrLikes
      .reduce((acc, item) => {
        acc.push(item.name)
        return acc
      }, [])
      .join(', ')
    arrLikes.length > 0
      ? this._elementLikeCounter.dataset.people
      : null
  }

  //Получить лайк
  getElementLike() {
    return this._elementLikeBtn;
  }

  //Удаление карточки из дома
  _deleteCard() {
    this._element.remove()
    this._element = null
  }
}