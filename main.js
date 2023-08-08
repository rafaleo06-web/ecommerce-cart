const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");

const closeCart = document.getElementById("close-cart");

const cartContent = document.querySelector(".cart-content");

const addCartIcons = document.querySelectorAll(".add-cart");

const totalPrice = document.querySelector(".total-price");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

function addProduct() {
  addCartIcons.forEach((addCartIcon) => {
    addCartIcon.addEventListener("click", (e) => {
      const productBox = e.target.parentNode;
      const productImg = productBox.querySelector(".product-img");
      const productTitle = productBox.querySelector(".product-title");
      const price = productBox.querySelector(".price");

      const data = {
        imgSrc: productImg.getAttribute("src"),
        title: productTitle.textContent,
        price: price.textContent,
      };

      const template = `
      <div class="cart-box">
        <img src="${data.imgSrc}" alt="" class="cart-img" />
        <div class="detail-box">
          <div class="cart-product-title">${data.title}</div>
          <div class="cart-price" data-base-price="${parseInt(data.price.substring(1))}">${data.price}</div>
          <input type="number" class="cart-quantity" value="1" min="1" />
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
      </div>`;

      cartContent.insertAdjacentHTML("afterbegin", template);
      updatePriceTotal();
      deleteProduct();
      changeCartQuantity();
    });
  });
}

function deleteProduct() {
  const cartRemove = document.querySelector(".cart-remove");
  cartRemove.addEventListener("click", (e) => {
    e.target.parentElement.innerHTML = "";
    updatePriceTotal();
  });
}

function changeCartQuantity() {
  const cartQuantityInputs = document.querySelectorAll(".cart-quantity");
  cartQuantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const productBox = e.target.parentNode;
      const priceDiv = productBox.querySelector(".cart-price");
      const basePrice = parseInt(priceDiv.getAttribute("data-base-price"));
      console.log(basePrice);
      const updateCartPrice = e.target.value * basePrice;
      priceDiv.innerHTML = `$${updateCartPrice}`;
      updatePriceTotal();
    });
  });
}

function updatePriceTotal() {
  const cartPrice = document.querySelectorAll(".cart-price");

  let total = 0;
  cartPrice.forEach((box) => {
    const priceDiv = box.innerHTML;
    const priceNumber = parseInt(priceDiv.substring(1));
    total += priceNumber;
  });
  totalPrice.innerHTML = total;
}

addProduct();
