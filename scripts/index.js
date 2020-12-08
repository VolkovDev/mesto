import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './initialCards.js'
import { openPopUp, closePopUp, popUpAddCard, popUpProfile } from './utils.js'

const formImage = document.querySelector('.pop-up__form_image')
const formName = document.querySelector('.pop-up__form-input_type_name')
const formHobby = document.querySelector('.pop-up__form-input_type_hobby')
const formImageTitle = document.querySelector('.pop-up__form-input_type_image')
const formImageUrl = document.querySelector('.pop-up__form-input_type_url')
const profileName = document.querySelector('.profile__name')
const profileHobby = document.querySelector('.profile__hobby')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
const cards = document.querySelector('.cards')
const popUpFormProfile = '.pop-up__form_profile'
const popUpFormProfileImage = '.pop-up__form_image'

const validationCustom = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-btn-submit',
  inactiveButtonClass: 'pop-up__form-btn-submit_disabled',
  errorClass: 'pop-up__form-input_type_invalid'
}

// Создание класса для проверки на валидность инпута профиля 
const validationInputProfile = new FormValidator(validationCustom, popUpFormProfile)
validationInputProfile.enableValidation()

// Создание класса для проверки на валидность инпута формы добавления карточки 
const validationInputImage = new FormValidator(validationCustom, popUpFormProfileImage)
validationInputImage.enableValidation()

// Установить данные профиля в форму removeEventListener
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
  validationInputProfile.clearErrors(popUpProfile)
  openPopUp(popUpProfile)
}

// Открытие попап формы добавления карточки
const openPopUpAddCard = () => {
  formImageUrl.value = ''
  formImageTitle.value = ''
  validationInputImage.clearErrors(popUpAddCard)
  openPopUp(popUpAddCard)
}

// Создание карточки
const createCard = (data) => {
  const card = new Card(data, '#addCard')
  const cardElement = card.generateCard()
  return cardElement
}

// Создание карточки из данных формы добавления карточки
const addInitialCardForm = (e) => {
  const data = {}
  data.name = formImageTitle.value
  data.link = formImageUrl.value
  addCard(createCard(data), cards)
  closePopUp(popUpAddCard)
}

// Добавление карточки
const addCard = (el, elList) => {
  elList.prepend(el)
}

//Добавление массива карточек InitialCards
const addInitialCards = (el, elList) => {
  elList.append(el)
}

//Добавление карточек в дом  из массива initialCards
initialCards.map((el) => {
  addInitialCards(createCard(el), cards)
})

popUpProfile.addEventListener('submit', setFormSubmitData)
profileEditBtn.addEventListener('click', openPopUpProfile)
profileAddBtn.addEventListener('click', openPopUpAddCard)
formImage.addEventListener('submit', addInitialCardForm)