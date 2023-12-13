const overlay = document.querySelector(".overlay");
const iconCart = document.querySelector(".icon-cart");
const body = document.querySelector(".cartTab");
const closeBtn = document.querySelector(".close");
const listProductsHTML = document.querySelector(".listProduct");
const listCartHTML = document.querySelector(".listCart");
const iconCartSpan = document.querySelector(".icon-cart span");
let listProducts = [];
let carts = [];
//////////////////////////////////////////////////////////////////////////////////////
overlay.addEventListener("click", () => {
  overlay.classList.remove("show");
  body.classList.remove("showCart");

});
iconCart.addEventListener("click", (e) => {
  body.classList.toggle("showCart");
  overlay.classList.add("show");
});
closeBtn.addEventListener("click", (e) => {
  body.classList.remove("showCart");
  overlay.classList.remove("show");
});
const addDataToHTML = () => {
  listProductsHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      listProductsHTML.insertAdjacentHTML(
        "beforeend",
        `
      <div class="item" data-id=${product.id}>
          <img src=${product.image} alt="">
          <h2>${product.name}</h2>
          <div class="price">$${product.price}</div>
          <button class="addCart">
            Add to Cart
          </button>
      </div>
      `
      );
    });
  }
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity += cart.quantity;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.productId
      );
      let info = listProducts[positionProduct];
      listCartHTML.insertAdjacentHTML(
        "beforeend",
        `
      <div class="item" data-id=${info.id}>
          <div class="image">
                <img src="${info.image}">
          </div>
          <div class="name">
              ${info.name}
          </div>
          <div class="totalPrice">$${info.price * cart.quantity}</div>
          <div class="quantity">
            <span class="minus"><</span>
            <span>${cart.quantity}</span>
            <span class="plus">></span>
          </div>
      </div>
      `
      );
    });
  }
  iconCartSpan.innerText = totalQuantity;
};
const addToCart = (id) => {
  let indexProdInCart = carts.findIndex((val) => val.productId === id);
  if (carts.length === 0) {
    carts = [
      {
        productId: id,
        quantity: 1,
      },
    ];
  } else if (indexProdInCart < 0) {
    carts.push({
      productId: id,
      quantity: 1,
    });
  } else carts[indexProdInCart].quantity++;
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};
const changeQuantityCart = (id, type) => {
  let positionItemInCart = carts.findIndex((value) => value.productId == id);
  if (positionItemInCart > -1) {
    if (type === "plus")
      carts[positionItemInCart].quantity =
        carts[positionItemInCart].quantity + 1;
    else if (type === "minus") {
      let changeQuantity = carts[positionItemInCart].quantity - 1;
      if (changeQuantity > 0) {
        carts[positionItemInCart].quantity = changeQuantity;
      } else {
        carts.splice(positionItemInCart, 1);
      }
    }
    addCartToHTML();
    addCartToMemory();
  }
};
listProductsHTML.addEventListener("click", (e) => {
  if (e.target.classList.contains("addCart"))
    addToCart(e.target.parentElement.dataset.id);
});
listCartHTML.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("minus") ||
    e.target.classList.contains("plus")
  ) {
    let id = e.target.closest(".item").dataset.id;
    let type = e.target.classList.contains("plus") ? "plus" : "minus";
    changeQuantityCart(id, type);
  }
});

const init = () => {
  fetch("product.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      listProducts = data;
      addDataToHTML(data);
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
document.querySelector(".btns-grid").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-grid")) {
    if (e.target.classList.contains("grid-2")) {
      listProductsHTML.className = "listProduct";
      listProductsHTML.classList.add("grid-2");
    } else if (e.target.classList.contains("grid-3")) {
      listProductsHTML.className = "listProduct";
      listProductsHTML.classList.add("grid-3");
    } else if (e.target.classList.contains("grid-4")) {
      listProductsHTML.className = "listProduct";
      listProductsHTML.classList.add("grid-4");
    }
    else if (e.target.classList.contains("grid-5")) {
      listProductsHTML.className = "listProduct";
      listProductsHTML.classList.add("grid-5");
    }
  }
});
init();
console.log(listProducts);
//////////////////////////////////////////////////////////////////
