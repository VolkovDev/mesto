import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(containerPopupSelector, { handleFormSubmit }) {
    super(containerPopupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._formItem = this._containerPopup.querySelector('.pop-up__form')
  }


  _getInputValues() {
    console.log(this._inputValues)
    this._inputList =
      this._containerPopup
        .querySelectorAll('.pop-up__form-input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value
    });
    return this._inputValues;

  }


  setEventListeners() {
    super.setEventListeners()
    this._formItem.addEventListener('submit', (e) => {
      console.log('Сработал submit WithForm: ', e)
      e.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._formItem.reset()
  }

  handleBtnForm(textBtn) {
    const btnForm = this._containerPopup.querySelector('.pop-up__form-btn-submit');
    btnForm.textContent = textBtn;
  }
}