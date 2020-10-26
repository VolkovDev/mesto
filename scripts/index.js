const popUp = document.querySelector('.pop-up')
const popUpBtnClose = document.querySelector('.pop-up__btn-close')
const form = document.querySelector('.pop-up__form')
const formName = document.querySelector('.pop-up__form-input_type_name')
const formHobby = document.querySelector('.pop-up__form-input_type_hobby')
const formBtnSubmit = document.querySelector('.pop-up__form-btn-submit')
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

function closePopUp() {
  popUp.classList.remove("pop-up_opened") 
}

function setFormSubmitData(e) {
  e.preventDefault()
  profileName.textContent = formName.value
  profileHobby.textContent = formHobby.value
  closePopUp()
}

profileEditBtn.addEventListener('click', openPopUp)
popUpBtnClose.addEventListener('click', closePopUp)
form.addEventListener('submit', setFormSubmitData)