export class Card {
  constructor(itemCard, itemUser, { handleCardClick, handleBtnDelete, handleBtnLike }, selectorsConfig) {
    this._name = itemCard.name
    this._link = itemCard.link
    this._id = itemCard._id;
    this._likes = itemCard.likes;
    this._idUserCard = itemCard.owner._id
    this._userInfoId = itemUser._id
    this._cardSelector = selectorsConfig.card
    this._popUpImageImg = selectorsConfig.popUpImageImgUtils
    this._popUpImageDescription = selectorsConfig.popUpImageDescriptionUtils
    this._closePopUpEsc = selectorsConfig.closePopUpEscUtils
    this._closePopUpClickByOverlayOrBtn = selectorsConfig.closePopUpClickByOverlayOrBtnUtils
    this._popUpImageZoom = selectorsConfig.popUpImageZoomUtils
    this._cardImage = selectorsConfig.cardImage
    this._cardDeleteBtn = selectorsConfig.cardDeleteBtn
    this._cardLikeBtn = selectorsConfig.cardLikeBtn
    this._cardDeleteBtnNonActive = selectorsConfig.cardDeleteBtnNonActive
    this._cardLikeCounter = selectorsConfig.cardLikeCounter
    this._cardLikeBtnActive = selectorsConfig.cardLikeBtnActive
    this._handleCardClick = handleCardClick
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleBtnDelete = handleBtnDelete
    this._handleBtnDelete = this._handleBtnDelete.bind(this)
    this._handleBtnLike = handleBtnLike
    this._handleBtnLike = this._handleBtnLike.bind(this)
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
    this._setColorLike(this._userInfoId, this._likes);
    this._elementDeleteBtn = this._element.querySelector('.card__delete-btn')
    if (this._idUserCard !== this._userInfoId) {
      this._elementDeleteBtn.classList.add(this._cardDeleteBtnNonActive)
    }
    this._setEventListeners()

    return this._element
  }

  // Добавление слушателей событий
  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick()
    })
    this._elementLikeBtn.addEventListener("click", this._handleBtnLike);
    this._elementDeleteBtn.addEventListener("click", () => {
      this._handleBtnDelete({
        cardItem: this._element,
        cardId: this._id
      })
    }
    )
    this._elementImage.addEventListener("click", this._handleCardClick)
  }

  // Смена состояния лайка
  toggleLikeCard() {
    this._elementLikeBtn.classList.toggle(this._cardLikeBtnActive)
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

  // Получить статус лайка
  getElementLike() {
    if (!this._elementLikeBtn.classList.contains(this._cardLikeBtnActive)) {
      return true
    }
  }
}