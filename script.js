const cart = {
    items: [],
    addItem(product) {
      const existingProduct = this.items.find((item) => item.titulo === product.titulo);
  
      if (existingProduct) {
        existingProduct.cantidad += product.cantidad;
      } else {
        this.items.push(product);
      }
  
      this.updateCartUI();
    },

    updateCartUI() {
      const cartContainer = document.querySelector('.cart .figure-cart-image');
      const cartTitle = document.querySelector('.cart h1 span');
  
      if (this.items.length === 0) {
        cartContainer.innerHTML = `
          <img src="/assets/images/illustration-empty-cart.svg" alt="">
          <p>Your added items will appear here</p>
        `;
        cartTitle.textContent = `Your cart (0)`;
      } else {
        cartContainer.innerHTML = this.items
          .map(
            (item) => `
          <div class="cart-item">
            <img src="${item.imgSrc}" alt="${item.titulo}" />
            <div>
              <h3>${item.titulo}</h3>
              <p>${item.cantidad} x ${item.precio}</p>
            </div>
          </div>
        `
          )
          .join('');
  
        const totalItems = this.items.reduce((sum, item) => sum + item.cantidad, 0);
        cartTitle.textContent = `Your cart (${totalItems})`;
      }
    },
  };
  
  document.body.addEventListener('agregar-carrito', (event) => {
    cart.addItem(event.detail);
  });


