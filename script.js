// This is the boilerplate code given for you
// You can modify this code

// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Cart state (array of product objects)
let cart = [];

// Load cart from sessionStorage on page load
function loadCartFromStorage() {
  const storedCart = sessionStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

// Save cart to sessionStorage
function saveCartToStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Attach event listeners to all "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  // Clear current cart display
  cartList.innerHTML = "";

  // Add each cart item as a list item
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  // Find the product by id
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Add product to cart array
  cart.push(product);

  // Save updated cart to sessionStorage
  saveCartToStorage();

  // Re-render the cart
  renderCart();
}

// Remove item from cart (optional, if needed later)
function removeFromCart(productId) {
  // Remove the first occurrence of the product with that id
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCartToStorage();
    renderCart();
  }
}

// Clear cart
function clearCart() {
  // Empty the cart array
  cart = [];

  // Update sessionStorage
  saveCartToStorage();

  // Re-render the cart (now empty)
  renderCart();
}

// Initial render
loadCartFromStorage();  // Load existing cart from sessionStorage
renderProducts();
renderCart();

// Attach event listener to Clear Cart button
clearCartBtn.addEventListener("click", clearCart);
