

class Tarjetas extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    async connectedCallback() {
      this.shadowRoot.innerHTML = await this.getTemplate();
    }
  
    async getTemplate() {
        const file = await fetch("../components/tarjetas.html")
        const template = await file.text()
        return template
    }
  }


customElements.define("tarjetas-component", Tarjetas);





