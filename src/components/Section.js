export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  renderer() {
    this._items.forEach(item => this._renderer(item))
  }

  addItem(el) {
    this._container.append(el)
  }

  prependItem(el) {
    this._container.prepend(el);
  }
}