import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './initialCards.js'

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
// const cardTemplate = document.querySelector('#addCard').content

const validationCustom = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-btn-submit',
  inactiveButtonClass: 'pop-up__form-btn-submit_disabled',
  errorClass: 'pop-up__form-input_type_invalid'
}

// Создание класса для проверки на валидность инпута профиля 
const validationInputProfile = new FormValidator(validationCustom, '.pop-up__form_profile')
validationInputProfile.enableValidation();

// Создание класса для проверки на валидность инпута формы добавления карточки 
const validationInputImage = new FormValidator(validationCustom, '.pop-up__form_image')
validationInputImage.enableValidation();

//Очистка ошибок iput
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
  // document.addEventListener('keydown', closePopUpEsc)
  // console.log('addListenerOpen')
}

// Закрытие попап
const closePopUp = (popup) => {
  popup.classList.remove('pop-up_opened')
  // document.removeEventListener('keydown', closePopUpEsc)
  // console.log('removeListenerOpen')
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

// Закрытие попап с увеличеной картинкой
const closePopUpClickByOverlayOrBtn = (e) => {
  if (e.target.classList.contains('pop-up__btn-close') || e.target.classList.contains('pop-up')) {
    const popUpActive = e.target.closest('.pop-up')
    closePopUp(popUpActive)
  }
}

// Создание карточки из попапа формы добавления карточки
const addInitialCardForm = (e) => {
  const data = {}
  data.name = document.querySelector(".pop-up__form-input_type_image").value;
  data.link = document.querySelector(".pop-up__form-input_type_url").value;
  const card = new Card(data, '#addCard')
  const cardElement = card.generateCard()
  addCard(cardElement, cards)
  closePopUp(popUpAddCard)
}

// // Добавление карточки
const addCard = (el, elList) => {
  elList.prepend(el)
}

// //Добавление массива карточек InitialCards
const addInitialCards = (el, elList) => {
  elList.append(el)
}

// //Добавление карточек в дом  из массива initialCards
initialCards.map((el) => {
  const card = new Card(el, '#addCard')
  const cardElement = card.generateCard()
  addInitialCards(cardElement, cards)
})

// Закрытие попапов по нажатию на клавишу ESC, переделанная функция
const closePopUpEsc = (e) => {
  if (e.key === 'Escape') {
    const popUpOpened = document.querySelector('.pop-up_opened')
    closePopUp(popUpOpened)
  }
}

document.addEventListener('keydown', closePopUpEsc)
popUpProfile.addEventListener('submit', setFormSubmitData)
profileEditBtn.addEventListener('click', openPopUpProfile)
profileAddBtn.addEventListener('click', openPopUpAddCard)
formImage.addEventListener('submit', addInitialCardForm)
popUpAddCard.addEventListener('click', closePopUpClickByOverlayOrBtn)
popUpProfile.addEventListener('click', closePopUpClickByOverlayOrBtn)
popUpImageZoom.addEventListener('click', closePopUpClickByOverlayOrBtn)

export { popUpImageImg, popUpImageDescription }