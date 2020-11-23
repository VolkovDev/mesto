// Отображение информации об ошибки ввода
const showInputError = (formElement, inputElement, custom) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = inputElement.validationMessage
  inputElement.classList.add(custom.errorClass)
}

// Скрытие информации об ошибки ввода
const hideInputError = (formElement, inputElement, custom) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = ''
  inputElement.classList.remove(custom.errorClass)
}

// Проверка всех полей инпут на валидность
const checkInputValidity = (formElement, inputElement, custom) => {
  inputElement.setCustomValidity('')
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, custom)
  } else {
    hideInputError(formElement, inputElement, custom)
  }
}

// Переключение состояния кнопки в зависимости от валидности форм
const toggleButtonState = (buttonElement, isActive, custom) => {
  if (isActive) {
    buttonElement.classList.remove(custom.inactiveButtonClass)
    buttonElement.disabled = false
  } else {
    buttonElement.classList.add(custom.inactiveButtonClass)
    buttonElement.disabled = true
  }
}

// Установка слушателей для всем элементов инпут
const setEventListeners = (formElement, custom, submitButton) => {
  const inputList = Array.from(formElement.querySelectorAll(custom.inputSelector))
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, custom)
      toggleButtonState(submitButton, formElement.checkValidity(), custom)
    })
  })
}

const enableValidation = (custom) => {
  const formList = Array.from(document.querySelectorAll(custom.formSelector))
  formList.forEach((formElement) => {
    const submitButton = formElement.querySelector(custom.submitButtonSelector)
    setEventListeners(formElement, custom, submitButton)
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    toggleButtonState(submitButton, formElement.checkValidity(), custom)
  })
}

const validationCustom = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__form-input',
  submitButtonSelector: '.pop-up__form-btn-submit',
  inactiveButtonClass: 'pop-up__form-btn-submit_disabled',
  // inputErrorClass: 'pop-up__form-input-error',
  errorClass: 'pop-up__form-input_type_invalid'
}

enableValidation(validationCustom)