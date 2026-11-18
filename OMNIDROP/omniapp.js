
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 4500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 2,
    name: "Classic Sneakers",
    category: "Fashion",
    price: 3800,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 5200,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 4,
    name: "Luxury Perfume",
    category: "Beauty",
    price: 2500,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500"
  },
  {
    id: 5,
    name: "Modern Chair",
    category: "Home",
    price: 8500,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500"
  },
  {
    id: 6,
    name: "Stylish Backpack",
    category: "Fashion",
    price: 3200,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
  {
    id: 7,
    name: "Digital Camera",
    category: "Electronics",
    price: 18500,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
  },
  {
    id: 8,
    name: "Skincare Set",
    category: "Beauty",
    price: 1800,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"
  }
];

let cart = [];
let wishlist = [];

const formatPrice = price =>
  "KSh " + price.toLocaleString("en-KE");

function renderProducts(items) {
  const grid = document.getElementById("productGrid");

  if (!items.length) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  grid.innerHTML = items.map(product => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <button class="wishlist-btn ${wishlist.includes(product.id) ? "active" : ""}"
          onclick="toggleWishlist(${product.id})">
          <i class="${wishlist.includes(product.id) ? "fas" : "far"} fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="price">${formatPrice(product.price)}</span>
          <button class="add-btn" onclick="addToCart(${product.id})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  updateCart();
  showToast(product.name + " added to cart!");
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = formatPrice(total);

  const container = document.getElementById("cartItems");

  if (!cart.length) {
    container.innerHTML = "<p>Your shopping bag is empty.</p>";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function changeQuantity(id, amount) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    updateCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function toggleCart() {
  document.getElementById("cartPanel").classList.toggle("active");
  document.getElementById("cartOverlay").classList.toggle("active");
}

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist!");
  }

  renderProducts(products);
}

function showWishlist() {
  const items = products.filter(p => wishlist.includes(p.id));
  renderProducts(items);
  document.getElementById("products").scrollIntoView();
}

function filterCategory(category) {
  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered);
  document.getElementById("products").scrollIntoView();
}

function searchProducts() {
  const query = document.getElementById("searchInput")
    .value.toLowerCase().trim();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  renderProducts(filtered);
  document.getElementById("products").scrollIntoView();
}

document.getElementById("searchInput")
  .addEventListener("input", searchProducts);

function checkout() {
  if (!cart.length) {
    showToast("Your cart is empty!");
    return;
  }

  showToast("Checkout interface coming soon!");
}

function subscribe(event) {
  event.preventDefault();
  document.getElementById("subscribeMessage").textContent =
    "Thanks for subscribing to OMNIDROP!";
  event.target.reset();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 2500);
}

renderProducts(products);
updateCart();
