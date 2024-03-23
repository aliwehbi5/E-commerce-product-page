const otherImgs = document.querySelectorAll("section .other-imgs img");
const mainImg = document.querySelector(".main-img");
const linksUl = document.querySelector("ul.links");
const showImgs = document.querySelector(".show-imgs");
const mainInput = document.querySelector(".main-input");
const priceTag = document.querySelector("span.price");
const addToCard = document.querySelector(".add-to-card");
const cartDiv = document.querySelector(".cart-div");
const productPrice = 125;

otherImgs.forEach((img, index) => {
  img.addEventListener("click", () => {
    otherImgs.forEach((img) => {
      img.classList.remove("active");
    });
    img.classList.add("active");
    mainImg.classList.add("hidden");
    mainImg.src = `https://byronbyron.github.io/ecommerce-product-page/images/image-product-${
      index + 1
    }.webp`;
    setTimeout(() => {
      mainImg.classList.remove("hidden");
    }, 100);
  });
});

mainInput.addEventListener("input", () => {
  UpdatePrice(+mainInput.value);
});

addToCard.addEventListener("click", () => {
  if (mainInput.value > 0) {
    const products = cartDiv.querySelector(".products");
    const checkBtn = document.createElement("button");
    checkBtn.className = "check";
    checkBtn.textContent = "Checkout";
    if (!products.querySelector(".product")) {
      products.textContent = "";
    }
    const product = document.createElement("div");
    product.className = "product";
    const info = document.createElement("div");
    info.className = "info";
    const img = document.createElement("img");
    img.className = "product-img";
    img.src = mainImg.src;
    const details = document.createElement("div");
    details.className = "details";
    const productName = document.createElement("h4");
    productName.className = "product-name";
    productName.textContent = "Autumn Limited";
    const para = document.createElement("p");
    para.innerHTML = `<span class="product-amount">$${productPrice.toFixed(
      2
    )} x ${mainInput.value}</span> <b>${priceTag.textContent}</b>`;
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    products.appendChild(product);
    product.appendChild(info);
    info.appendChild(img);
    info.appendChild(details);
    details.appendChild(productName);
    details.appendChild(para);
    info.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      deleteProduct(product);
    });
    if (products.querySelector(".check")) {
      products.removeChild(products.querySelector(".check"));
    }
    products.appendChild(checkBtn);
  }
  document.querySelector("span.count").style.display = "block";
  +document.querySelector("span.count").textContent++;
  mainInput.value = 1;
  UpdatePrice(mainInput.value);
  cartDiv.classList.remove("shown");
});

function closeMenu() {
  linksUl.classList.remove("shown");
  document.body.classList.remove("poped");
}

function openMenu() {
  linksUl.classList.add("shown");
  document.body.classList.add("poped");
}

function nextImg(btn) {
  let showImg = btn.previousElementSibling;
  showImg.dataset.index = +showImg.dataset.index + 1;
  if (showImg.dataset.index > 4) {
    showImg.dataset.index = 1;
  }
  showImg.classList.add("hidden");
  showImg.src = `https://byronbyron.github.io/ecommerce-product-page/images/image-product-${showImg.dataset.index}.webp`;
  setTimeout(() => {
    showImg.classList.remove("hidden");
  }, 100);
}

function perviousImg(btn) {
  let showImg = btn.nextElementSibling;
  showImg.dataset.index = +showImg.dataset.index - 1;
  if (showImg.dataset.index < 1) {
    showImg.dataset.index = 4;
  }
  showImg.classList.add("hidden");
  showImg.src = `https://byronbyron.github.io/ecommerce-product-page/images/image-product-${showImg.dataset.index}.webp`;
  setTimeout(() => {
    showImg.classList.remove("hidden");
  }, 100);
}

function toggleImg() {
  showImgs.classList.toggle("shown-imgs");
  document.body.classList.toggle("poped-imgs");
}

function addItems() {
  mainInput.textContent = +mainInput.value++;
  UpdatePrice(+mainInput.value);
}

function removeItems() {
  if (mainInput.value > 0) {
    mainInput.textContent = +mainInput.value--;
  }
  UpdatePrice(+mainInput.value);
}

function UpdatePrice(amount) {
  const price = amount * productPrice;
  priceTag.textContent = "$" + price.toFixed(2);
}

function toggleCard() {
  cartDiv.classList.toggle("shown");
}

function deleteProduct(ele) {
  ele.remove();
  document.querySelector("span.count").textContent--;
  if (document.querySelector("span.count").textContent == 0) {
    document.querySelector("span.count").style.display = "none";
    const products = cartDiv.querySelector(".products");
    products.innerHTML = "<h2>Your cart is empty.</h2>";
  }
}
