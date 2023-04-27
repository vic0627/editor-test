class create {
  constructor({
    tag = "div",
    attrs = {},
    style = "",
    events = [],
    innerText = "",
  }) {
    this.el = this.create(tag);
    if (attrs) {
      this.setAttrs(attrs);
    }
    if (events) {
      this.on(events);
    }
    if (style) {
      this.style(style);
    }
    if (innerText) {
      this.text(innerText);
    }
  }
  create(tag) {
    return document.createElement(tag);
  }
  setAttrs(attrs) {
    Object.keys(attrs).forEach((attr) => {
      this.el.setAttribute(attr, attrs[attr]);
    });
    return this;
  }
  on(events) {
    events.forEach((e) => {
      this.el.addEventListener(e.type, e.handler);
    });
    return this;
  }
  style(style) {
    this.el.style = style;
    return this;
  }
  text(innerText) {
    this.el.innerText = innerText;
    return this;
  }
  add(child) {
    if (child instanceof create) {
      this.el.appendChild(child.el);
    } else {
      this.el.appendChild(child);
    }
    return this;
  }
  addTo(parent) {
    if (parent instanceof create) {
      parent.el.appendChild(this.el);
    } else {
      parent.appendChild(this.el);
    }
    return this;
  }
}

export const createDOM = ({
  tag = "div",
  attrs = {},
  style = "",
  events = [],
  innerText = "",
}) => new create({ tag, attrs, style, events, innerText });
