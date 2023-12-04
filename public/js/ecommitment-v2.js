(function () {
  
  //GLOBALS
  const store_id = LS.store.id
  const product_id = window.localStorage.getItem('Ecommitment-product_id');
  const variant_id = window.localStorage.getItem('Ecommitment-variant_id');

  console.log("store_id: " + store_id)
  console.log("product_id: " + product_id)
  console.log("variant_id: " + variant_id)

  //FLUJOS DENTRO DEL JAVASCRIPT

  //VALIDAR QUE EL BONO AMBIENTAL EXISTA EN PRODUCTOS. SI NO EXISTE, CREAR EL PRODUCTO. SINO DEVOLVER ESE DATO

  //ESTO SE PUEDE HACER EN EL PASO ANTERIOR AL CHECKOUT. 

  //MOSTRAR EL BONO AMBIENTAL EN ESE CHECKOUT (EL BONO AMBIENTAL PUEDE SER UNA IMAGEN O MEJORA DEL CHECKOUT)




  // Your JavaScript
  let switchCheckbox = document.getElementById('ecomm-mainSwitch');
  let infoButton = document.getElementById('ecomm-infoButton');
  let infoClose = document.getElementById('ecomm-infoClose');
  let buttons = document.querySelectorAll('.select-button');
  let total_amount = document.getElementById("ecomm-total-amount")
  //OBTENER INFO DEL SHIPPING Y CALCULAR DISTANCIA Y DEVOLVER EL environmentAmount


  function openModal() {
    var modal = document.getElementById("ecomm-infoModal");
    modal.style.display = "block";

    // Add event listener to close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  function closeModal() {
    var modal = document.getElementById("ecomm-infoModal");
    modal.style.display = "none";
  }


  function showEnvironmentDiv(environmentAmount, distance, co2, text, active_quantity) {

    var newDiv = document.createElement('div');

    // Set the HTML content of the subtotalDiv using innerHTML
    newDiv.innerHTML = `

    <div class="ecomm-container">
    <div class="switch-container">
      <!-- Rounded switch -->
      <div style="display: flex;">
        <div class="ecomm-switch-logo">
          <img class="ecomm-logo" src="https://juanseferrari.github.io/ecommitment/public/images/logo_transparente.png" alt="">
        </div>
      </div>
      <div style="display: flex;">
        <div class="info-container">
          <div class="info-icon" id="ecomm-infoButton">
            <svg class="info-icon-svg" xmlns="http://www.w3.org/2000/svg" height="16" width="16"
              viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          </div>
        </div>

        <div class="modal" id="ecomm-infoModal">
          <div class="modal-content">
            <span class="close-btn" id="ecomm-infoClose">&times;</span>
            <p>This is the information you want to display in the modal.</p>
          </div>
        </div>
      </div>
      <!-- Description -->
    </div>
    <div class="ecomm-description-container">
      <p>
        <span>Compra con impacto2:</span> Convierte tu compra en un compromiso ecológico adicional. ${text}
      </p>
    </div>
    <div class="ecomm-midtext-container">
      <div class="ecomm-midtext-left">
        <p>🚚 Distancia envío: ${distance} km</p>
        <p>💨 CO2 emitidos: ${co2} ppm</p>
        <p>💨 Cant bonos: ${environmentAmount} ppm</p>
        <p>💵 Costo Bono: $10</p>
        <p>💵 active_quantity: ${active_quantity}</p>

      </div>
      <div class="ecomm-midtext-right">
        <h1 id="ecomm-total-amount">Total: $ ${environmentAmount * 10}</h1>
      </div>

    </div>
    <div class="ecomm-bottom-container">
      <div class="button-container">
        <button class="select-button ${active_quantity === 0 ? 'active': ''}" data-value="0">0x</button>
        <button class="select-button ${active_quantity === 0.5 ? 'active': ''}" data-value="0.5">0.5x</button>
        <button class="select-button ${active_quantity === 1 ? 'active': ''}" data-value="1">1x</button>
        <button class="select-button ${active_quantity === 2 ? 'active': ''}" data-value="2">2x</button>
        <button class="select-button ${active_quantity === 4 ? 'active': ''}" data-value="4">4x</button>
      </div>

    </div>
  </div>

        `;


    // Create a style element
    var style = document.createElement('style');

    // Set the CSS rules as text content
    style.textContent = `
    .ecomm-container {
      margin: 20px 0;
      border: 1px solid rgba(67,67,67,0.3);
      padding: 10px;
      background-color: rgba(255, 255, 255, 1);
      display: block;
    }
  
    .ecomm-description-container {
      width: 100%;
    }
  
    .ecomm-description-container p {
      font-size: 20px;
    }
  
    .ecomm-description-container span {
      font-weight: bold;
    }
  
    .ecomm-midtext-container {
      display: flex;
      justify-content: space-between;
    }
    .ecomm-midtext-right {
      display: flex;
      align-items: center;
    }
  
    .ecomm-switch-logo {
      height: 34px;
    }
  
    .ecomm-logo {
      height: 34px;
    }
  
    .switch-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 34px;
    }
  
  
    .ecomm-switch-logo {
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
  
    .switch-amount {
      display: flex;
      align-items: center;
    }
  
    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
      transition: background-color 0.4s;
    }
  
    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      /* Bootstrap-like box shadow */
  
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
  
    input:checked+.slider {
      background-color: #34a77c;
    }
  
    input:focus+.slider {
      box-shadow: 0 0 1px #2196F3;
    }
  
    input:checked+.slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
  
    .slider.round:before {
      border-radius: 50%;
      background-position: center;
      background-size: cover;
      background-image: url(https://juanseferrari.github.io/ecommitment/public/images/earth.svg);
      background-repeat: no-repeat;
      background-color: rgba(255, 0, 0, 0);
      filter: invert(100%)
        /* Para hacer el mundo negro, lo podemos hacer con esto. */
    }
    
    .info-container {
      position: relative;
    }
  
    .info-icon {
      font-size: 24px;
      color: blue;
      cursor: pointer;
    }
  
    .info-icon-svg {
      height: 34px;
      width: 24px;
      fill: #2196F3;
    }
  
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  
    .modal-content {
      border-radius: 16px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease, transform 0.3s ease;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  
    .modal.active {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      transition: all 1s ease;
  
    }
  
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      cursor: pointer;
    }


    /** BUTTON CSS */

.button-container {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin-left: 10%;
}

.select-button {
  padding: 10px 30px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 16px;
}

.select-button.active {
  background-color: #34a77c; /* Change to your desired active color */
  color: #fff; /* Change to your desired text color when active */
}

@media only screen and (max-width: 767px) {
  /* Your mobile-specific styles go here */
  .select-button {
    padding: 10px 15px;
   
  }
}
           `;

    // Append the style element to the document's head
    //background-image: url('https://juanseferrari.github.io/ecommitment/public/images/earth.svg');


    var reviewDiv4 = document.querySelector('.panel.panel-with-header');

    reviewDiv4.insertAdjacentElement('beforebegin', newDiv);



    document.head.appendChild(style);
    switchCheckbox = document.getElementById('ecomm-mainSwitch');
    infoButton = document.getElementById('ecomm-infoButton');
    infoClose = document.getElementById('ecomm-infoClose');
    buttons = document.querySelectorAll('.select-button');
    total_amount = document.getElementById("ecomm-total-amount")
  } //End function add EnvironmentDivv2

  function addProductToCart(product_id,variant_id,quantity) {
    console.log("addProductToCart")
    if (LS.cart.items) {
      console.log("LSproduct")
      //datos hardocodeados, esto deberia ser dinamico por cada usuario despues. 
      //aplicar la lógica del store_id
      const data = new URLSearchParams();
      data.append('add_to_cart', product_id); //product_id
      data.append('variant_id', variant_id); //variant_id
      data.append('quantity', quantity); //quantity

      fetch('/comprar/', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          if (response.ok) {
            console.log('success');
          } else {
            console.log('error');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });


    }
  }


  async function updateUniqueProductFromCart(quantity,vid) {
    let items_on_cart = LS.cart.items
    console.log("items_on_cart")
    console.log(items_on_cart)
    console.log("items_on_cart")

    var result = items_on_cart.filter(obj => {
      return obj.variant_id == vid
    })
    console.log("result")
    console.log(result)
    console.log("result")
    if (result.length === 1) {

      //Existe un solo SKU
      console.log("EXISTE UN SOLO SKU con variant_id")

      let item_id = result[0].id.toString()
      console.log("item_id")
      console.log(item_id)
      console.log("item_id")

      let body = new URLSearchParams();
      body.append(`quantity[${item_id}]`, quantity.toString());

      console.log("Request Body:", body.toString());


      await fetch("/cart/update/", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("success remove cart");
            console.log(response)
            reloadPageAfterDelay()
          } else {
            console.log("error remove cart");
            console.log(response)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          reloadPageAfterDelay()
        });

    }

  }


  // Wait for 1 second (1000 milliseconds) and then reload the page
  function reloadPageAfterDelay() {
    setTimeout(function () {
      // Reload the page after 1 second1
      window.location.reload();
    }, 200); // 1000 milliseconds = 1 second
    switchCheckbox.checked = true;
    console.log("checked")
  }



  //NEW CHATGPT FUNCTION

  async function calculator(cart_data, store_data) {
    console.log("calculator");

    try {
      console.log(cart_data);
      console.log(store_data);

      let body = JSON.stringify({
        cart: cart_data,
        store: store_data
      });

      const response = await fetch('https://ecommitment-634117e74352.herokuapp.com/api/calculator', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return null;
      }

      const data = await response.json();

      // Log the calculator_response within the async function
      console.log('Parsed JSON data:', data);

      // If you need to return the data from this function, you can do so here
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  async function performCalculation() {

    try {
      let calculator_response = await calculator(LS.cart, LS.store);

      return calculator_response;
    } catch (error) {
      console.error('Error during calculation:', error);
      return null;
    }
  }

  async function getProductData(store_id) {
    console.log("getProductData");

    try {
      console.log(store_id);

      const response = await fetch('https://ecommitment-634117e74352.herokuapp.com/api/product-data?store_id='+store_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return null;
      }

      const data = await response.json();

      // Log the calculator_response within the async function
      console.log('Parsed product JSON data:', data);

      // If you need to return the data from this function, you can do so here
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }


  //Check pathname
  console.log(window.location.pathname)

  if(!product_id && !variant_id){
    //get info of product
    getProductData(store_id).then((product_data) => {
      console.log("product_data")
      console.log(product_data)
      console.log("product_data")
      window.localStorage.setItem('Ecommitment-product_id', product_data.product_id);
      window.localStorage.setItem('Ecommitment-variant_id', product_data.variant_id);

    });
  }

  // Check the current URL path
  if (window.location.pathname.startsWith('/checkout/v3/next/')) {
    console.log("next path")


    //Obtener la data de la calculadora
    performCalculation().then((calculation_response) => {
      console.log("calculation_response")
      console.log(calculation_response)
      console.log("calculation_response")

      let message = ""
      let qty = calculation_response.quantity

      //Validar si tiene el producto en el carrito. Si no lo tiene, crearlo y refrescar. Si lo tiene, mostrar el div. 
      let bono_exists = false
      let bono_item = {}
      for (let p = 0; p < LS.cart.items.length; p++) {
        if (LS.cart.items[p].variant_id == window.localStorage.getItem('Ecommitment-variant_id')) {
          console.log("variant " + window.localStorage.getItem('Ecommitment-variant_id') + " existe")
          bono_exists = true
          bono_item = LS.cart.items[p] 
        }
      }
      console.log("bono_item")
      console.log(bono_item)
      console.log("bono_item")

      //Validar el address
      if(!LS.cart.shippingAddress.address){
        //Si no hay address de destino (osea no hay nada que pagar, hacer otra cosa. )
           console.log("NO TIENE ADDRESS")
           message = "No hay emisiones en este pedido. "
      } else {
           console.log("TIENE ADDRESS")
           message = "Tiene emisiones, texto variable."
      }

      if(bono_exists){
        console.log("bono_exists")
        let new_quantity = bono_item.quantity / qty
        console.log("new_quantity")
        console.log(new_quantity)
        console.log("new_quantity")
        showEnvironmentDiv(qty, calculation_response.co2_emitted, message, new_quantity)
      } else {
        if(qty !== 0){
          addProductToCart(product_id,variant_id,qty)
          reloadPageAfterDelay();
        } else {
          showEnvironmentDiv(qty, calculation_response.co2_emitted, message, 0)
        }

      }

        buttons.forEach(button => {
          button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
      
            const selectedValue = this.getAttribute('data-value');
            console.log(`Selected value: ${selectedValue}`);
            total_amount.textContent = "Total: $" + (10 * selectedValue * qty)
            updateUniqueProductFromCart((qty * selectedValue), variant_id)
          });
        });
      

      infoButton.addEventListener('click', function () {
        openModal()
      })
      infoClose.addEventListener('click', function () {
        closeModal()
      })


    })





  } else {
    console.log("start path")




  }

  console.log("LS")
  console.log(LS)
  console.log("LS")
  console.log("CART ITEMS")
  console.log(LS.cart.items)
  console.log("CART ITEMS")
  console.log("CART SHIPPING ADDRESS")
  console.log(LS.cart.shippingAddress)
  console.log("CART SHIPPING ADDRESS")
  console.log("CART SUBTOTAL")
  console.log(LS.cart.subtotal)
  console.log("CART SUBTOTAL")
  console.log("CART CONTACT")
  console.log(LS.cart.contact)
  console.log("CART CONTACT")


})();