document.addEventListener("DOMContentLoaded", function () {
    displayFavorites();
    updateCartCount();
});

function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let container = document.getElementById("cart-items");

    if (!container) return;

    container.innerHTML = favorites.length
    ? favorites.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-content">
                <div class="cart-details">
                    <h5 class="cart-title">${item.name}</h5>
                    <p class="cart-size">Size: ${item.size}</p>
                    <p class="cart-price">${formatPrice(item.price)}</p>
                </div>
                <button class="remove-btn" onclick="removeFromFavorites('${item.id}')">Remove</button>
            </div>
        </div>
    `).join("")
        : "<p>Your wishlist is empty.</p>";
}

/* FOOTER */
const toggles = document.querySelectorAll(".cloud9-toggle");

toggles.forEach((toggle, index) => {
    toggle.addEventListener("click", function () {
        const dropdown = document.querySelectorAll(".cloud9-footer-dropdown")[index];
        const isActive = dropdown.classList.contains("active");

        // Hide all dropdowns first
        document.querySelectorAll(".cloud9-footer-dropdown").forEach(d => d.classList.remove("active"));

        // Toggle the clicked one
        if (!isActive) {
            dropdown.classList.add("active");
        }
    });
});

// Format price to ₱1,000 format
function formatPrice(price) {
    return `₱${parseFloat(price).toLocaleString("en-PH")}`;
}

function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(item => item.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? "flex" : "none";

        cartCount.classList.add("pop-animation");
        setTimeout(() => {
            cartCount.classList.remove("pop-animation");
        }, 300);
    }
}
