import './index.css';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'
import Api from '../components/Api.js'
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
  profileAddBtn,
  avatarEdit
} from '../utils/utils.js'

const api = new Api({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-19',
  token: 'f72c8d0b-5fc2-4db7-9b50-05d59d520549'
})

const validationCustom = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-btn-submit',
  inactiveButtonClass: 'pop-up__form-btn-submit_disabled',
  errorClass: 'pop-up__form-input_type_invalid',
  inputErrorClass: '.pop-up__form-input-error'
}

const selectorsConfig = {
  popUpAvatar: '.pop-up_type_avatar',
  popUpFormAvatar: '.pop-up__form_avatar',
  popUpConfirm: '.pop-up_type_confirm',
  popUpImageImgUtils: popUpImageImg,
  popUpImageDescriptionUtils: popUpImageDescription,
  closePopUpEscUtils: closePopUpEsc,
  closePopUpClickByOverlayOrBtnUtils: closePopUpClickByOverlayOrBtn,
  popUpImageZoomUtils: popUpImageZoom,
  popUpFormProfile: '.pop-up__form_profile',
  popUpFormProfileImage: '.pop-up__form_image',
  profileAvatar: '.profile__avatar',
  profileName: '.profile__name',
  profileHobby: '.profile__hobby',
  popUpProfile: '.pop-up_type_profile',
  popUpAddCard: '.pop-up_type_add-card',
  popUpImageZoom: '.pop-up_type_image-zoom',
  cardImage: '.card__image',
  cardDeleteBtn: '.card__delete-btn',
  cardLikeBtn: '.card__like-btn',
  cardLikeCounter: '.card__like-counter',
  cardLikeBtnActive: 'card__like-btn_active',
  cardDeleteBtnNonActive: 'card__delete-btn_non-active',
  listCard: '.cards',
  card: '#addCard',
  userInfo: {}
  // initialCards: []
}


// Создание класса для проверки на валидность инпута профиля  
const validationInputProfile = new FormValidator(validationCustom, selectorsConfig.popUpFormProfile)
validationInputProfile.enableValidation()

// Создание класса для проверки на валидность инпута формы добавления карточки  
const validationInputImage = new FormValidator(validationCustom, selectorsConfig.popUpFormProfileImage)
validationInputImage.enableValidation()

const validationInputAvatar = new FormValidator(validationCustom, selectorsConfig.popUpFormAvatar)
validationInputAvatar.enableValidation()

// Создание экземпляра класса попапа с картикой 
const popupWithImage = new PopupWithImage(selectorsConfig.popUpImageZoom)
popupWithImage.setEventListeners()

// Создание экземпляра класса с информацией о пользователе 
const userInfo = new UserInfo({ selectorName: selectorsConfig.profileName, selectorAbout: selectorsConfig.profileHobby, selectorAvatar: selectorsConfig.profileAvatar })

// Создание экземпляра класса формы профиля 
const formProfile = new PopupWithForm(selectorsConfig.popUpProfile, {
  handleFormSubmit: (dataUser) => {
    formProfile.handleBtnForm('Сохранение...');
    api.patchEditProfile(dataUser['input-name'], dataUser['input-hobby'])
      .then((data) => {
        userInfo.setUserInfo(data)
        validationInputImage.clearErrors()
        formProfile.close()
      })
      .catch((err) => console.log(err));
  }
})
formProfile.setEventListeners()

// Создание экземпляра класса формы аватар 
const formAvatar = new PopupWithForm(selectorsConfig.popUpAvatar, {
  handleFormSubmit: (dataUser) => {
    formAvatar.handleBtnForm('Сохранение...');
    api.patchRefreshAvatar(dataUser['input-avatar'])
      .then(() => {
        userInfo.setAvatar(
          dataUser['input-avatar']
        )
        validationInputAvatar.clearErrors()
        formAvatar.close()
      })

      .catch(err => console.log('getAvatar: ', err))
  }
})
formAvatar.setEventListeners()

// Получение данных User
const infoUser = (user) => {
  selectorsConfig.userInfo = user
}


// Создание экземпляра класса формы карты 
const formAddCard = new PopupWithForm(selectorsConfig.popUpAddCard, {
  handleFormSubmit: () => {
    formAddCard.handleBtnForm('Сохранение...');
    api.postAddNewCard({ name: formImageTitle.value, link: formImageUrl.value })
      .then((data) => {
        console.log('данные отправки из формы карточки: ', data)
        const sectionCard = new Section({
          items: data,
          renderer: () => { }
        }, selectorsConfig.listCard)
        console.log('infoUser Index js: ', selectorsConfig.userInfo)
        const cardItem = createCard(data, selectorsConfig.userInfo)
        sectionCard.prependItem(cardItem)
        formAddCard.close()
        console.log('это карточка createCard: ', cardItem)
      })
      .catch(err => console.log('Ошибка при добавлении новой карточки: ', err))
  }
})
formAddCard.setEventListeners()

//PopUp удаления карточки
const popupWithConfirm = new PopupWithConfirm(selectorsConfig.popUpConfirm, {
  handleDeleteCard: ({ cardItem, cardId }) => {
    console.log('element card index.JS: ', cardItem)
    console.log('element card index.JS: ', cardId)
    api.deleteCard(cardId)
      .then(() => {
        cardItem.remove()
        popupWithConfirm.close()
      })
      .catch((err) => {
        console.log('delete-Card-Fails: ', err);
      })
  }
})
popupWithConfirm.setEventListeners();


// Создание экземпляра класса Card 
function createCard(itemCard, itemUser) {
  const card = new Card(itemCard, itemUser, {
    handleCardClick: () => {
      popupWithImage.open(itemCard.link, itemCard.name)
    },
    handleBtnDelete: ({ cardItem, cardId }) => {
      popupWithConfirm.open({ cardItem, cardId })
    },
    handleBtnLike: () => {
      if (card.getElementLike()) {
        api.putHandlerLike(itemCard._id)
          .then((res) => {
            console.log('get like: ', res)
            card.setLikes(res.likes);
            card.toggleLikeCard();
          })
          .catch((err) => console.log(err));
      } else {
        api.deleteLike(itemCard._id)
          .then((res) => {
            console.log('delete like : ', res)
            card.setLikes(res.likes);
            card.toggleLikeCard();
          })
          .catch((err) => console.log('ошибка удаления лайка: ', err));
      }
    },
  }, selectorsConfig)
  const cardItem = card.generateCard()
  card.setLikes(itemCard.likes);
  return cardItem
}

Promise.all([api.getInitialCards(), api.getInfoUser()])
  .then((result) => {
    userInfo.setUserInfo({ name: result[1].name, about: result[1].about, avatar: result[1].avatar, _id: result[1]._id });
    console.log('addCardsUsers: ', result[0]);
    console.log('getUserData: ', result[1])
    const sectionCard = new Section({
      items: result[0],
      renderer: (item) => {
        const cardItem = createCard(item, result[1])
        sectionCard.addItem(cardItem)
      }
    },
      selectorsConfig.listCard)
    sectionCard.renderer()
    infoUser(result[1])

    console.log('Промисы получены')
  })
  .catch((err) => console.log(err));

// Слушатель - кнопки редактирования профиля 
profileEditBtn.addEventListener('click', () => {
  formProfile.handleBtnForm("Сохранить");
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
  formAddCard.handleBtnForm("Создать");
  validationInputImage.clearErrors()
  formAddCard.open()
})

// Слушатель - кнопки аватар
avatarEdit.addEventListener("click", () => {
  formProfile.handleBtnForm("Сохранить");
  validationInputAvatar.clearErrors()
  formAvatar.open();
});