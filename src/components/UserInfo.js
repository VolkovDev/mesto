export default class UserInfo {
  constructor( {selectorName, selectorAbout, selectorAvatar} ) {
    this._name = document.querySelector(selectorName)
    this._about = document.querySelector(selectorAbout)
    this._avatar = document.querySelector(selectorAvatar)
    this._userId

  }

  getUserInfo() {
    const userInfo = {}
    userInfo.name = this._name.textContent
    userInfo.hobby = this._about.textContent
    userInfo.avatar = this._avatar.src
    userInfo.id = this._userId
    console.log('Получил данные из Профайла UserInfo: ', userInfo)
    return userInfo
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name
    this._about.textContent = about
    this._avatar.src = avatar
    this._avatar.alt = name
    this._userId = _id
  }

  setAvatar(avatarSrc) {
    this._avatar.src = avatarSrc;
    this._avatar.alt = this._name;
  }
}