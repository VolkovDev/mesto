export class FormValidator {
  constructor(data, formSelector) {
    this._formSelector = formSelector
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inactiveButtonClass = data.inactiveButtonClass
    // inputErrorClass: 'pop-up__form-input-error',
    this._errorClass = data.errorClass
  }

  // Отображение информации об ошибки ввода
  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = inputElement.validationMessage
    inputElement.classList.add(this._errorClass)
  }

  // Скрытие информации об ошибки ввода
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = ''
    inputElement.classList.remove(this._errorClass)
  }

  // Проверка всех полей инпут на валидность
  _checkInputValidity(formElement, inputElement) {
    inputElement.setCustomValidity('')
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement)
    } else {
      this._hideInputError(formElement, inputElement)
    }
  }

  // Переключение состояния кнопки в зависимости от валидности форм
  _toggleButtonState(buttonElement, isActive) {
    if (isActive) {
      buttonElement.classList.remove(this._inactiveButtonClass)
      buttonElement.disabled = false
    } else {
      buttonElement.classList.add(this._inactiveButtonClass)
      buttonElement.disabled = true
    }
  }

  // Установка слушателей для всем элементов инпут
  _setEventListeners(formElement, submitButton) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector))
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement)
        this._toggleButtonState(submitButton, formElement.checkValidity())
      })
    })
  }

  //Очистка ошибок iput
clearErrors = (popup) => {
  popup.querySelectorAll('.pop-up__form-input-error').forEach((span) => {
    span.textContent = ''
  })
  popup.querySelectorAll('.pop-up__form-input').forEach((input) => {
    input.classList.remove('pop-up__form-input_type_invalid')
  })
  popup.querySelectorAll('.pop-up__form-btn-submit').forEach((button) => {
    button.setAttribute('disabled', true)
  })
}

  enableValidation() {
      const formElement = document.querySelector(this._formSelector);
      const submitButton = formElement.querySelector(this._submitButtonSelector)
      this._setEventListeners(formElement, submitButton)
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })
      this._toggleButtonState(submitButton, formElement.checkValidity())
    }

}