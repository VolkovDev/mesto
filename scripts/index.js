const popUpProfile = document.querySelector('.pop-up_type_profile')
const popUpAddCard = document.querySelector('.pop-up_type_add-card')
const popUpImageZoom = document.querySelector('.pop-up_type_image-zoom')
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
const cardTemplate = document.querySelector('#addCard').content

const clearErrors = (popup) => {
  popup.querySelectorAll('.pop-up__form-input-error').forEach((span) => {
    span.textContent = ''
  })
  popup.querySelectorAll('.pop-up__form-input').forEach((input) => {
    input.classList.remove('pop-up__form-input_type_invalid')
  })
  popup.querySelectorAll('.pop-up__form-btn-submit').forEach((button) => {
    button.setAttribute('disabled', true)
  })
}

// Открытие попап
const openPopUp = (popup) => {
  popup.classList.add('pop-up_opened')
  document.addEventListener('keydown', closePopUpEsc)
}

// Закрытие попап
const closePopUp = (popup) => {
  popup.classList.remove('pop-up_opened')
  document.removeEventListener('keydown', closePopUpEsc)
}

// Установить данные профиля в форму
const setProfileData = () => {
  formName.value = profileName.textContent
  formHobby.value = profileHobby.textContent
}

// Установка данных формы профиля в профиль 
const setFormSubmitData = (e) => {
  profileName.textContent = formName.value
  profileHobby.textContent = formHobby.value
  closePopUp(popUpProfile)
}

// Открытие попап формы редактирования профиля и добавить в него данные профиля
const openPopUpProfile = () => {
  setProfileData()
  clearErrors(popUpProfile)
  openPopUp(popUpProfile)
}

// Открытие попап формы добавления карточки
const openPopUpAddCard = () => {
  formImageUrl.value = ''
  formImageTitle.value = ''
  clearErrors(popUpAddCard)
  openPopUp(popUpAddCard)
}

// Создание карточки из попапа формы добавления карточки
const addInitialCardForm = (e) => {
  const card = createCard(formImageUrl.value, formImageTitle.value)
  addCard(card, cards)
  closePopUp(popUpAddCard)
}

// Смена лайка с активного, на не активный и обратно
const toggleLikeCard = (e) => {
  const like = e.target.parentElement.querySelector('.card__like-btn')
  like.classList.toggle('card__like-btn_active')
}

//Удаление карточки из дома
const deleteCard = (e) => {
  e.target.closest('.card').remove()
}

// Открытие попап с увеличеной картинкой
const openPopUpImageZoom = (e) => {
  popUpImageImg.src = e.target.src
  popUpImageDescription.textContent = e.target.closest('.card').querySelector('.card__title').textContent
  openPopUp(popUpImageZoom)
}

// Закрытие попап с увеличеной картинкой
const closePopUpClickByOverlayOrBtn = (e) => {
  if (e.target.classList.contains('pop-up__btn-close') || e.target.classList.contains('pop-up')) {
    const popUpActive = e.target.closest('.pop-up')
    closePopUp(popUpActive)
  }
}

// Создание карточки из cardTemplate
const createCard = (link, name) => {
  const cardElement = cardTemplate.cloneNode(true)
  const cardElementImage = cardElement.querySelector('.card__image')
  const cardElementLikeBtn = cardElement.querySelector('.card__like-btn')
  const cardElementDeleteBtn = cardElement.querySelector('.card__delete-btn')
  cardElementImage.src = link
  cardElementImage.alt = `На фотографии место под названием ${name}`
  cardElement.querySelector('.card__title').textContent = name
  cardElementLikeBtn.addEventListener('click', toggleLikeCard)
  cardElementImage.addEventListener('click', openPopUpImageZoom)
  cardElementDeleteBtn.addEventListener('click', deleteCard)
  return cardElement
}

// Добавление карточки
const addCard = (element, elementsList) => {
  elementsList.prepend(element)
}

//Добавление массива карточек InitialCards
const addInitialCards = (el, elList) => {
  elList.append(el)
}

//Добавление карточек в дом  из массива initialCards
initialCards.map((el) => {
  const card = createCard(el.link, el.name)
  addInitialCards(card, cards)
})

// Закрытие попапов по нажатию на клавишу ESC, переделанная функция
const closePopUpEsc = (e) => {
  if (e.key === 'Escape') {
    const popUpOpened = document.querySelector('.pop-up_opened')
    closePopUp(popUpOpened)
  }
}

popUpProfile.addEventListener('submit', setFormSubmitData)
profileEditBtn.addEventListener('click', openPopUpProfile)
profileAddBtn.addEventListener('click', openPopUpAddCard)
formImage.addEventListener('submit', addInitialCardForm)
popUpAddCard.addEventListener('click', closePopUpClickByOverlayOrBtn)
popUpProfile.addEventListener('click', closePopUpClickByOverlayOrBtn)
popUpImageZoom.addEventListener('click', closePopUpClickByOverlayOrBtn)