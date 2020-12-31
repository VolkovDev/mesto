export default class UserInfo {
  constructor( {selectorName, selectorAbout} ) {
    this._name = document.querySelector(selectorName)
    this._about = document.querySelector(selectorAbout)
  }

  getUserInfo() {
    const userInfo = {}
    userInfo.name = this._name.textContent
    userInfo.hobby = this._about.textContent
    console.log('Получил данные из Профайла UserInfo: ', userInfo)
    return userInfo
  }

  setUserInfo(name, hobby) {
    console.log('Установить UserInfo имя: ',name, 'Установить UserInfo хобби: ', hobby)
    this._name.textContent = name
    this._about.textContent = hobby
  }
}