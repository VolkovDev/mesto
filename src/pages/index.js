import './index.css';
// import html from './file.html';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { initialCards } from '../utils/initialCards.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
// import Popup from './Popup.js'
import { openPopUp, closePopUp, popUpAddCard, popUpProfile, popUpBtnClose } from '../utils/utils.js'


// const formImage = document.querySelector('.pop-up__form_image')
// const formName = document.querySelector('.pop-up__form-input_type_name')
// const formHobby = document.querySelector('.pop-up__form-input_type_hobby')
// const formImageTitle = document.querySelector('.pop-up__form-input_type_image')
// const formImageUrl = document.querySelector('.pop-up__form-input_type_url')
// const profileName = document.querySelector('.profile__name')
// const profileHobby = document.querySelector('.profile__hobby')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
const cards = document.querySelector('.cards')

const validationCustom = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-btn-submit',
  inactiveButtonClass: 'pop-up__form-btn-submit_disabled',
  errorClass: 'pop-up__form-input_type_invalid'
}

const selector = {
  popUpFormProfile: '.pop-up__form_profile',
  popUpFormProfileImage: '.pop-up__form_image',
  profileName: '.profile__name',
  profileHobby: '.profile__hobby',
  popUpProfile: '.pop-up_type_profile',
  popUpAddCard: '.pop-up_type_add-card',
  popUpAddCardName: '.pop-up__form-input_type_image',
  popUpAddCardUrl: '.pop-up__form-input_type_url',
  popUpImageZoom: '.pop-up_type_image-zoom',
  btnClosePopUpAddCard: '.pop-up__btn-close_type_add-card',
  btnClosePopUpProfile: '.pop-up__btn-close_type_profile',
  btnClosePopUpZoomImg: '.pop-up__btn-close_type_image-zoom',
  listCard: '.cards',
  card: '#addCard'
  

}

// Создание класса для проверки на валидность инпута профиля 
const validationInputProfile = new FormValidator(validationCustom, selector.popUpFormProfile)
validationInputProfile.enableValidation()

// Создание класса для проверки на валидность инпута формы добавления карточки 
const validationInputImage = new FormValidator(validationCustom, selector.popUpFormProfileImage)
validationInputImage.enableValidation()

// Создание экземпляра класса попапа с картикой
const popupWithImage = new PopupWithImage(selector.popUpImageZoom)
popupWithImage.setEventListeners(selector.btnClosePopUpZoomImg)

// Создание экземпляра класса с информацией о пользователе
const userInfo = new UserInfo(selector.profileName, selector.profileHobby)

// Создание экземпляра класса формы профиля
const formProfile = new PopupWithForm(selector.popUpProfile,{ 
  handleFormSubmit: (dataForm) => userInfo.setUserInfo(dataForm['pop-up__form-input_type_name'], dataForm['pop-up__form-input_type_hobby'])
  }
)
formProfile.setEventListeners(selector.btnClosePopUpProfile, selector.popUpFormProfile)

// Создание экземпляра класса формы карты
const formAddCard = new PopupWithForm(selector.popUpAddCard, {
  handleFormSubmit: (dataForm) => {
    // const { "input-name-card": name, "input-link-card": link } = dataForm;
    const item = {}
    item.name = selector.popUpAddCardName
    item.link = selector.popUpAddCardUrl
    const card = new Card(item, selector.card)
    const CardItem = card.generateCard()
    sectionCard.addItem(CardItem)
  }
})
formAddCard.setEventListeners(selector.btnClosePopUpAddCard, selector.popUpFormProfileImage)

// Создание экземпляра класса section
const sectionCard = new Section( {
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, selector.card)
    const cardItem = card.generateCard()
    sectionCard.addItem(cardItem)
  }
},
selector.listCard)
sectionCard.renderer()

// Слушатель - кнопки редактирования профиля
profileEditBtn.addEventListener('click', () => {
  formProfile.open()
  validationInputProfile.enableValidation()
  const userData = userInfo.getUserInfo()
  userInfo.setUserInfo(userData.name, userData.about)
  }
)

// Слушатель - кнопки добавления фотографий
profileAddBtn.addEventListener('click', () => {
  formAddCard.open()
  validationInputImage.enableValidation()
})
// Установить данные профиля в форму removeEventListener
// const setProfileData = () => {
//   formName.value = profileName.textContent
//   formHobby.value = profileHobby.textContent
// }

// Установка данных формы профиля в профиль 
// const setFormSubmitData = (e) => {
//   profileName.textContent = formName.value
//   profileHobby.textContent = formHobby.value
//   closePopUp(popUpProfile)
// }

// Открытие попап формы редактирования профиля и добавить в него данные профиля
// const openPopUpProfile = () => {
//   setProfileData()
//   validationInputProfile.clearErrors(popUpProfile)
//   openPopUp(popUpProfile)
// }

// Открытие попап формы добавления карточки
// const openPopUpAddCard = () => {
//   formImageUrl.value = ''
//   formImageTitle.value = ''
//   validationInputImage.clearErrors(popUpAddCard)
//   openPopUp(popUpAddCard)
// }

// Создание карточки
// const createCard = (data) => {
//   const card = new Card(data, '#addCard')
//   const cardElement = card.generateCard()
//   return cardElement
// }

// Создание карточки из данных формы добавления карточки
// const addInitialCardForm = (e) => {
//   const data = {}
//   data.name = formImageTitle.value
//   data.link = formImageUrl.value
//   addCard(createCard(data), cards)
//   closePopUp(popUpAddCard)
// }

// Добавление карточки
// const addCard = (el, elList) => {
//   elList.prepend(el)
// }

//Добавление массива карточек InitialCards
// const addInitialCards = (el, elList) => {
//   elList.append(el)
// }

//Добавление карточек в дом  из массива initialCards
// initialCards.map((el) => {
//   addInitialCards(createCard(el), cards)
// })



// popUpProfile.addEventListener('submit', setFormSubmitData)
// profileEditBtn.addEventListener('click', openPopUpProfile)
// profileAddBtn.addEventListener('click', openPopUpAddCard)
// formImage.addEventListener('submit', addInitialCardForm)