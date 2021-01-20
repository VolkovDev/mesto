class Api {
  constructor({ adress, token, }) {
    this._adress = adress
    this._token = token
  }

  getInfoUser() {
    return fetch(`${this._adress}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject
          (`Ошибка ${res.status}`))
  }

  getInitialCards() {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  patchEditProfile( name, about ) {
    return fetch(`${this._adress}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject
          (`Ошибка ${res.status}`))
  }

  postAddNewCard({ name, link }) {
    return fetch(`${this._adress}/cards`, {
      method: 'post',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject
          (`Ошибка ${res.status}`))
  }

  deleteCard( _id ) {
    return fetch(`${this._adress}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject
          (`Ошибка ${res.status}`))
  }

  putHandlerLike( _id ) {
    return fetch(`${this._adress}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject
          (`Ошибка ${res.status}`))
  }

  deleteLike( _id ) {
    return fetch(`${this._adress}/cards/likes/${_id}`, {
      method: 'DELETE ',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject
          (`Ошибка ${res.status}`))
  }

  patchRefreshAvatar( link ) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject
          (`Ошибка ${res.status}`))
  }

}

export default Api