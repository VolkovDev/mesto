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
  // avatarEdit: '.profile__avatar-container',
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
  // btnClosePopUpAddCard: '.pop-up__btn-close_type_add-card',
  // btnClosePopUpProfile: '.pop-up__btn-close_type_profile',
  // btnClosePopUpZoomImg: '.pop-up__btn-close_type_image-zoom',
  // btnClosePopUpConfirm: '.pop-up__btn-close_type_confirm',
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
const InitialCards = () => {
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
}
InitialCards()

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
    InitialCards()
    })
    
    // const item = {}
    // item.name = formImageTitle.value
    // item.link = formImageUrl.value
    // const cardItem = createCard(item)
    // sectionCard.prependItem(cardItem)
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
      popupWithConfirm.handleButton(function () {
        api
          .deleteCard(item._id)
          .then(() => {
            card._deleteCard();
          })
          .catch((err) => console.log(err));
      });
    },
    handleBtnLike: () => {
      if (!card.getElementLike().classList.contains('card__like-btn_active')) {
        api.putHandlerLike(item._id)
          .then((res) => {
            console.log('получить лайк: ', res )
            card.setLikes(res.likes);
            // card.toggleLike();
          })
          .catch((err) => console.log(err));
      } else {
        api.deleteLike(item._id)
        console.log('delete Like: ', item._id)
          .then((res) => {
            console.log('like: ', res)
            card.setLikes(res.likes);
            // card.toggleLike();
          })
          .catch((err) => console.log(err));
      }
    },
  }, selectorsConfig)
  const cardItem = card.generateCard(item.owner._id)
  card.setLikes(item.likes);
  return cardItem
}


// Создание экземпляра класса section 
// const sectionCard = new Section({
//   items: initialCards,
//   renderer: (item) => {

//     const cardItem = createCard(item)
//     sectionCard.addItem(cardItem)
//   }
// },
//   selectorsConfig.listCard)
// sectionCard.renderer()


// Promise.all([api.getUserInfo()])
//   .then((result) => {
//     userInfo.setUserInfo(result[1].name, result[1].about);
//     // document.querySelector(selectors.profileAvatar).src = result[1].avatar;
//   })
//   .catch((err) => console.log(err));

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

// Слушатель кнопки аватар
avatarEdit.addEventListener("click", () => {
  validationInputAvatar.clearErrors()
  formAvatar.open();
});

// const getAllData = () => {
//   const card = new Card(data, selectors.card, {
//     handleCardClick: () => popupWithImage.open(data.link, data.name),
//     handleBtnDelete: () => {
//       const popupWithConfirm = new popupWithConfirm (selectorsConfig.popUpConfirm, {
//         handleFormSubmit: () => {
//           api.deleteCard(data._id)
//           .then(() => {
//             card.deleteCard();
//           })
//           .catch((err) => console.log(err));
//         }
//       })
//       popupWithConfirm.open();
//     },
//     handleButtonLike: () => {
//       if (!card.getElementLike().classList.contains(selectorsConfig.cardLikeBtnActive)) {
//         api.putHandlerLike(data._id)
//           .then((res) => {
//             card.setLikes(res.likes);
//             card.toggleLike();
//           })
//           .catch((err) => console.log(err));
//       } else {
//         api.deleteLike(data._id)
//           .then((res) => {
//             card.setLikes(res.likes);
//             card.toggleLike();
//           })
//           .catch((err) => console.log(err));
//       }
//     },
//   });

//     //Создание карточки и добавление лайков
//     const cardElement = card.generateCard(data.owner._id);
//     card.setLikes(data.likes);
//     sectionCard.appendItem(cardElement);
//     card.close();
// }