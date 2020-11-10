const popUp = document.querySelector('.pop-up')
const popUpBtnClose = document.querySelector('.pop-up__btn-close')
// const form = document.querySelector('.pop-up__form')
const formProfile = document.querySelector('.pop-up__form_profile')
const formImage = document.querySelector('.pop-up__form_image')
const formName = document.querySelector('.pop-up__form-input_type_name')
const formHobby = document.querySelector('.pop-up__form-input_type_hobby')
const formImageTitle = document.querySelector('.pop-up__form-input_type_image')
const formImageUrl = document.querySelector('.pop-up__form-input_type_url')
// const formBtnSubmit = document.querySelector('.pop-up__form-btn-submit')
const popUpImage = document.querySelector('.pop-up-image')
const popUpImageImg = document.querySelector('.pop-up-image__img')
const popUpImageDescription = document.querySelector('.pop-up-image__description')
const popUpImageBtnClose = document.querySelector('.pop-up-image__btn-close')
const profileName = document.querySelector('.profile__name')
const profileHobby = document.querySelector('.profile__hobby')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
const cards = document.querySelector('.cards')
const card = document.querySelectorAll('.card')
const cardImage = document.querySelector('.card__image')
// const btnDeleteCard = document.querySelector('.card__delete-btn')
const cardTemplate = document.querySelector('#addCard').content;

// Установить данные профиля в форму
function setProfileData() {
  formName.value = profileName.textContent
  formHobby.value = profileHobby.textContent
}

// Открытие попап формы редактирования профиля и добавить в него данные профиля
function openPopUp() {
  popUp.classList.add('pop-up_opened')
  formProfile.classList.remove('pop__form_none-active');
  formImage.classList.add('pop__form_none-active');
  setProfileData()
}

// Открытие попап формы добавления карточки
function openImageForm() {
  popUp.classList.add('pop-up_opened')
  formProfile.classList.add('pop__form_none-active');
  formImage.classList.remove('pop__form_none-active');
  formImageUrl.value = ''
  formImageTitle.value = ''
}


// Закрытие попап формы профиля
function closePopUp() {
  popUp.classList.remove('pop-up_opened')
}

// Установка данных формы профиля в профиль 
function setFormSubmitData(e) {
  e.preventDefault()
  profileName.textContent = formName.value
  profileHobby.textContent = formHobby.value
  closePopUp()
  if (e.target.classList.contains('pop-up')) {
    popUp.classList.remove('pop-up_opened')
  }
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

//Удаление карточек
const deleteCard = (e) => {
  const btnDeleteCard = e.target.classList.contains('card__delete-btn')
  if (btnDeleteCard) {
    e.target.closest('.card').remove()
  }
}

// Создание карточки из cardTemplate
function createCard(link, name) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElementImage = cardElement.querySelector('.card__image')
  cardElementImage.src = link;
  cardElementImage.alt = `На фотографии место под названием ${name}`
  cardElement.querySelector('.card__title').textContent = name
  return cardElement
}

// Добавление карточки в дом
const addCard = (card, elementsList) => { 
  elementsList.prepend(card);
}

//Добавление карточек в дом  из массива initialCards
initialCards.map((el) => {
  const card = createCard(el.link, el.name)
  addCard(card, cards)
})

// Открытие попап с картинкой
function openPopUpImage(e) {
  const popUpImages = e.target.classList.contains('card__image')
  if (popUpImages) {
    popUpImageImg.src = e.target.src
    popUpImageDescription.textContent = e.target.closest('.card').querySelector('.card__title').textContent
    popUpImage.classList.add('pop-up-image_opened-img')
  } else if (e.target.classList.contains('pop-up')) {
    popUp.classList.remove('pop-up_opened')
  }
}


// Закрытие попап с картинкой
function openPopUpImageClose(e) {
  if (e.target.classList.contains('pop-up-image__btn-close')) {
    popUpImage.classList.remove('pop-up-image_opened-img')
  } else if (e.target.classList.contains('pop-up-image')) {
    popUpImage.classList.remove('pop-up-image_opened-img')
  }
}

// Создание карточки из попап формы
const addInitialCardsForm = (e) => {
  e.preventDefault()
  if (e.target.classList.contains('pop-up__form-btn-submit') && (formImageUrl.value != 0 && formImageTitle.value != 0)) {
    const card = createCard(formImageUrl.value, formImageTitle.value)
    addCard(card, cards)
    closePopUp()
  }
}

// function closePopUpEcs(e) {
//   if (e.keyCode === 27 && popUp.classList.contains('pop-up_opened')) {
//     popUp.classList.remove('pop-up_opened')
//   } else if (e.keyCode === 27 && popUpImage.classList.contains('pop-up-image_opened-img')) {
//     popUpImage.classList.remove('pop-up-image_opened-img')
//   }
// }

// document.addEventListener('keyup', closePopUpEcs)
formImage.addEventListener('click', addInitialCardsForm)
formProfile.addEventListener('submit', setFormSubmitData)
popUpBtnClose.addEventListener('click', closePopUp)
cards.addEventListener('click', toggleLikeCard)
cards.addEventListener('click', deleteCard)
profileEditBtn.addEventListener('click', openPopUp)
profileAddBtn.addEventListener('click', openImageForm)
cards.addEventListener('click', openPopUpImage)
popUpImage.addEventListener('click', openPopUpImageClose)