document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.querySelector(".checkout-btn");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function formatPrice(amount) {
        return `₱${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function updateCartTotals() {
        let subtotal = 0;

        cart.forEach(item => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 1;
            subtotal += price * quantity;
        });

        cartSubtotal.textContent = formatPrice(subtotal);
        cartTotal.textContent = formatPrice(subtotal);
    }

    function updateCartCount() {
        let count = cart.reduce((total, item) => total + (parseInt(item.quantity) || 1), 0);

        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? "flex" : "none";

            cartCount.classList.add("pop-animation");
            setTimeout(() => {
                cartCount.classList.remove("pop-animation");
            }, 300);
        }
    }

    function displayCart() {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            updateCartTotals();
            updateCartCount();
            return;
        }

        cart.forEach((item, index) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 1;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item", "d-flex", "align-items-center", "border", "p-3", "mb-3");

            cartItem.innerHTML = `
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.name || 'Product'}" class="img-fluid">
                <div class="ms-3">
                    <h5 class="fw-bold">${item.name || 'Unnamed Item'}</h5>
                    <p class="text-muted">Size: ${item.size || 'N/A'}</p>
                </div>
                <div class="ms-auto d-flex align-items-center">
                    <button class="btn btn-outline-secondary btn-sm decrease" data-index="${index}">-</button>
                    <span class="mx-2">${quantity}</span>
                    <button class="btn btn-outline-secondary btn-sm increase" data-index="${index}">+</button>
                    <button class="btn btn-link text-danger ms-3 remove-item" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="fw-bold ms-3">${formatPrice(price * quantity)}</div>
            `;

            cartContainer.appendChild(cartItem);
        });

        updateCartTotals();
        updateCartCount();

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                decreaseQuantity(index);
            });
        });

        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                increaseQuantity(index);
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                removeItem(index);
            });
        });
    }

    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    function increaseQuantity(index) {
        cart[index].quantity = (cart[index].quantity || 1) + 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty. Add items before proceeding to checkout.");
            return;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "checkout.html";
    });

    displayCart();

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

    // Ensure carousel buttons are visible and fit within screen
    const prevBtn = document.querySelector(".unique-prev-btn");
    const nextBtn = document.querySelector(".unique-next-btn");

    if (prevBtn && nextBtn) {
        prevBtn.style.position = "absolute";
        prevBtn.style.top = "50%";
        prevBtn.style.left = "10px";
        prevBtn.style.transform = "translateY(-50%)";
        prevBtn.style.zIndex = "10";

        nextBtn.style.position = "absolute";
        nextBtn.style.top = "50%";
        nextBtn.style.right = "10px";
        nextBtn.style.transform = "translateY(-50%)";
        nextBtn.style.zIndex = "10";
    }
});
