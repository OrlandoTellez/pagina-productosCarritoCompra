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
      this.inputCantidad = shadow.querySelector('.cantidad'); 
      this.addButton = shadow.querySelector('.add-to-cart'); 
    

      this.img.src = this.getAttribute('imgSrc');
      this.titulo.innerText = this.getAttribute('titulo');
      this.precio.innerText = this.getAttribute('precio');
    
      this.addButton.addEventListener('click', () => this.handleInput());
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

    handleInput() {
      if (!this.inputCantidad) {
        console.error('El campo de cantidad no existe.');
        return;
      }
    
      const cantidad = parseInt(this.inputCantidad.value);
    
      if (isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor, ingresa una cantidad válida.');
        return;
      }
    
      const product = {
        titulo: this.getAttribute('titulo'),
        precio: this.getAttribute('precio'),
        cantidad: cantidad,
        imgSrc: this.getAttribute('imgSrc'),
      };
    
      this.dispatchEvent(
        new CustomEvent('agregar-carrito', {
          detail: product,
          bubbles: true,
          composed: true,
        })
      );
    }
  
    async getTemplate() {
        const file = await fetch("components/tarjetas.html")
        const template = await file.text()
        return template
    }
  }


customElements.define("tarjetas-component", Tarjetas);



