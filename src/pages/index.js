import './index.css';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
// import { initialCards } from '../utils/initialCards.js'
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
  inputErrorClass:'.pop-up__form-input-error'
}
 
const selectorsConfig = {
  popUpAvatar: '.pop-up_type_avatar',
  popUpFormAvatar: '.pop-up__form_avatar', 
  popUpConfirm: '.pop-up_type_confirm',
  popUpConfirmBtn: '.pop-up__form-btn_comfirm',
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
  popUpAddCardName: '.pop-up__form-input_type_image',
  popUpAddCardUrl: '.pop-up__form-input_type_url',
  popUpImageZoom: '.pop-up_type_image-zoom',
  cardImage: '.card__image',
  cardDeleteBtn: '.card__delete-btn',
  cardLikeBtn: '.card__like-btn',
  cardLikeCounter: '.card__like-counter',
  cardLikeBtnActive: 'card__like-btn_active',
  cardDeleteBtnNonActive: 'card__delete-btn_non-active',
  listCard: '.cards',
  card: '#addCard',
  initialCards: []
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

//PopUp удаления карточки
const popupWithConfirm = new PopupWithConfirm(selectorsConfig.popUpConfirm, 
    {
    handleFormSubmit: () => {
      popupWithConfirm.handleBtnForm('Удаление...');
  //   handleFormSubmit: function () {
  //     api
  //       .deleteCard(data._id)
  //       .then(() => {
  //         card.deleteCard();
  //       })
  //       .catch((err) => console.log(err));
      }
    }
) 
popupWithConfirm.setEventListeners();

// Создание экземпляра класса с информацией о пользователе 
const userInfo = new UserInfo({ selectorName: selectorsConfig.profileName, selectorAbout: selectorsConfig.profileHobby, selectorAvatar: selectorsConfig.profileAvatar })

//Получение данных пользователя
api.getInfoUser()
.then((res) => {
  console.log('dataUser: ', res)
  userInfo.setUserInfo(res)
})
.catch(err => console.error('ошибка получения данных User: ', err))

// Получение массива карточек
  api.getInitialCards()
    .then(result => {
      console.log('addCardsUsers: ',result);
      const sectionCard = new Section({
        items: result,
        renderer: (item) => {
          const cardItem = createCard(item)
          sectionCard.addItem(cardItem)
        }
      },
        selectorsConfig.listCard)
      sectionCard.renderer()

  })
  .catch(err => console.log('Ошибка при получении данных карточек', err))



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

// Создание экземпляра класса формы карты 
const formAddCard = new PopupWithForm(selectorsConfig.popUpAddCard, {
  handleFormSubmit: () => {
    formAddCard.handleBtnForm('Сохранение...');
    api.postAddNewCard({name:formImageTitle.value, link:formImageUrl.value})
    .then((data) => {
      console.log(data)
          const item = {}
    item.name = data.name
    item.link = data.link
    item.likes = data.likes
    console.log('это карточка item: ', item)
    const cardItem = createCard(item)
    console.log('это карточка createCard: ', cardItem)
    sectionCard.prependItem(cardItem)
    })
  }
})
formAddCard.setEventListeners()


// Создание экземпляра класса Card 
function createCard(item) {
  const card = new Card(item, {
    handleCardClick: () => {
      popupWithImage.open( item.link, item.name )
    },
    handleBtnDelete: () => {
      popupWithConfirm.open();
      popupWithConfirm.handleBtn(function () {
        api
          .deleteCard(item._id)
          .then(() => {
            card._deleteCard();
          })
          .catch((err) => console.log(err));
      });
    },
    handleBtnLike: () => {
      if (!card.getElementLike().classList.contains(selectorsConfig.cardLikeBtnActive)) {
        api.putHandlerLike(item._id)
          .then((res) => {
            console.log('get like: ', res )
            card.setLikes(res.likes);
            card.toggleLikeCard();
          })
          .catch((err) => console.log(err));
      } else {
        api.deleteLike(item._id)
          .then((res) => {
            console.log('like delete: ', res)
            card.setLikes(res.likes);
            card.toggleLikeCard();
          })
          .catch((err) => console.log('ошибка удаления лайка: ', err));
      }
    },
  }, selectorsConfig)
  const cardItem = card.generateCard(item.owner._id)
  card.setLikes(item.likes);
  return cardItem
}

  Promise.all([api.getInitialCards(), api.getInfoUser()])
  .then((result) => {
    userInfo.setUserInfo({name: result[1].name, about: result[1].about, avatar: result[1].avatar, _id: result[1]._id});
    document.querySelector(selectorsConfig.profileAvatar).src = result[1].avatar;
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

// Слушатель кнопки аватар
avatarEdit.addEventListener("click", () => {
  formProfile.handleBtnForm("Сохранить");
  validationInputAvatar.clearErrors()
  formAvatar.open();
});