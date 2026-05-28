import blackTshirtUrl from "./assets/black-adhd-army-tshirt.png";
import pinkTshirtUrl from "./assets/pink-adhd-army-tshirt.png";
import signedTshirtUrl from "./assets/signed-adhd-army-tshirt.png";

const products = [
  {
    id: "unisex",
    name: "Tymeless T-Shirt",
    price: 19.99,
    tags: ["Limited drop of 100", "Black or pink"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colours: [
      {
        name: "Black",
        value: "black",
        image: blackTshirtUrl,
        swatch: "#080808"
      },
      {
        name: "Pink",
        value: "pink",
        image: pinkTshirtUrl,
        swatch: "#f68fb4"
      }
    ]
  },
  {
    id: "signed",
    name: "Signed T-Shirt",
    price: 25.99,
    tags: ["Signed design", "Includes signed photo"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colours: [
      {
        name: "Pink",
        value: "pink",
        image: signedTshirtUrl,
        swatch: "#f68fb4"
      }
    ]
  }
];

const state = {
  sort: "featured",
  cart: [],
  discountRate: 0
};

const productGrid = document.querySelector("[data-products]");
const sortSelect = document.querySelector("[data-sort]");
const cartDrawer = document.querySelector("[data-cart]");
const cartBackdrop = document.querySelector("[data-cart-backdrop]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const subtotalNode = document.querySelector("[data-subtotal]");
const discountNode = document.querySelector("[data-discount]");
const totalNode = document.querySelector("[data-total]");
const promoForm = document.querySelector("[data-promo-form]");
const promoInput = promoForm.querySelector("input");
const promoMessage = document.querySelector("[data-promo-message]");
const toast = document.querySelector("[data-toast]");

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function getColour(product, value) {
  return product.colours.find((colour) => colour.value === value) || product.colours[0];
}

function renderProducts() {
  productGrid.innerHTML = products
    .map((product) => {
      const defaultColour = product.colours[0];
      const sizeOptions = product.sizes.map((size) => `<option value="${size}">${size}</option>`).join("");
      const colourOptions = product.colours
        .map((colour) => `<option value="${colour.value}">${colour.name}</option>`)
        .join("");
      const tags = product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
      const swatches = product.colours
        .map((colour) => `<span class="swatch" style="background:${colour.swatch}" aria-hidden="true"></span>`)
        .join("");

      return `
        <article class="product-card">
          <figure>
            <img data-product-image="${product.id}" src="${defaultColour.image}" alt="${product.name} ADHD ARMY product photo" loading="lazy">
          </figure>
          <div class="product-info">
            <div class="product-top">
              <h3>${product.name}</h3>
              <span class="price">${money.format(product.price)}</span>
            </div>
            <div class="tag-row">${tags}</div>
            <div class="swatches" aria-label="Available colours">${swatches}</div>
            <div class="product-controls">
              <label class="visually-hidden" for="size-${product.id}">Size for ${product.name}</label>
              <select id="size-${product.id}" data-size="${product.id}">
                ${sizeOptions}
              </select>
              <label class="visually-hidden" for="colour-${product.id}">Colour for ${product.name}</label>
              <select id="colour-${product.id}" data-colour="${product.id}">
                ${colourOptions}
              </select>
              <button class="button button-primary add-button" type="button" data-add="${product.id}">
                <i data-lucide="shopping-bag" aria-hidden="true"></i>
                Add
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  refreshIcons();
}

function getCartKey(id, size, colour) {
  return `${id}:${size}:${colour}`;
}

function addToCart(id, size, colourValue, quantity = 1) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  const resolvedSize = size || product.sizes[0];
  const colour = getColour(product, colourValue);
  const key = getCartKey(id, resolvedSize, colour.value);
  const existing = state.cart.find((item) => item.key === key);

  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      key,
      id,
      size: resolvedSize,
      colour: colour.value,
      quantity
    });
  }

  renderCart();
  openCart();
  showToast(`${product.name} in ${colour.name} added to your cart.`);
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id);
    return sum + product.price * line.quantity;
  }, 0);
  const multiTeeDiscount = state.cart.reduce((sum, line) => sum + line.quantity, 0) >= 3 ? Math.round(subtotal * 0.08) : 0;
  const promoDiscount = Math.round((subtotal - multiTeeDiscount) * state.discountRate);
  const discount = multiTeeDiscount + promoDiscount;

  return {
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount)
  };
}

function renderCart() {
  const itemCount = state.cart.reduce((sum, line) => sum + line.quantity, 0);
  cartCount.textContent = itemCount;

  if (state.cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is ready for the first tee.</p>`;
  } else {
    cartItems.innerHTML = state.cart
      .map((line) => {
        const product = products.find((item) => item.id === line.id);
        const colour = getColour(product, line.colour);
        return `
          <article class="cart-line">
            <img src="${colour.image}" alt="">
            <div>
              <h3>${product.name}</h3>
              <p>${colour.name} / ${line.size} / ${money.format(product.price)}</p>
              <div class="qty-controls" aria-label="Quantity controls for ${product.name}">
                <button type="button" data-qty="${line.key}" data-direction="-1" aria-label="Decrease quantity">
                  <i data-lucide="minus" aria-hidden="true"></i>
                </button>
                <span>${line.quantity}</span>
                <button type="button" data-qty="${line.key}" data-direction="1" aria-label="Increase quantity">
                  <i data-lucide="plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <button class="remove-line" type="button" data-remove="${line.key}" aria-label="Remove ${product.name}">
              <i data-lucide="trash-2" aria-hidden="true"></i>
            </button>
          </article>
        `;
      })
      .join("");
  }

  const totals = cartTotals();
  subtotalNode.textContent = money.format(totals.subtotal);
  discountNode.textContent = `-${money.format(totals.discount).replace("-", "")}`;
  totalNode.textContent = money.format(totals.total);
  refreshIcons();
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartBackdrop.hidden = false;
  document.body.classList.add("cart-is-open");
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartBackdrop.hidden = true;
  document.body.classList.remove("cart-is-open");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function applyPromo(code, showInvalid = true) {
  if (code === "TYMELESS10") {
    state.discountRate = 0.1;
    promoMessage.textContent = "Promo applied.";
  } else if (!code) {
    state.discountRate = 0;
    promoMessage.textContent = "";
  } else {
    state.discountRate = 0;
    promoMessage.textContent = showInvalid ? "That code is not active." : "";
  }

  renderCart();
}

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

productGrid.addEventListener("change", (event) => {
  const colourSelect = event.target.closest("[data-colour]");
  if (!colourSelect) return;

  const product = products.find((item) => item.id === colourSelect.dataset.colour);
  const colour = getColour(product, colourSelect.value);
  const image = productGrid.querySelector(`[data-product-image="${product.id}"]`);
  if (image) {
    image.src = colour.image;
  }
});

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (!addButton) return;

  const id = addButton.dataset.add;
  const size = productGrid.querySelector(`[data-size="${id}"]`).value;
  const colour = productGrid.querySelector(`[data-colour="${id}"]`).value;
  addToCart(id, size, colour);
});

document.querySelector("[data-cart-open]").addEventListener("click", openCart);
document.querySelector("[data-cart-close]").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

cartItems.addEventListener("click", (event) => {
  const qtyButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");

  if (qtyButton) {
    const line = state.cart.find((item) => item.key === qtyButton.dataset.qty);
    if (!line) return;

    line.quantity += Number(qtyButton.dataset.direction);
    if (line.quantity <= 0) {
      state.cart = state.cart.filter((item) => item.key !== line.key);
    }
    renderCart();
  }

  if (removeButton) {
    state.cart = state.cart.filter((item) => item.key !== removeButton.dataset.remove);
    renderCart();
  }
});

promoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = new FormData(promoForm).get("promo").trim().toUpperCase();
  applyPromo(code);
});

promoInput.addEventListener("input", () => {
  const code = promoInput.value.trim().toUpperCase();
  if (code === "TYMELESS10" || !code) {
    applyPromo(code, false);
  }
});

document.querySelector("[data-checkout]").addEventListener("click", () => {
  if (state.cart.length === 0) {
    showToast("Add a tee before checkout.");
    return;
  }

  const totals = cartTotals();
  showToast(`Demo checkout ready: ${money.format(totals.total)} total.`);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
  }
});

renderProducts();
renderCart();
refreshIcons();
