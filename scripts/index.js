const popUpProfile = document.querySelector('.pop-up_type_profile')
const popUpAddCard = document.querySelector('.pop-up_type_add-card')
const popUpImageZoom = document.querySelector('.pop-up_type_image-zoom')
const popUpProfileBtnClose = document.querySelector('.pop-up__btn-close_type_profile')
const popUpAddCardBtnClose = document.querySelector('.pop-up__btn-close_type_add-card')
const popUpImageZoomBtnClose = document.querySelector('.pop-up__btn-close_type_image-zoom')
const formProfile = document.querySelector('.pop-up__form_profile')
const formImage = document.querySelector('.pop-up__form_image')
const formName = document.querySelector('.pop-up__form-input_type_name')
const formHobby = document.querySelector('.pop-up__form-input_type_hobby')
const formImageTitle = document.querySelector('.pop-up__form-input_type_image')
const formImageUrl = document.querySelector('.pop-up__form-input_type_url')
const popUpImageImg = document.querySelector('.pop-up__img')
const popUpImageDescription = document.querySelector('.pop-up__description')
const profileName = document.querySelector('.profile__name')
const profileHobby = document.querySelector('.profile__hobby')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
const cards = document.querySelector('.cards')
const card = document.querySelectorAll('.card')
const cardImage = document.querySelector('.card__image')
const cardTemplate = document.querySelector('#addCard').content;

// Открытие попап
const openPopUp = (popup) => {
  popup.classList.add('pop-up_opened')
}

// Закрытие попап
const closePopUp = (popup) => {
  popup.classList.remove('pop-up_opened')
}

// Установить данные профиля в форму
const setProfileData = () => {
  formName.value = profileName.textContent
  formHobby.value = profileHobby.textContent
}

// Открытие попап формы редактирования профиля и добавить в него данные профиля
const openPopUpProfile = () => {
  openPopUp(popUpProfile)
  setProfileData()
}

// Открытие попап формы добавления карточки
const openPopUpAddCard = () => {
  openPopUp(popUpAddCard)
  formImageUrl.value = ''
  formImageTitle.value = ''
}

// Создание карточки из попапа формы добавления карточки
const addInitialCardForm = (e) => {
  e.preventDefault()
  const card = createCard(formImageUrl.value, formImageTitle.value)
  addCard(card, cards)
  closePopUp(popUpAddCard)
}

// Закрытие попапа добавления карточек
const closePopUpAddCard = (e) => {
  if (e.target.classList.contains('pop-up__btn-close_type_add-card')) {
    closePopUp(popUpAddCard)
  } else if (e.target.classList.contains('pop-up_type_add-card')) {
    closePopUp(popUpAddCard)
  }
}

// Отправка данных формы профиля в профиль 
const setFormSubmitData = (e) => {
  e.preventDefault()
  profileName.textContent = formName.value
  profileHobby.textContent = formHobby.value
  closePopUp(popUpProfile)
}

//Закрытие попап профиля
const closeProfile = () => {
  closePopUp(popUpProfile)
}

// Смена лайка с активного, на не активный и обратно
const toggleLikeCard = (e) => {
  e.preventDefault()
  const btnLike = e.target.classList.contains('card__like-btn')
  if (btnLike) {
    const like = e.target.parentElement.querySelector('.card__like-btn');
    like.classList.toggle('card__like-btn_active');
  }
}

//Удаление карточек из дома
const deleteCard = (e) => {
  const btnDeleteCard = e.target.classList.contains('card__delete-btn')
  if (btnDeleteCard) {
    e.target.closest('.card').remove()
  }
}

// Создание карточки из cardTemplate
const createCard = (link, name) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElementImage = cardElement.querySelector('.card__image')
  cardElementImage.src = link;
  cardElementImage.alt = `На фотографии место под названием ${name}`
  cardElement.querySelector('.card__title').textContent = name
  return cardElement
}

// Добавление карточки
const addCard = (element, elementsList) => {
  elementsList.prepend(element);
}

//Добавление карточек в дом  из массива initialCards
initialCards.map((el) => {
  const card = createCard(el.link, el.name)
  addCard(card, cards)
})

// Открытие попап с увеличеной картинкой
const openPopUpImageZoom = (e) => {
  const popUpImages = e.target.classList.contains('card__image')
  if (popUpImages) {
    popUpImageImg.src = e.target.src
    popUpImageDescription.textContent = e.target.closest('.card').querySelector('.card__title').textContent
    openPopUp(popUpImageZoom)
  }
}

// Закрытие увеличенной картинки по клику на попап
// const closePopUpImageZoomClickOnPopUp = (e) => {
//   if (e.target.classList.contains('pop-up')) {
//     closePopUp(popUpImageZoom)
//   }
// }

// Закрытие попап с увеличеной картинкой
const popUpImageZoomClose = (e) => {
  if (e.target.classList.contains('pop-up__btn-close_type_image-zoom')) {
    closePopUp(popUpImageZoom)
  } else if (e.target.classList.contains('pop-up_type_image-zoom')) {
    closePopUp(popUpImageZoom)
  }
}

// Закрытие попапов по нажатию на клавишу ESC, переделанная функция
// const closePopUpEcs = (e) => {
//   if (e.keyCode === 27 && popUpImageZoom.classList.contains('pop-up_opened')) {
//     closePopUp(popUpImageZoom)
//   } else if(e.keyCode === 27 && popUpProfile.classList.contains('pop-up_opened')) {
//     closePopUp(popUpProfile)
//   } else if(e.keyCode === 27 && popUpAddCard.classList.contains('pop-up_opened')) {
//     closePopUp(popUpAddCard)
//   }
// }

// document.addEventListener('keyup', closePopUpEcs)
cards.addEventListener('click', toggleLikeCard)
cards.addEventListener('click', deleteCard)
popUpProfile.addEventListener('submit', setFormSubmitData)
profileEditBtn.addEventListener('click', openPopUpProfile)
popUpProfileBtnClose.addEventListener('click', closeProfile)
profileAddBtn.addEventListener('click', openPopUpAddCard)
formImage.addEventListener('submit', addInitialCardForm)
popUpAddCard.addEventListener('click', closePopUpAddCard)
cards.addEventListener('click', openPopUpImageZoom)
// popUpImageZoom.addEventListener('click', closePopUpImageZoomClickOnPopUp)
popUpImageZoom.addEventListener('click', popUpImageZoomClose)