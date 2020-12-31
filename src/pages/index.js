import './index.css';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { initialCards } from '../utils/initialCards.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import {
  popUpImageImg,
  popUpImageDescription,
  popUpImageZoom,
  closePopUpEsc,
  closePopUpClickByOverlayOrBtn,
  formName,
  formHobby,
  formImageTitle,
  formImageUrl,
  profileEditBtn,
  profileAddBtn
} from '../utils/utils.js'

const validationCustom = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-btn-submit',
  inactiveButtonClass: 'pop-up__form-btn-submit_disabled',
  errorClass: 'pop-up__form-input_type_invalid'
}

const selectorsConfig = {
  popUpImageImgUtils: popUpImageImg,
  popUpImageDescriptionUtils: popUpImageDescription,
  closePopUpEscUtils: closePopUpEsc,
  closePopUpClickByOverlayOrBtnUtils: closePopUpClickByOverlayOrBtn,
  popUpImageZoomUtils: popUpImageZoom,
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
const validationInputProfile = new FormValidator(validationCustom, selectorsConfig.popUpFormProfile)
validationInputProfile.enableValidation()

// Создание класса для проверки на валидность инпута формы добавления карточки 
const validationInputImage = new FormValidator(validationCustom, selectorsConfig.popUpFormProfileImage)
validationInputImage.enableValidation()

// Создание экземпляра класса попапа с картикой
const popupWithImage = new PopupWithImage(selectorsConfig.popUpImageZoom)
popupWithImage.setEventListeners()

// Создание экземпляра класса с информацией о пользователе
const userInfo = new UserInfo({ selectorName: selectorsConfig.profileName, selectorAbout: selectorsConfig.profileHobby })

// Создание экземпляра класса формы профиля
const formProfile = new PopupWithForm(selectorsConfig.popUpProfile, {
  handleFormSubmit: (dataUser) => {
    userInfo.setUserInfo(dataUser['input-name'], dataUser['input-hobby'])
    validationInputImage.clearErrors()
  }
}
)
formProfile.setEventListeners()

// Создание экземпляра класса Card
function createCard(item) {
  const card = new Card(item, {
    handleCardClick: () => {
      popUpImageZoom.classList.add('pop-up_opened')
    },
  }, selectorsConfig)
  const cardItem = card.generateCard()
  return cardItem
}


// Создание экземпляра класса section
const sectionCard = new Section({
  items: initialCards,
  renderer: (item) => {

    const cardItem = createCard(item)
    sectionCard.addItem(cardItem)
  }
},
  selectorsConfig.listCard)
sectionCard.renderer()

// Создание экземпляра класса формы карты
const formAddCard = new PopupWithForm(selectorsConfig.popUpAddCard, {
  handleFormSubmit: () => {
    const item = {}
    item.name = formImageTitle.value
    item.link = formImageUrl.value
    const cardItem = createCard(item)
    sectionCard.prependItem(cardItem)
  }
})
formAddCard.setEventListeners(selectorsConfig.btnClosePopUpAddCard, selectorsConfig.popUpFormProfileImage)

// Слушатель - кнопки редактирования профиля
profileEditBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  console.log('вызов из index.js: ', userData)
  formName.value = userData.name
  formHobby.value = userData.hobby
  validationInputProfile.clearErrors()
  formProfile.open()
}
)

// Слушатель - кнопки добавления фотографий
profileAddBtn.addEventListener('click', () => {
  validationInputImage.clearErrors()
  formAddCard.open()
})