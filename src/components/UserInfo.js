export default class UserInfo {
  constructor( selectorName, selectorAbout ) {
    this._selectorName = document.querySelector(selectorName)
    this._selectorAbout = document.querySelector(selectorAbout)
  }

  getUserInfo() {
    const userInfo = {}
    userInfo.name = this._selectorName.textContent
    userInfo.about = this._selectorAbout.textContent
    return userInfo
  }

  setUserInfo(name, about) {
    this._selectorName.textContent = name
    this._selectorAbout.textContent = about
  }
}