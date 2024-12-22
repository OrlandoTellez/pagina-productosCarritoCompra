class Tarjetas extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
      return ['imgSrc', 'titulo', 'precio'];
    }
  
    async connectedCallback() {
      const shadow = this.shadowRoot;
      shadow.innerHTML = await this.getTemplate();

      this.img = shadow.querySelector('img');
      this.titulo = shadow.querySelector('h3');
      this.precio = shadow.querySelector('p');

      this.img.src = this.getAttribute('imgSrc');
      this.titulo.innerText = this.getAttribute('titulo');
      this.precio.innerText = this.getAttribute('precio');
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'imgSrc':
          if (this.img) this.img.src = newValue;
          break;
        case 'titulo':
          if (this.titulo) this.titulo.innerText = newValue;
          break;
        case 'precio':
          if (this.precio) this.precio.innerText = newValue;
          break;
        default:
          break;
      }
    }
  
    async getTemplate() {
        const file = await fetch("../components/tarjetas.html")
        const template = await file.text()
        return template
    }
  }


customElements.define("tarjetas-component", Tarjetas);





