export const popUpImageImg = document.querySelector('.pop-up__img')
export const popUpImageDescription = document.querySelector('.pop-up__description')
export const popUpImageZoom = document.querySelector('.pop-up_type_image-zoom')
export const popUpBtnClose = document.querySelector('.pop-up__btn-close_type_image-zoom')
export const popUpAddCard = document.querySelector('.pop-up_type_add-card')
export const popUpProfile = document.querySelector('.pop-up_type_profile')

// Открытие попап
export const openPopUp = (popup) => {
  popup.classList.add('pop-up_opened')
  document.addEventListener('keydown', closePopUpEsc)
  popup.addEventListener('click', closePopUpClickByOverlayOrBtn)
}

// Закрытие попап
export const closePopUp = (popup) => {
  popup.classList.remove('pop-up_opened')
  document.removeEventListener('keydown', closePopUpEsc)
  popup.removeEventListener('click', closePopUpClickByOverlayOrBtn)

}

// Закрытие попапов по нажатию на клавишу ESC, переделанная функция
export const closePopUpEsc = (e) => {
  if (e.key === 'Escape') {
    const popUpOpened = document.querySelector('.pop-up_opened')
    closePopUp(popUpOpened)
  }
}

// Закрытие попап по клику на оверлей или кнопку закрытия
export const closePopUpClickByOverlayOrBtn = (e) => {
  if (e.target.classList.contains('pop-up__btn-close') || e.target.classList.contains('pop-up')) {
    const popUpActive = e.target.closest('.pop-up')
    closePopUp(popUpActive)
  }
}
