document.addEventListener("DOMContentLoaded", function () {
    const thumbnailsContainer = document.querySelector(".thumbnails");
    const mainImage = document.querySelector(".main-image img");
    const sizeButtons = document.querySelectorAll(".size-btn");
    const addToBagBtn = document.querySelector(".add-to-bag");
    const favoriteButton = document.querySelector(".favourite");
    let selectedSize = "";
    let selectedColorImage = "";

    const productTitle = document.querySelector("h1");
    const productPrice = document.querySelector(".fw-bold.fs-4");
    let productDescription = document.querySelector("#product-description");
    const cartCount = document.getElementById("cart-count");

    if (!productDescription) {
        productDescription = document.createElement("p");
        productDescription.classList.add("text-muted");
        productDescription.id = "product-description";
        productTitle.insertAdjacentElement("afterend", productDescription);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("name");
    const productPriceValue = urlParams.get("price");
    const productImage = urlParams.get("image");

    const productDescriptions = {
        "Cloudmonster": "Women's Shoes",
        "Cloudnova 2": "Women's Shoes",
        "SpeedCat": "Women's Shoes",
        "Swift Shoes": "Women's Shoes",
        "Cloudkicks": "Men's Shoes",
        "Lightning Cloud": "Men's Shoes",
        "Cloud Stride X": "Men's Shoes",
        "Nimbus Racer": "Men's Shoes",
        "Stratus Flow": "Men's Shoes",
        "Cumulus Glide": "Men's Shoes",
        "Storm Runner": "Men's Shoes",
        "Luna Glide": "Women's Shoes",
        "Aurora Flex": "Women's Shoes",
        "Celeste Runner": "Women's Shoes",
        "Serena Air": "Women's Shoes",
        "Vega Flow": "Women's Shoes",
        "JumpStart X": "Kids's Shoes",
        "Tiny Sprint": "Kids's Shoes",
        "Mini Runner": "Kids's Shoes",
        "Speedy Kid": "Kids's Shoes",
        "Tiny Stride": "Kids's Shoes"
    };

    if (productName) productTitle.textContent = productName;
    if (productPriceValue) productPrice.textContent = `₱${parseFloat(productPriceValue).toLocaleString()}`;
    if (productImage) {
        mainImage.src = productImage;
        selectedColorImage = productImage;
    }

    productDescription.textContent = productDescriptions[productName] || "Premium quality shoes for comfort and style.";

    mainImage.onerror = function () {
        mainImage.src = "assets/default.png";
    };

    sizeButtons.forEach(button => {
        button.addEventListener("click", function () {
            sizeButtons.forEach(btn => btn.classList.remove("selected-size"));
            this.classList.add("selected-size");
            selectedSize = this.textContent;
        });
    });

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let count = cart.length;

        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? "flex" : "none";

            cartCount.classList.add("pop-animation");
            setTimeout(() => {
                cartCount.classList.remove("pop-animation");
            }, 300);
        }
    }

    addToBagBtn.addEventListener("click", function () {
        if (!selectedSize) {
            alert("Please select a size before adding to the bag.");
            return;
        }

        const product = {
            name: productName,
            price: productPriceValue,
            size: selectedSize,
            image: selectedColorImage
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();
        window.location.href = "cart.html";
    });

    updateCartCount();

    favoriteButton.addEventListener("click", function () {
        if (!selectedSize) {
            alert("Please select a size before adding to favorites.");
            return;
        }

        const product = {
            id: productName.replace(/\s+/g, "-").toLowerCase() + "-" + selectedSize,
            name: productName,
            price: productPriceValue,
            size: selectedSize,
            image: selectedColorImage
        };

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        let exists = favorites.some(item => item.id === product.id);
        if (!exists) {
            favorites.push(product);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        window.location.href = "favorites.html";
    });

    const thumbnailsParam = urlParams.get("thumbs");
    let thumbnails = [];

    if (thumbnailsParam) {
        thumbnails = thumbnailsParam.split(",").map(decodeURIComponent);
    } else {
        const defaultThumbnails = {
            "Cloud Stride X": ["Assets/m1.png", "Assets/m1-1.png", "Assets/m1-2.png"],
            "Nimbus Racer": ["Assets/m2.png", "Assets/m2-1.png", "Assets/m2-2.png"],
            "Stratus Flow": ["Assets/m3.png", "Assets/m3-1.png", "Assets/m3-2.png"],
            "Cumulus Glide": ["Assets/m4.png", "Assets/m4-1.png", "Assets/m4-2.png"],
            "Storm Runner": ["Assets/m5.png", "Assets/m5-1.png", "Assets/m5-2.png"],
            "Luna Glide": ["Assets/w1.png", "Assets/w1-1.png", "Assets/w1-2.png"],
            "Aurora Flex": ["Assets/w2.png", "Assets/w2-1.png", "Assets/w2-2.png"],
            "Celeste Runner": ["Assets/w3.png", "Assets/w3-1.png", "Assets/w3-2.png"],
            "Serena Air": ["Assets/w4.png", "Assets/w4-1.png", "Assets/w4-2.png"],
            "Vega Flow": ["Assets/w5.png", "Assets/w5-1.png", "Assets/w5-2.png"],
            "JumpStart X": ["Assets/k1.png", "Assets/k1-1.png", "Assets/k1-2.png"],
            "Tiny Sprint": ["Assets/k2.png", "Assets/k2-1.png", "Assets/k2-2.png"],
            "Mini Runner": ["Assets/k3.png", "Assets/k3-1.png", "Assets/k3-2.png"],
            "Speedy Kid": ["Assets/k4.png", "Assets/k4-1.png", "Assets/k4-2.png"],
            "Tiny Stride": ["Assets/k5.png", "Assets/k5-1.png", "Assets/k5-2.png"]
        };
        thumbnails = defaultThumbnails[productName] || [productImage];
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

// Display thumbnails with validation
if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = "";
    thumbnails.forEach(src => {
        if (src && src.trim() !== "") {
            const thumbImg = document.createElement("img");
            thumbImg.src = src;
            thumbImg.alt = "Product Thumbnail";
            thumbImg.classList.add("thumbnail-img");

            // Remove broken image if it fails to load
            thumbImg.onerror = function () {
                this.remove();
            };

            thumbImg.addEventListener("click", () => {
                mainImage.src = src;
                selectedColorImage = src;
            });

            thumbnailsContainer.appendChild(thumbImg);
        }
    });
}

});
