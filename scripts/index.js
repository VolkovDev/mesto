const popUp = document.querySelector('.pop-up')
const popUpBtnClose = document.querySelector('.pop-up__btn-close')
const form = document.querySelector('.form')
const formName = document.querySelector('.form__name')
const formHobby = document.querySelector('.form__hobby')
const formBtnSubmit = document.querySelector('.form__btn-submit')
const profileName = document.querySelector('.profile__name')
const profileHobby = document.querySelector('.profile__hobby')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')


function setProfileData() {
  formName.value = profileName.textContent
  formHobby.value = profileHobby.textContent
}

function openPopUp() {
  popUp.classList.add("pop-up_opened")
  setProfileData()
}

profileEditBtn.addEventListener('click', openPopUp)

function closePopUp() {
  popUp.classList.remove("pop-up_opened") 
}

popUpBtnClose.addEventListener('click', closePopUp)

function setFormSubmitData(e) {
  e.preventDefault()
  profileName.textContent = formName.value
  profileHobby.textContent = formHobby.value
  closePopUp()
}

form.addEventListener('submit', setFormSubmitData)