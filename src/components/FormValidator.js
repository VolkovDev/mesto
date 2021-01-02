export class FormValidator { 
  constructor(data, formSelector) { 
    this._formSelector = document.querySelector(formSelector) 
    this._inputSelector = data.inputSelector 
    this._submitButtonSelector = data.submitButtonSelector 
    this._inactiveButtonClass = data.inactiveButtonClass 
    this._inputErrorClass = data.inputErrorClass, 
    this._errorClass = data.errorClass 
  } 
 
  // Отображение информации об ошибки ввода 
  _showInputError(inputElement) { 
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`) 
    errorElement.textContent = inputElement.validationMessage 
    inputElement.classList.add(this._errorClass) 
  } 
 
  // Скрытие информации об ошибки ввода 
  _hideInputError(inputElement) { 
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`) 
    errorElement.textContent = '' 
    inputElement.classList.remove(this._errorClass) 
  } 
 
  // Проверка всех полей инпут на валидность 
  _checkInputValidity(inputElement) { 
    inputElement.setCustomValidity('') 
    if (!inputElement.validity.valid) { 
      this._showInputError(inputElement) 
    } else { 
      this._hideInputError(inputElement) 
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
  _setEventListeners(submitButton) { 
    const inputList = this._formSelector.querySelectorAll(this._inputSelector) 
    inputList.forEach((inputElement) => { 
      inputElement.addEventListener('input', () => { 
        this._checkInputValidity(inputElement) 
        this._toggleButtonState(submitButton, this._formSelector.checkValidity()) 
      }) 
    }) 
  } 
 
  //Очистка ошибок iput 

clearErrors = () => { 
  this._formSelector.querySelectorAll(this._inputErrorClass).forEach((span) => { 
    span.textContent = '' 
  }) 
  this._formSelector.querySelectorAll(this._inputSelector).forEach((input) => { 
    input.classList.remove(this._errorClass) 
  }) 
  this._formSelector.querySelectorAll(this._inactiveButtonClass).forEach((button) => { 
    button.setAttribute('disabled', true) 
  }) 
} 
 
  enableValidation() { 
      const submitButton = this._formSelector.querySelector(this._submitButtonSelector) 
      this._setEventListeners(submitButton) 
      this._formSelector.addEventListener('submit', (evt) => { 
        evt.preventDefault() 
      }) 
      this._toggleButtonState(submitButton, this._formSelector.checkValidity()) 
    } 
 
} 

// clearErrors = () => {
//   this._formSelector.querySelectorAll(this._formInputError).forEach((span) => {
//     span.textContent = ''
//   })
//   this._formSelector.querySelectorAll(this._inputSelector).forEach((input) => {
//     input.classList.remove(this._errorClass)
//   })
//   this._formSelector.querySelectorAll(this._inactiveButtonClass).forEach((button) => {
//     button.setAttribute('disabled', true)
//   })
// }