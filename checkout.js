document.addEventListener("DOMContentLoaded", function () {
    const checkoutContainer = document.getElementById("checkout-items");
    const totalAmount = document.getElementById("checkout-total");
    const cartCountElement = document.querySelector(".cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function formatPrice(amount) {
        return `₱${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function updateCartCount() {
        let count = cart.reduce((total, item) => total + (parseInt(item.quantity) || 1), 0);

        if (cartCountElement) {
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? "flex" : "none";

            cartCountElement.classList.add("pop-animation");
            setTimeout(() => cartCountElement.classList.remove("pop-animation"), 300);
        }
    }

    function displayCheckout() {
        checkoutContainer.innerHTML = "";
        if (cart.length === 0) {
            checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalAmount.textContent = formatPrice(0);
            updateCartCount();
            return;
        }

        const tableHeader = document.createElement("div");
        tableHeader.classList.add("table-header");
        tableHeader.innerHTML = `
            <div class="header-item">ITEM</div>
            <div class="header-size">SIZE</div>
            <div class="header-qty">QTY</div>
            <div class="header-price">PRICE</div>
            <div class="header-actions">ACTIONS</div>
        `;
        checkoutContainer.appendChild(tableHeader);

        let total = 0;
        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
            const quantity = parseInt(item.quantity) || 1;
            const totalItemPrice = price * quantity;
            total += totalItemPrice;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div class="item-details">
                    <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" class="item-image">
                    <span>${item.name}</span>
                </div>
                <div class="item-size">${item.size || "N/A"}</div>
                <div class="item-qty">${quantity}</div>
                <div class="item-price">${formatPrice(totalItemPrice)}</div>
                <div class="item-actions">
                    <span class="remove-x" data-index="${index}">×</span>
                </div>
            `;

            checkoutContainer.appendChild(cartItem);
        });

        totalAmount.textContent = formatPrice(total);
        updateCartCount();

        document.querySelectorAll(".remove-x").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                removeCartItem(index);
            });
        });
    }

    function removeCartItem(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCheckout();
    }

    const cardNumberInput = document.getElementById("card-number");
    let actualCardNumber = "";

    cardNumberInput.addEventListener("input", function (e) {
        let input = e.target.value.replace(/\D/g, "").slice(0, 16);
        actualCardNumber = input;
        e.target.value = input.replace(/(.{4})/g, "$1 ").trim();
    });

    cardNumberInput.addEventListener("blur", function () {
        if (actualCardNumber.length === 16) {
            let masked = actualCardNumber.slice(0, -4).replace(/\d/g, "*") + actualCardNumber.slice(-4);
            cardNumberInput.value = masked.replace(/(.{4})/g, "$1 ").trim();
        }
    });

    cardNumberInput.addEventListener("focus", function () {
        cardNumberInput.value = actualCardNumber.replace(/(.{4})/g, "$1 ").trim();
    });

    document.getElementById("expiry-date").addEventListener("input", function (e) {
        let input = e.target.value.replace(/\D/g, "").slice(0, 4);
        e.target.value = input.length > 2 ? input.slice(0, 2) + "/" + input.slice(2) : input;
    });

    document.getElementById("security-code").addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });

    const cardHolderInput = document.getElementById("card-holder");
    cardHolderInput.addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    });

    document.getElementById("complete-order").addEventListener("click", function (e) {
        e.preventDefault();

        const cardNumber = actualCardNumber;
        const expiryDate = document.getElementById("expiry-date").value;
        const securityCode = document.getElementById("security-code").value;
        const cardHolder = cardHolderInput.value.trim();

        if (cardNumber.length !== 16) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert("Please enter a valid expiration date (MM/YY).");
            return;
        }

        if (securityCode.length < 3 || securityCode.length > 4) {
            alert("Security code must be 3-4 digits.");
            return;
        }

        if (cardHolder === "") {
            alert("Please enter the name on the card.");
            return;
        }

        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "success.html";
    });

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

    displayCheckout();
});
