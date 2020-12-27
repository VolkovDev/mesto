import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor( containerPopupSelector, { handleFormSubmit } ) {
    super(containerPopupSelector)
    this._handleFormSubmit = handleFormSubmit;
  }


  _getInputValues() {
    this._inputList = Array.from( 
    this.containerPopupSelector
    .querySelectorAll('.pop-up__form-input'));
    this._formValues = {};
    this._inputList.forEach(
      input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }


  setEventListeners(btnClosePopupSelector, popUpFormSelector) {
    super.setEventListeners(btnClosePopupSelector)
    this._formItem = this._containerPopup.querySelector(popUpFormSelector)
    this._formItem.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleFormSubmit(this._getInputValues)
      this.close()
    })
  }

  close() {
    super.close()
    this._formItem.reset()
    this._formItem
      .querySelectorAll('.pop-up__form-input-error')
      .forEach((item) => item.textContent = '')
    this._formItem.querySelectorAll('.pop-up__form-input')
    .forEach((item) => {
      item.classList.remove('pop-up__form-input_type_invalid')
    })
  }
}