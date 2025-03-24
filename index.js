document.addEventListener("DOMContentLoaded", function () {
    // Function for smooth scrolling to sections
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50, // Adjust for navbar height
                behavior: "smooth",
            });
        }
    }
    
        // Check if there's a hash in the URL when the page loads
        if (window.location.hash) {
            scrollToSection(window.location.hash.substring(1));
        }
    
        // Add event listeners for navbar buttons (optional)
        document.querySelectorAll(".nav-button-1").forEach(button => {
            button.addEventListener("click", function () {
                const sectionId = this.getAttribute("onclick").split("'")[1].split("#")[1];
                scrollToSection(sectionId);
            });
        });
    });
    

    // Attach event listeners for navbar buttons
    const newButton = document.querySelector(".nav-button-1[onclick*='new-products']");
    const menButton = document.querySelector(".nav-button-1[onclick*='men-products']");
    const womenButton = document.querySelector(".nav-button-1[onclick*='women-products']");
    const kidsButton = document.querySelector(".nav-button-1[onclick*='kids-products']");

    if (newButton) {
        newButton.addEventListener("click", function () {
            scrollToSection("new-products");
        });
    }

    if (menButton) {
        menButton.addEventListener("click", function () {
            scrollToSection("men-products");
        });
    }

    if (womenButton) {
        womenButton.addEventListener("click", function () {
            scrollToSection("women-products");
        });
    }

    if (kidsButton) {
        kidsButton.addEventListener("click", function () {
            scrollToSection("kids-products");
        });
    }

   /* PRODUCTS 1 - Carousel */
    document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".unique-carousel");
    const prevBtn = document.querySelector(".unique-prev-btn");
    const nextBtn = document.querySelector(".unique-next-btn");
    const products = document.querySelectorAll(".unique-product");

    if (carousel && prevBtn && nextBtn && products.length > 0) {
        let index = 0;
        const totalProducts = products.length;
        const productsPerView = 3; // Number of products visible at a time
        const productWidth = products[0].offsetWidth + 20; // Adjust width with margin

        function updateCarousel() {
            carousel.style.transform = `translateX(-${index * productWidth}px)`;
        }

        nextBtn.addEventListener("click", function () {
            if (index < totalProducts - productsPerView) {
                index++;
            } else {
                index = 0; // Loop back to start
            }
            updateCarousel();
        });

        prevBtn.addEventListener("click", function () {
            if (index > 0) {
                index--;
            } else {
                index = Math.max(totalProducts - productsPerView, 0);
            }
            updateCarousel();
        });

        window.addEventListener("resize", function () {
            updateCarousel();
        });
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

    // Signup Button Click Event
    const signupButton = document.querySelector(".cloud9-signup-button");
    if (signupButton) {
        signupButton.addEventListener("click", function () {
            const emailInput = document.querySelector(".cloud9-email-input");
            if (emailInput) {
                const email = emailInput.value.trim();
                if (email === "") {
                    alert("Please enter a valid email.");
                } else {
                    alert("Thank you for signing up!");
                    emailInput.value = ""; // Clear input after submission
                }
            }
        });
    }

    // Function to smoothly scroll to the target section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        } else {
            console.error("Section not found: " + sectionId);
        }
    }

    /* CART COUNT FUNCTIONALITY */
    const cartCount = document.getElementById("cart-count");

    function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calculate total quantity
    let totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

        if (cartCount) {
        cartCount.textContent = totalQuantity;
        cartCount.style.display = totalQuantity > 0 ? "flex" : "none";

        // Add animation
        cartCount.classList.add("pop-animation");
        setTimeout(() => {
            cartCount.classList.remove("pop-animation");
        }, 300);
    }
}

// Initial cart count setup
updateCartCount();
});
